import { render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './index.stories'

const { Primary } = composeStories(stories)

test('Verify the image and text in the card', async () => {
  // Render a whole story element
  render(<Primary />)
  expect(screen.getByRole('img').getAttribute('alt')).toBe('Empty Order Icon')
  expect(screen.getByTestId('empty-order-card').textContent).toBe(
    'There Are Not Currently Any Orders'
  )
})
