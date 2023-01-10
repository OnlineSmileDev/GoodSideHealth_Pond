import { act, render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './index.stories'

const { Primary } = composeStories(stories)

describe('Clearance interaction test', () => {
  test('Verify values on submit form', async () => {
    const formValues = stories.Primary.args.formValues
    render(<Primary />)
    console.log = jest.fn()
    const nextButton = screen.getByText('Next')
    await act(async () => nextButton.click())
    expect(console.log).toHaveBeenCalledWith(formValues)
  })
})
