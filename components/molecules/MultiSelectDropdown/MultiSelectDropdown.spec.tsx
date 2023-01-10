import { render, screen } from '@testing-library/react'
import userEvents from '@testing-library/user-event'
import { composeStories } from '@storybook/testing-react'
import * as stories from './index.stories'

const { Primary } = composeStories(stories)

test('Verify MultiSelect dropdown funtionality', async () => {
  const targetItem = Primary.args
  render(<Primary />)
  const inputElement = screen.getByTestId(
    'multi-select-input'
  ) as HTMLInputElement
  expect(inputElement.placeholder).toBe(targetItem.placeholder)

  userEvents.type(inputElement, 'test1')
  expect(inputElement.value).toBe('test1')

  userEvents.type(inputElement, 't')

  const element = screen.getByTestId('downshift-listItem-0')
  expect(element.textContent).toMatch(/t/i)
})
