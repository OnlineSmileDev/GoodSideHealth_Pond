import { render, screen, fireEvent } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import { ORDER_ITEM_STATUS } from 'constants/orders'
import * as stories from './index.stories'

const { Primary } = composeStories(stories)

describe('HeightAndWeightSummary interaction test', () => {
  test('Verify height in feet and inches', async () => {
    const { height_ft, height_in } = stories.Primary.args.heightAndWeightValues
    render(<Primary />)

    expect(screen.getByText(`${height_ft}`)).toBeTruthy()
    expect(screen.getByText(`${height_in}`)).toBeTruthy()
  })

  test('Verify weight', async () => {
    const { weight_lbs } = stories.Primary.args.heightAndWeightValues
    render(<Primary />)

    expect(screen.getByText(`${weight_lbs}`)).toBeTruthy()
  })

  test('Verify Badge with status', async () => {
    const { status } = stories.Primary.args
    render(<Primary />)
    const statusBadge = screen.getByText(status)
    if (status === ORDER_ITEM_STATUS.COMPLETE) {
      expect(statusBadge.classList.contains('tw-border-success')).toBeTruthy()
    } else if (status === ORDER_ITEM_STATUS.INCOMPLETE) {
      expect(statusBadge.classList.contains('tw-border-warning')).toBeTruthy()
    }
  })

  test('Verify onClick functionality on Edit Assessment', async () => {
    render(<Primary />)
    console.log = jest.fn()

    const editAssessment = screen.getByText('Edit Assessment')
    editAssessment.click()
    expect(console.log).toBeCalledWith('action', 'editAssessment')
  })

  test('Verify onClick functionality on Follow Up Instructions', async () => {
    render(<Primary />)
    console.log = jest.fn()

    const saveButton = screen.getByText('Save')
    const inputField = screen.getByPlaceholderText('Your Note')
    const instructions = 'instructions'

    fireEvent.change(inputField, { target: { value: instructions } })

    saveButton.click()
    expect(console.log).toBeCalledWith('action', instructions)
  })
})
