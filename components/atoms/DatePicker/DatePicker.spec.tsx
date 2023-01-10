import { screen, render, act } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './index.stories'
import moment from 'moment'

const { Primary, WithAllTime } = composeStories(stories)

test('Verify the opening and closing of datepicker', async () => {
  const targetItem = stories.Primary.args
  render(<Primary />)
  const input = screen.getByRole('textbox') as HTMLInputElement
  expect(input.value).toBe(targetItem.date)
  input.click()
  await act(() => Promise.resolve())

  const headerText = moment(targetItem.date).format('MMMM YYYY')
  const header = await screen.getByText(headerText)
  expect(header).not.toBeNull()
})

test('Verify All Button is available or not', async () => {
  console.log = jest.fn()
  render(<WithAllTime />)
  const input = screen.getByRole('textbox') as HTMLInputElement
  input.click()
  const button = screen.getByText('All Time')
  button.click()
  expect(console.log).toHaveBeenCalledWith(`handleAllTimeButtonClicked`)
})
