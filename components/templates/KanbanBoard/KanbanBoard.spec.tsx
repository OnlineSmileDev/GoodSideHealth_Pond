import { render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './index.stories'

const { Primary } = composeStories(stories)

test.skip('Verify Swim Lanes count', async () => {
  // const stations = stories.Primary.args.stations
  render(<Primary />)

  const kanbanBoard = screen.getByTestId('kanban-board')

  // expect(stations.length).toBe(kanbanBoard.childNodes.length)
})
