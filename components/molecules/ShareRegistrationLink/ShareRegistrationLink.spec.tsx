import { render, screen, act } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import userEvents from '@testing-library/user-event'
import * as stories from './index.stories'

const { Primary } = composeStories(stories)

describe('Share Registration Link Interaction test', () => {
  test('Verify Submit functionality', async () => {
    render(<Primary />)
    console.log = jest.fn()
    const values = stories.Primary.args.formValues
    const submitButton = screen.getByTestId('submit-button')
    await act(async () => submitButton.click())
    expect(console.log).toHaveBeenCalledWith(values)
  })
})
