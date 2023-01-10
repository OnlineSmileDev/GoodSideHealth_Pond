import { fireEvent, render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './index.stories'

const { Primary } = composeStories(stories)

test('Verify the Close button in modal', async () => {
  const targetItem = Primary.args.title
  // Render a whole story element
  render(<Primary />)

  expect(screen.getAllByText(targetItem)).not.toBeNull()
  const closeBtn = screen.getByRole('button')
  closeBtn.click()
  expect(screen.queryByText(targetItem)).toBeNull()
})
