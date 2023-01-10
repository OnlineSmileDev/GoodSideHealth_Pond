import { render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './index.stories'

const { Complete, Incomplete } = composeStories(stories)

describe('ProviderDocumentationSummary interaction test', () => {
  test('Verify Badge and action Buttons for Complete Order ', async () => {
    const { status } = stories.Complete.args
    render(<Complete />)

    const statusBadge = screen.getByText(status)
    const editOrderButton = screen.getByTestId('edit-provider-documentation')
    const viewResultButton = screen.getByTestId(
      'view-provider-documentation-results'
    )

    expect(statusBadge.classList.contains('tw-border-success')).toBeTruthy()
    expect(editOrderButton).toBeTruthy()
    expect(viewResultButton).toBeTruthy()
  })

  test('Verify Badge and action Buttons for Incomplete Order ', async () => {
    const { status } = stories.Incomplete.args
    render(<Incomplete />)

    const statusBadge = screen.getByText(status)
    const removeOrderButton = screen.getByTestId(
      'remove-provider-documentation'
    )
    const completeOrderButton = screen.getByTestId(
      'complete-provider-documentation'
    )

    expect(statusBadge.classList.contains('tw-border-warning')).toBeTruthy()
    expect(removeOrderButton).toBeTruthy()
    expect(completeOrderButton).toBeTruthy()
  })
})
