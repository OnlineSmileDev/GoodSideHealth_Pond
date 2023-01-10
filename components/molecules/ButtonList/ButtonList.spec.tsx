import { render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './index.stories'

const { Primary } = composeStories(stories)

test('Multiple Button display and called', async () => {
  const targetItem = stories.Primary.args.list
  console.log = jest.fn()

  // Render a whole story element
  render(<Primary />)
  const buttonList = screen.getAllByRole('button')
  expect(buttonList.length).toBe(targetItem.length)
  buttonList.forEach((button, i) => {
    const text = button.textContent
    expect(text).toBe(targetItem[i].buttonText)
    button.click()
    expect(console.log).toHaveBeenCalledWith(`${text} clicked`)
  })
})
