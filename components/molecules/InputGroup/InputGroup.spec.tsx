import { render, screen } from '@testing-library/react'
import userEvents from '@testing-library/user-event'
import { composeStories } from '@storybook/testing-react'
import * as stories from './index.stories'

const { Primary } = composeStories(stories)

test('Verify the change in the value for input group', async () => {
  // Render a whole story element
  render(<Primary />)
  const { label } = Primary.args

  expect(screen.getByText(label).innerHTML).toBe(label)
  const input = screen.getByRole('textbox') as HTMLInputElement
  userEvents.type(input, 'Value Changed')
  expect(input.value).toBe('Value Changed')
})
