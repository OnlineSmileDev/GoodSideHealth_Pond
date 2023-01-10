import { render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './index.stories'

const { InProgress, Complete } = composeStories(stories)

describe('VisitStatus interaction test', () => {
  test('Verify Inprogress Indicator', async () => {
    const inProgress = stories.InProgress.args.status
    render(<InProgress />)
    expect(screen.getByText(inProgress)).toBeTruthy()
    const indicator = screen.getByTestId(inProgress)
    expect(indicator.classList.contains('tw-bg-success')).toBeTruthy()
  })

  test('Verify Complete Indicator', async () => {
    const complete = stories.Complete.args.status
    render(<Complete />)
    expect(screen.getByText(complete)).toBeTruthy()
    const indicator = screen.getByTestId(complete)
    expect(indicator.classList.contains('tw-bg-primary')).toBeTruthy()
  })
})
