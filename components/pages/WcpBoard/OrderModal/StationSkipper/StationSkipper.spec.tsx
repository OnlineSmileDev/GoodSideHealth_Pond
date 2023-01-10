import { render, screen, act } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './index.stories'

const { Primary } = composeStories(stories)

describe('Station Skipper Interaction test', () => {
  test('Verify name on Station skipper', async () => {
    const name = stories.Primary.args.name
    render(<Primary />)
    expect(screen.getByText(name)).toBeTruthy()
  })

  test('Verify cancel button functionality', async () => {
    render(<Primary />)
    console.log = jest.fn()
    const cancelButton = screen.getByRole('button')
    cancelButton.click()
    expect(console.log).toBeCalledWith('cancel')
  })
})
