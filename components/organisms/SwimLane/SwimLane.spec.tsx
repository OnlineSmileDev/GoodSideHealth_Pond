import { render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './index.stories'

const { Primary } = composeStories(stories)

describe('SwimLane interaction test', () => {
  test('Verify title of Swim Lane', async () => {
    const targetItem = stories.Primary.args
    const { station } = targetItem
    const { title } = station
    render(<Primary />)
    expect(screen.getByText(title)).toBeTruthy()
  })

  test('Verify number of visit cards rendered in Swim Lane', async () => {
    const targetItem = stories.Primary.args
    const { station } = targetItem
    const { station_visits } = station
    render(<Primary />)

    expect(screen.getByTestId('wcp-visit-cards').childNodes.length).toBe(
      station_visits.length
    )
  })

  test.skip('Verify handleStationVisitAction on VisitCard button click', () => {
    // ToDo: create a test for handleVisitAction
  })
})
