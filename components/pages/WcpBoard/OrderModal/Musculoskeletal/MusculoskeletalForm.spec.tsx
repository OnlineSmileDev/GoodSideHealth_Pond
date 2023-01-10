import { render, screen, act } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './MusculoskeletalForm.stories'

const { Primary } = composeStories(stories)

test('Verify Submit functionality', async () => {
  render(<Primary />)
  console.log = jest.fn()
  const values = stories.Primary.args.musculoskeletalValues
  const submitButton = screen.getByTestId('submit-button')
  await act(async () => submitButton.click())
  expect(console.log).toHaveBeenCalledWith(values)
})
