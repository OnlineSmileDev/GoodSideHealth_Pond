import { render, screen, waitForDomChange } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './index.stories'

const { Primary } = composeStories(stories)

test('verify toggle card', async () => {
  const targetItem = stories.Primary.args
  // Render a whole story element
  render(<Primary />)
  expect(screen.getByRole('heading').textContent).toBe(targetItem.title)
  expect(screen.getByTestId('status').textContent).toBe(targetItem.status)

  const button = screen.getByRole('button')
  const hidden = screen
    .getByText(/children/)
    .parentElement.classList.contains('show')
  expect(hidden).toBeFalsy()
  button.click()
  await waitForDomChange()
  const show = screen
    .getByText(/children/)
    .parentElement.classList.contains('show')
  expect(show).toBeTruthy()
})
