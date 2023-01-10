import { render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './index.stories'
import { STATION_STATUSES } from 'constants/stations'

const { Primary } = composeStories(stories)
const { COMPLETE, NOT_COMPLETE, FAILED, SKIPPED, IN_PROGRESS } =
  STATION_STATUSES

// Component is not used yet
describe.skip('StationsIndicator interaction test', () => {
  test('Verify Stations', async () => {
    const targetItem = stories.Primary.args.stations
    render(<Primary />)

    const stations = screen.getByTestId('stationsIndicator')

    expect(targetItem.length).toBe(stations.childNodes.length)
  })

  test('Verify Station Indicator Color', async () => {
    const stations = stories.Primary.args.stations
    const visit = stories.Primary.args.visit
    render(<Primary />)

    stations.forEach(({ code }) => {
      const stationIndicator = screen.getByTestId(code)
      const stationStatus = visit[code]

      switch (stationStatus) {
        case COMPLETE:
          expect(
            stationIndicator.classList.contains('tw-bg-success')
          ).toBeTruthy()
          break
        case IN_PROGRESS:
          expect(
            stationIndicator.classList.contains('tw-bg-warning')
          ).toBeTruthy()
          break
        case FAILED:
          expect(
            stationIndicator.classList.contains('tw-bg-danger-darker')
          ).toBeTruthy()
          break
        case SKIPPED:
          expect(
            stationIndicator.classList.contains('tw-bg-light')
          ).toBeTruthy()
          break
        case NOT_COMPLETE:
          expect(
            stationIndicator.classList.contains('tw-bg-pondBlack')
          ).toBeTruthy()
          break
        default:
          break
      }
    })
  })
})
