import { unmountComponentAtNode } from 'react-dom'
import { useEffect } from 'react'
import { act } from 'react-dom/test-utils'
import gql from 'graphql-tag'
import { WebSocket, Server } from 'mock-socket'
import { render } from '@testing-library/react'
import createStore from 'src/createStore'
import rootReducer from 'src/rootReducer'
import useHasuraWebsocket, {
  SUBSCRIBE_DEBOUNCE_TIME,
} from '../useHasuraWebsocket'

jest.setTimeout(6000)
createStore(rootReducer)

const wait = (ms): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))
const fakeUrl = process.env.NEXT_PUBLIC_GRAPHQL_API_WS_ENDPOINT
const Subscription = gql`
  subscription VisitsSubscription {
    visits {
      id
    }
  }
`
let container: HTMLDivElement = null

type TestComponentProps = {
  shouldDebounce?: boolean
  variables?: {
    throwError?: boolean
  }
}

const TestComponent = ({
  shouldDebounce,
  variables = {},
}: TestComponentProps) => {
  const {
    subscribe,
    subscribedData,
    hasWebsocketError,
    isSubscribing,
    unsubscribeAll,
  } = useHasuraWebsocket(Subscription as never, null, shouldDebounce)

  useEffect(() => {
    if (!isSubscribing) subscribe([{ variables }])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    let timeout
    if (isSubscribing) {
      // let the subscription last for a bit
      if (!variables.throwError) timeout = setTimeout(unsubscribeAll, 2000)
    }
    return () => clearTimeout(timeout)
  }, [variables, isSubscribing, unsubscribeAll])

  return (
    <div>
      <div id='isSubscribed'>{isSubscribing.toString()}</div>
      <div id='hasWebsocketError'>{hasWebsocketError.toString()}</div>
      <div id='data'>{JSON.stringify(subscribedData)}</div>
    </div>
  )
}

beforeAll(() => {
  const mockServer = new Server(fakeUrl)
  if (window) window.WebSocket = WebSocket

  mockServer.on('connection', (socket) => {
    socket.on('message', (data) => {
      if (typeof data === 'string') {
        const parsedData = JSON.parse(data)
        if (parsedData.type === 'start') {
          if (parsedData.payload.variables.throwError) {
            mockServer.simulate('error')
            socket.close({
              code: 1003,
              reason: 'Bad Request',
              wasClean: false,
            })
          }
        }
      }
    })
  })
})

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  unmountComponentAtNode(container)
  container.remove()
  container = null
})

describe('UseHasuraWebsocket', () => {
  it('Can create new websocket and subscribe for data, and then unsubscribe', async () => {
    act(() => {
      render(<TestComponent />, { container })
    })
    expect(container.querySelector('#isSubscribed').innerHTML).toBe('false')
    expect(container.querySelector('#hasWebsocketError').innerHTML).toBe(
      'false'
    )

    await act(() => wait(1000))

    expect(container.querySelector('#isSubscribed').innerHTML).toBe('true')

    await act(() => wait(3000))

    expect(container.querySelector('#isSubscribed').innerHTML).toBe('false')
  })

  it('Can create new websocket and subscribe (debounced) for data, and then unsubscribe', async () => {
    act(() => {
      render(<TestComponent shouldDebounce />, { container })
    })
    expect(container.querySelector('#isSubscribed').innerHTML).toBe('false')
    expect(container.querySelector('#hasWebsocketError').innerHTML).toBe(
      'false'
    )

    await act(() => wait(SUBSCRIBE_DEBOUNCE_TIME + 1000))

    expect(container.querySelector('#isSubscribed').innerHTML).toBe('true')

    await act(() => wait(3000))

    expect(container.querySelector('#isSubscribed').innerHTML).toBe('false')
  })

  it('Can create new websocket and subscribe for data, and report if error', async () => {
    act(() => {
      render(<TestComponent variables={{ throwError: true }} />, { container })
    })
    expect(container.querySelector('#isSubscribed').innerHTML).toBe('false')
    expect(container.querySelector('#hasWebsocketError').innerHTML).toBe(
      'false'
    )

    await act(() => wait(1000))

    expect(container.querySelector('#isSubscribed').innerHTML).toBe('false')
    expect(container.querySelector('#hasWebsocketError').innerHTML).toBe('true')
  })
})
