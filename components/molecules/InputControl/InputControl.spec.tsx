import { render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './index.stories'

const { Error } = composeStories(stories)

test('Verify the error-message displayed', async () => {
  // Render a whole story element with error-message
  render(<Error />)
  const { errorMessage } = Error.args
  expect(screen.getByTestId('error-message').textContent).toBe(errorMessage)
})
