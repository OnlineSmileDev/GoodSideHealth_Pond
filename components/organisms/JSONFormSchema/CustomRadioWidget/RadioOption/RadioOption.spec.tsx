import { Matcher, render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './index.stories'

const { Primary } = composeStories(stories)

test('Can select options', async () => {
  const targetItem = stories.Primary.args
  console.log = jest.fn()
  // Render a whole story element
  render(<Primary />)

  const radio = screen.getByDisplayValue(
    targetItem.value as Matcher
  ) as HTMLInputElement
  radio.click()
  expect(radio.checked).toBe(true)
  expect(console.log).toHaveBeenCalledWith(`${targetItem.value} clicked`)
})
