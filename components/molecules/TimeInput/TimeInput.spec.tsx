import { render, screen } from '@testing-library/react'
import userEvents from '@testing-library/user-event'
import { composeStories } from '@storybook/testing-react'
import * as stories from './index.stories'
import { getTimeInCustomInputFormat } from 'utils/getFormattedTime'

const { Primary } = composeStories(stories)

describe('Time Input Interaction Test', () => {
  test('Verify hours input functionality', async () => {
    const time = stories.Primary.args.time
    render(<Primary />)
    const formattedTime = getTimeInCustomInputFormat(time)
    const inputHoursElement = screen.getByTestId(
      'input-hours'
    ) as HTMLInputElement
    expect(inputHoursElement.value).toBe(formattedTime.hours)
    userEvents.type(inputHoursElement, '10')
    expect(inputHoursElement.value).toBe('10')
  })

  test('Verify minutes input functionality', async () => {
    const time = stories.Primary.args.time
    render(<Primary />)
    const formattedTime = getTimeInCustomInputFormat(time)
    const inputMinuteElement = screen.getByTestId(
      'input-minutes'
    ) as HTMLInputElement
    expect(inputMinuteElement.value).toBe(formattedTime.minutes)
    userEvents.type(inputMinuteElement, '20')
    expect(inputMinuteElement.value).toBe('20')
  })
})
