import { render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './index.stories'

const { Primary } = composeStories(stories)

test('Verify Checkbox change checked value', async () => {
  const targetItem = stories.Primary.args
  console.log = jest.fn()
  // Render a whole story element
  render(<Primary />)
  const input = screen.getByRole('checkbox') as HTMLInputElement
  expect(input.checked).toBe(targetItem.checked)
  input.click()
  expect(console.log).toHaveBeenCalledWith(!targetItem.checked)
})
