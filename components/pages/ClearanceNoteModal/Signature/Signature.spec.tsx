import { act, render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './index.stories'

jest.unmock('react-redux')

const { Primary } = composeStories(stories)

describe('Signature interaction test', () => {
  test('Verify values on submit form', async () => {
    const formValues = stories.Primary.args.formValues
    render(<Primary />)
    console.log = jest.fn()
    const nextButton = screen.getByText('End Visit')
    await act(async () => nextButton.click())
    expect(console.log).toHaveBeenCalledWith(formValues)
  })

  test('Verify back button functionality', async () => {
    const currentStep = stories.Primary.args.currentStep
    render(<Primary />)
    console.log = jest.fn()
    const backButton = screen.getByText('Back')
    backButton.click()
    expect(console.log).toHaveBeenCalledWith(currentStep - 1)
  })
})
