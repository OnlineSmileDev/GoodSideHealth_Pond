import { render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './index.stories'

const { Primary } = composeStories(stories)

describe('Checkout Visit Interaction test', () => {
  test('Verify Return to session button functionality', async () => {
    render(<Primary />)
    console.log = jest.fn()
    const button = screen.getByTestId('returnToSession')
    button.click()
    expect(console.log).toHaveBeenCalledWith('return to session')
  })
  test('Verify End Visit button functionality', async () => {
    render(<Primary />)
    console.log = jest.fn()
    const button = screen.getByTestId('endVisit')
    button.click()
    expect(console.log).toHaveBeenCalledWith('end visit')
  })
})
