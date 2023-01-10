import { render, screen, act } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './VisionForm.stories'

const { Primary } = composeStories(stories)

describe('Vision Order Form interaction test', () => {
  test('Verify Submit functionality', async () => {
    render(<Primary />)
    console.log = jest.fn()
    const values = stories.Primary.args.visionFormValues
    const submitButton = screen.getByTestId('submit-button')
    await act(async () => submitButton.click())
    expect(console.log).toHaveBeenCalledWith(values)
  })
})
