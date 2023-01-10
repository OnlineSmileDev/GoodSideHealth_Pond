import { render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './index.stories'

const { Primary } = composeStories(stories)

// ToDo setup provider documentation tests instead of tobacco screener tests
describe.skip('Screeners tobacco screen interaction test', () => {
  test('Verify if tobacco user', async () => {
    render(<Primary />)
    console.log = jest.fn()
    const radio = screen.getByTestId('tobaccoUser')
    radio.click()
    expect(console.log).toHaveBeenCalledWith({ tobaccoUser: 'Yes' })
  })

  test('Verify if non tobacco user', async () => {
    render(<Primary />)
    console.log = jest.fn()
    const radio = screen.getByTestId('nonTobaccoUser')
    radio.click()
    expect(console.log).toHaveBeenCalledWith({ tobaccoUser: 'No' })
  })
})
