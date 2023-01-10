import { render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './index.stories'

const { Primary } = composeStories(stories)

describe('Verify Caregiver interaction test', () => {
  test('Verify name on card', async () => {
    const name = stories.Primary.args.name
    render(<Primary />)
    expect(screen.getByText(name)).toBeTruthy()
  })

  test('Verify relationship on card', async () => {
    const relationship = stories.Primary.args.relationship
    render(<Primary />)
    expect(screen.getByText(relationship)).toBeTruthy()
  })

  test('Verify phoneNumber on card', async () => {
    const phoneNumber = stories.Primary.args.phoneNumber
    render(<Primary />)
    expect(screen.getByText(phoneNumber)).toBeTruthy()
  })
})
