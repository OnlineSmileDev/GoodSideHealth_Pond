import { render, screen } from '@testing-library/react'
import userEvents from '@testing-library/user-event'
import { composeStories } from '@storybook/testing-react'
import * as stories from './index.stories'

const { Primary, Secondary } = composeStories(stories)

describe('OrderItem interaction test', () => {
  test('Verify item rendering', async () => {
    render(<Primary />)
    const { label, value } = stories.Primary.args
    expect(screen.getByText(label)).toBeTruthy()
    expect(screen.getByText(value)).toBeTruthy()
  })

  test('Verify indicator and variant', async () => {
    render(<Secondary />)
    const { variant, dataTestId } = stories.Secondary.args
    const orderItem = screen.getByTestId(dataTestId)
    expect(orderItem.classList.contains(variant)).toBeTruthy()
    expect(orderItem.classList.contains('tw-border-danger-darker'))
  })
})
