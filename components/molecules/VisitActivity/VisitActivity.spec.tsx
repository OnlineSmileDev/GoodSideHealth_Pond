import { render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './index.stories'

const { Primary } = composeStories(stories)

describe('Visit Activity interaction test', () => {
  test('Verify all the passed visit activities are rendered or not', async () => {
    const visitActivities = Primary.args.activities
    render(<Primary />)

    expect(screen.getByTestId('visit-activities').childNodes.length).toBe(
      visitActivities.length
    )
  })
})
