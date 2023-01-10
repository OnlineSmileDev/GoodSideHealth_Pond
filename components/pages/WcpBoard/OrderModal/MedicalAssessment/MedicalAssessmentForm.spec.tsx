import { render, screen, act } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './MedicalAssessmentForm.stories'

const { Primary } = composeStories(stories)

test.skip('Verify Submit functionality', async () => {
  render(<Primary />)
  console.log = jest.fn()
  const values = stories.Primary.args.medicalAssessmentValues
  const submitButton = screen.getByTestId('submit-button')
  await act(async () => submitButton.click())
  expect(console.log).toHaveBeenCalledWith(values)
})
