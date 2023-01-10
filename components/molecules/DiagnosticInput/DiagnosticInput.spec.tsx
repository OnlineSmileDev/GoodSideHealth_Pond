import { render, screen } from '@testing-library/react'
import userEvents from '@testing-library/user-event'
import { composeStories } from '@storybook/testing-react'
import * as stories from './index.stories'
import { DIAGNOSIS_RESULTS } from '.'
const { Primary, Secondary } = composeStories(stories)

test('Verify Normal functionality', async () => {
  render(<Primary />)
  const value = stories.Primary.args.toggleValue
  const input = screen.getByRole('checkbox') as HTMLInputElement
  expect(input.checked).toBe(value === DIAGNOSIS_RESULTS.NORMAL)
})

test('Verify Abnormal functionality', async () => {
  render(<Secondary />)
  const value = stories.Primary.args.toggleValue
  console.log = jest.fn()
  const input = screen.getByRole('checkbox') as HTMLInputElement
  expect(!input.checked).toBe(value === DIAGNOSIS_RESULTS.NORMAL)
  const textArea = screen.getByRole('textbox') as HTMLInputElement
  userEvents.type(textArea, 'abc reason')
  expect(console.log).toHaveBeenLastCalledWith('abc reason')
})
