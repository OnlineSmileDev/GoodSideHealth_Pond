import { render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './index.stories'

const { Primary, Warning } = composeStories(stories)

describe('PrintBadge interaction test', () => {
  test('Verify Primary variant default behavior', async () => {
    render(<Primary />)
    const badgeIcon = screen.getByTestId('print-badge-icon') as HTMLImageElement
    // expect(badgeIcon.src).toContain('documentRoundBlueIcon')
    expect(badgeIcon.alt).toContain('documentRoundBlueIcon')
  })

  test('Verify Warning variant icon', async () => {
    render(<Warning />)
    const badgeIcon = screen.getByTestId('print-badge-icon') as HTMLImageElement
    // expect(badgeIcon.src).toContain('documentRoundWarnIcon')
    expect(badgeIcon.alt).toContain('documentRoundWarnIcon')
  })
})
