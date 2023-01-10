import { render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import { convertDateToUTCWithFullMonth } from 'utils/datePicker'
import * as stories from './index.stories'

const { Primary } = composeStories(stories)

describe('Visit Details interaction test', () => {
  test('Verify open and closing of accordion', async () => {
    render(<Primary />)
    const toggleButtonOpenState = screen.getByText('Less Details')
    toggleButtonOpenState.click()
    await screen.getByTestId('disclosure-collapse')
    const toggleButtonClosedState = screen.getByText('View More')
    expect(toggleButtonClosedState).toBeTruthy()
  })

  test('Verify Visit Date', async () => {
    const visitDetailsValues = stories.Primary.args.visitDetails
    const { visitDate } = visitDetailsValues
    render(<Primary />)
    expect(
      screen.getByText(convertDateToUTCWithFullMonth(visitDate))
    ).toBeTruthy()
  })

  test('Verify field should show N/A if value is not available', async () => {
    const visitDetailsValues = stories.Primary.args.visitDetails
    const { additionalNotes } = visitDetailsValues
    render(<Primary />)

    const element = screen.getByTestId('additionalNotes')

    if (additionalNotes) {
      expect(element.textContent).toBe(additionalNotes)
    } else {
      expect(element.textContent).toBe('N/A')
    }
  })

  test('Verify Click on Edit Button', async () => {
    render(<Primary />)
    console.log = jest.fn()
    const editButton = screen.getByText('Edit')
    editButton.click()
    expect(console.log).toHaveBeenCalledTimes(1)
  })
})
