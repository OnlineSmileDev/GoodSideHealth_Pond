import { render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './index.stories'

const { Primary } = composeStories(stories)

describe('Screeners complete screen interaction test', () => {
  test('Verify text is rendered correctly', async () => {
    console.log = jest.fn()
    render(<Primary />)
    const closeButton = screen.getByRole('button')
    closeButton.click()
    expect(console.log).toHaveBeenCalled()
  })
})
