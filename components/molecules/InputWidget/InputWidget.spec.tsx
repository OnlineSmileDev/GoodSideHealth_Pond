import { render, screen } from '@testing-library/react'
import userEvents from '@testing-library/user-event'
import { composeStories } from '@storybook/testing-react'
import * as stories from './index.stories'

const { TextWidget, NumberWidget, Select, TextArea } = composeStories(stories)

test('Verify the change in the value for text input', async () => {
  // Render a whole story element
  render(<TextWidget />)
  const input = screen.getByRole('textbox') as HTMLInputElement
  userEvents.type(input, 'Value Changed')
  expect(input.value).toBe('Value Changed')
})

test('Verify the change in the value for number input', async () => {
  // Render a whole story element
  render(<NumberWidget />)
  const numberInput = screen.getByRole('textbox') as HTMLInputElement
  userEvents.type(numberInput, '122')
  expect(numberInput.value).toBe('122')

  userEvents.type(numberInput, 'abc')
  expect(numberInput.value).not.toBe('abc')
})

test('Verify the option change for select input', async () => {
  // Render a whole story element
  render(<Select />)
  const select = screen.getByRole('combobox')
  userEvents.selectOptions(select, 'Option 1')
  const selectedOption = screen.getByText('Option 1') as HTMLOptionElement
  expect(selectedOption.selected).toBeTruthy()
  const notSelectedOption = screen.getByText('Option 2') as HTMLOptionElement
  expect(notSelectedOption.selected).not.toBeTruthy()
})

test('Verify the value change for textarea input', async () => {
  // Render a whole story element
  render(<TextArea />)
  const input = screen.getByRole('textbox') as HTMLInputElement
  userEvents.type(input, 'Value Changed')
  expect(input.value).toBe('Value Changed')
})
