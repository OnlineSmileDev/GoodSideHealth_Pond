import { render, screen, fireEvent } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import { ORDER_ITEM_STATUS } from 'constants/orders'
import * as stories from './index.stories'

const { Primary } = composeStories(stories)

describe('Vision interaction test', () => {
  test('Verify left and right vision', async () => {
    const { vision_left, vision_right } = stories.Primary.args.visionValues
    render(<Primary />)

    expect(
      screen.getByText(`R 20/${vision_right} L 20/${vision_left}`)
    ).toBeTruthy()
  })

  test('Verify is vision corrected', async () => {
    const { is_vision_corrected } = stories.Primary.args.visionValues
    render(<Primary />)

    if (is_vision_corrected) {
      expect(screen.getByText('Yes')).toBeTruthy()
    } else {
      expect(screen.getByText('No')).toBeTruthy()
    }
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
