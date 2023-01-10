import { render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './index.stories'

const { Primary } = composeStories(stories)

describe('SubHeader interaction test', () => {
  test('Verify title on SubHeader', async () => {
    const title = stories.Primary.args.title
    render(<Primary />)
    expect(screen.getByText(title)).toBeTruthy()
  })

  test('Verify desscription on SubHeader', async () => {
    const description = stories.Primary.args.description
    render(<Primary />)
    expect(screen.getByText(description)).toBeTruthy()
  })
})
