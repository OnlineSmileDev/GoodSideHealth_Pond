import { render, screen, fireEvent } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './index.stories'

const { Complete, Incomplete } = composeStories(stories)

describe('TobaccoScreenerSummary interaction test', () => {
  test('Verify Badge and action Buttons for Complete Order ', async () => {
    const { status } = stories.Complete.args
    render(<Complete />)

    const statusBadge = screen.getByText(status)
    const editOrderButton = screen.getByTestId('edit-tobacco-screener')
    const viewResultButton = screen.getByTestId('view-tobacco-screener-results')

    expect(statusBadge.classList.contains('tw-border-success')).toBeTruthy()
    expect(editOrderButton).toBeTruthy()
    expect(viewResultButton).toBeTruthy()
  })

  test('Verify Badge and action Buttons for Incomplete Order ', async () => {
    const { status } = stories.Incomplete.args
    render(<Incomplete />)

    const statusBadge = screen.getByText(status)
    const removeOrderButton = screen.getByTestId('remove-tobacco-screener')
    const completeOrderButton = screen.getByTestId('complete-tobacco-screener')

    expect(statusBadge.classList.contains('tw-border-warning')).toBeTruthy()
    expect(removeOrderButton).toBeTruthy()
    expect(completeOrderButton).toBeTruthy()
  })

  test('Verify onClick functionality on Edit Order', async () => {
    render(<Complete />)
    console.log = jest.fn()

    const editOrder = screen.getByText('Edit Order')
    editOrder.click()
    expect(console.log).toBeCalledWith('editOrder')
  })

  test('Verify onClick functionality on Follow Up Instructions', async () => {
    render(<Complete />)
    console.log = jest.fn()

    const saveButton = screen.getByText('Save')
    const inputField = screen.getByPlaceholderText('Your Note')
    const instructions = 'instructions'

    fireEvent.change(inputField, { target: { value: instructions } })

    saveButton.click()
    expect(console.log).toBeCalledWith('action', instructions)
  })
})
