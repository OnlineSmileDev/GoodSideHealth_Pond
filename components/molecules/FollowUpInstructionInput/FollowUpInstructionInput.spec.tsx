import { fireEvent, render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './index.stories'

const { Primary } = composeStories(stories)

test('Change and Save followup instructions', async () => {
  const targetItem = stories.Primary.args.value
  console.log = jest.fn()
  // Render a whole story element
  render(<Primary />)

  const textarea = screen.getByRole('textbox')
  expect(textarea.textContent).toBe(targetItem)
  fireEvent.change(textarea, { target: { value: 'Instruction Changed' } })
  expect(textarea.textContent).toBe('Instruction Changed')

  const button = screen.getByRole('button')
  button.click()
  expect(console.log).toHaveBeenCalledWith('Instruction Changed')
})
