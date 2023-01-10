import { render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import moment from 'moment'
import * as stories from './index.stories'

const { Primary } = composeStories(stories)

test('Verify Message and Time', async () => {
  const targetItem = stories.Primary.args.messageDetails
  render(<Primary />)

  expect(screen.getByTestId('message-data').textContent).toBe(
    targetItem.message
  )

  expect(screen.getByTestId('message-time').textContent).toBe(
    moment(targetItem.time).calendar()
  )
})
