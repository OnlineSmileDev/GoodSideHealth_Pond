import { render, screen } from '@testing-library/react'
import userEvents from '@testing-library/user-event'
import { composeStories } from '@storybook/testing-react'
import * as stories from './index.stories'

const { WithSearchBar } = composeStories(stories)

test('Verify CustomSelect Interaction test', async () => {
  const targetItem = WithSearchBar.args
  render(<WithSearchBar />)
  const button = screen.getByTestId('select-button')
  button.click()

  const inputElement = screen.getByTestId(
    'custom-select-input'
  ) as HTMLInputElement
  expect(inputElement.placeholder).toBe(targetItem.placeholder)

  userEvents.type(inputElement, 'test1')
  expect(inputElement.value).toBe('test1')

  userEvents.type(inputElement, 't')

  const element = screen.getByTestId('downshift-listItem-0')
  expect(element.textContent).toMatch(/t/i)
})
