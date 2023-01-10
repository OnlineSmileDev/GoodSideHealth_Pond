import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import throttle from 'lodash.throttle'
import debounce from 'lodash.debounce'
import { selectJwtToken } from '../infrastructure/userContext'
import { getStore } from '../createStore'
import {
  incrementBusyIndicator,
  decrementBusyIndicator,
} from '../widgets/busyIndicator'
import { getNamedBusyIndicator } from '../widgets/busyIndicator/busyIndicator.selectors'

// Might be able to use this package in place of the handwritten websocket code
// https://www.npmjs.com/package/websocket-ts

type GraphQLAST = {
  definitions: {
    name: {
      value: string
    }
  }[]
  loc: {
    source: {
      body: string
    }
  }
}

type SubscriptionVariablesArray = Array<{
  key?: string | number
  variables: {}
}>

export const SUBSCRIBE_THROTTLE_TIME = 1000
export const SUBSCRIBE_DEBOUNCE_TIME = 1000

const url = process.env.NEXT_PUBLIC_GRAPHQL_API_WS_ENDPOINT
const WS_STATUS = {
  CONNECTING: 0,
  OPEN: 1,
  CLOSING: 2,
  CLOSED: 3,
}
let listeners = 0
let ws

// websocket takes time to cycle states. Throttle prevents abuse
const createWebsocket = (jwtToken: string): Promise<void> =>
  new Promise((resolve, reject) => {
    if (!ws || ws.readyState === WS_STATUS.CLOSED) {
      ws = new WebSocket(url, 'graphql-ws')
      ws.addEventListener('open', () => {
        ws.send(
          JSON.stringify({
            type: 'connection_init',
            payload: { headers: { Authorization: `Bearer ${jwtToken}` } },
          })
        )
      })
    }
    const interval = setInterval(() => {
      if (ws?.readyState === WS_STATUS.OPEN) {
        clearInterval(interval)
        resolve()
      } else if (ws.readyState === WS_STATUS.CLOSED) {
        clearInterval(interval)
        reject()
      }
    }, 500)
  })

const waitUntilStable = (): Promise<void> =>
  new Promise((resolve) => {
    const interval = setInterval(() => {
      if (
        ws?.readyState !== WS_STATUS.CONNECTING &&
        ws?.readyState !== WS_STATUS.CLOSING
      ) {
        clearInterval(interval)
        resolve()
      }
    }, 500)
  })

// Creates one websocket for all usages
export default function useSubscription(
  graphqlQuery: GraphQLAST,
  busyIndicatorName?: string,
  shouldSubscribeDebounce?: boolean
) {
  const jwtToken = selectJwtToken(getStore().getState())
  const isLoadingIndicatorActive = useSelector(
    getNamedBusyIndicator(busyIndicatorName)
  )
  const [hasWebsocketError, setHasWebsocketError] = useState(false)
  const [isSubscribing, setIsSubscribing] = useState(false)
  const [subscribedData, setSubscribedData] = useState({})
  const [activeQueries, setActiveQueries] = useState<{ [key: string]: string }>(
    {}
  )
  const dispatch = useDispatch()

  const handleMessage = useCallback(
    (event) => {
      const msg = JSON.parse(event.data)

      if (msg.type == 'data') {
        const incomingData = Object.values<[{}]>(msg.payload.data)[0]
        if (busyIndicatorName)
          dispatch(decrementBusyIndicator(busyIndicatorName))

        setSubscribedData((prevState) => ({
          ...prevState,
          [msg.id]: incomingData,
        }))
      }
    },
    [dispatch, busyIndicatorName]
  )
  const handleError = useCallback(() => setHasWebsocketError(true), [])
  const handleClose = useCallback(() => setIsSubscribing(false), [])
  const removeListeners = useCallback(() => {
    // listeners are removed if NEW ws is created, but not if we stop subscribing and the ws remains open
    ws.removeEventListener('message', handleMessage)
    ws.removeEventListener('error', handleError)
    ws.removeEventListener('close', handleClose)

    if (!--listeners) ws.close()

    setIsSubscribing(false)
  }, [handleClose, handleError, handleMessage])

  if (!graphqlQuery) throw Error('Graphql Query not passed to hook')

  const operationName = graphqlQuery.definitions[0].name.value

  // usecallback gets warning w/ debounce
  const subscribe: (variablesArray?: SubscriptionVariablesArray) => void =
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useCallback(
      debounce(
        throttle(
          async (
            variablesArray: SubscriptionVariablesArray = [
              { key: 0, variables: {} },
            ]
          ) => {
            if (!ws || ws.readyState === WS_STATUS.CLOSED) {
              await createWebsocket(jwtToken)

              ws.addEventListener('message', handleMessage)
              ws.addEventListener('error', handleError)
              // close handler will also fire after error handler
              ws.addEventListener('close', handleClose)
              listeners++
            }

            const newQueries = {}
            variablesArray.forEach(({ key, variables }, i) => {
              const queryId = `${key || i}`
              const payload = {
                variables,
                extensions: {},
                operationName,
                query: graphqlQuery.loc.source.body,
              }
              const JSONQuery = JSON.stringify({
                id: queryId,
                type: 'start',
                payload,
              })

              if (activeQueries[queryId] === JSON.stringify(payload)) return
              if (busyIndicatorName && !isLoadingIndicatorActive)
                dispatch(incrementBusyIndicator(busyIndicatorName))

              if (activeQueries[queryId])
                ws.send(JSON.stringify({ id: queryId, type: 'stop' }))

              ws.send(JSONQuery)
              newQueries[queryId] = JSON.stringify(payload)
            })

            // if fnc is called again after error; connection can be restored, so drop error status
            if (hasWebsocketError) setHasWebsocketError(false)
            if (Object.keys(newQueries).length)
              setActiveQueries({ ...activeQueries, ...newQueries })
            if (!isSubscribing) setIsSubscribing(true)
          },
          SUBSCRIBE_THROTTLE_TIME
        ),
        shouldSubscribeDebounce ? SUBSCRIBE_DEBOUNCE_TIME : 0
      ),
      [
        operationName,
        graphqlQuery.loc.source.body,
        activeQueries,
        isSubscribing,
        busyIndicatorName,
        isLoadingIndicatorActive,
        dispatch,
        handleMessage,
        handleError,
        handleClose,
        hasWebsocketError,
        jwtToken,
      ]
    )

  const unsubscribe = useCallback(
    async (key: string) => {
      if (!isSubscribing) return

      await waitUntilStable()

      const queryId = key + ''

      ws.send(JSON.stringify({ id: queryId, type: 'stop' }))

      let remainingQueries

      // done this way to prevent rerendering if included "activeQueries" variable
      setActiveQueries((prevState) => {
        const { [queryId]: inactiveQuery, ...prevQueries } = prevState
        remainingQueries = prevQueries
        return prevQueries
      })

      if (Object.keys(remainingQueries).length) return

      removeListeners()
    },
    [isSubscribing, removeListeners]
  )

  const unsubscribeAll = useCallback(async () => {
    if (!isSubscribing) return

    await waitUntilStable()

    setActiveQueries((prevState) => {
      for (const operationName in prevState) {
        if (Object.prototype.hasOwnProperty.call(prevState, operationName)) {
          const activeQuery = prevState[operationName]
          ws.send(JSON.stringify({ id: activeQuery, type: 'stop' }))
        }
      }
      return {}
    })

    removeListeners()
  }, [isSubscribing, removeListeners])

  return {
    hasWebsocketError,
    isSubscribing,
    subscribedData,
    subscribe,
    unsubscribe,
    unsubscribeAll,
  }
}
