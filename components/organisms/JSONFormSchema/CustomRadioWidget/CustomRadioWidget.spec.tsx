import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { composeStories } from '@storybook/testing-react'
import * as stories from './index.stories'

const { Primary, WithSchema } = composeStories(stories)

describe('CustomRadioWidget interaction test', () => {
  test('Verify the widget label title to exist', async () => {
    const targetItem = stories.Primary.args
    // Render a whole story element
    render(<Primary />)

    const { label } = targetItem
    const widget = screen.getByText(label)
    expect(widget).toBeTruthy()
  })

  test('Can select options by label', async () => {
    const targetItem = stories.Primary.args
    console.log = jest.fn()
    // Render a whole story element
    render(<Primary />)

    for (let i = 0; i < targetItem.options.enumOptions.length; i++) {
      const { value, label } = targetItem.options.enumOptions[i]
      const radio = screen.getByLabelText(label) as HTMLInputElement
      userEvent.click(radio)
      expect(radio.checked).toBe(true)
      expect(console.log).toHaveBeenCalledWith(`${value} clicked`)
    }
  })

  test('Can select options by value', async () => {
    const targetItem = stories.Primary.args
    console.log = jest.fn()
    // Render a whole story element
    render(<Primary />)

    for (let i = 0; i < targetItem.options.enumOptions.length; i++) {
      const { value } = targetItem.options.enumOptions[i]
      const radio = screen.getByDisplayValue(value) as HTMLInputElement
      userEvent.click(radio)
      expect(radio.checked).toBe(true)
      expect(console.log).toHaveBeenCalledWith(`${value} clicked`)
    }
  })

  test.skip('Verify the widget label title to be altered by uiSchema', async () => {
    const targetItem = stories.Primary.args
    const { uiSchema } = targetItem
    // Render a whole story element
    render(<WithSchema />)

    const title = uiSchema?.['ui:title']
    const schemaWidget = screen.getByLabelText(title)
    expect(schemaWidget).toBeTruthy()

    // const { label } = targetItem
    // const widget = screen.getByText(label)
    // expect(!widget).toBeTruthy()
  })

  test('Can select options uiSchema enumName', async () => {
    const targetItem = stories.WithSchema.args
    const { uiSchema } = targetItem
    console.log = jest.fn()
    // Render a whole story element
    render(<WithSchema />)

    for (let i = 0; i < targetItem.options.enumOptions.length; i++) {
      const schemaOptionLabel = uiSchema?.['ui:enumNames']?.[i]
      const { value } = targetItem.options.enumOptions[i]
      const radio = screen.getByLabelText(schemaOptionLabel) as HTMLInputElement
      userEvent.click(radio)
      expect(radio.checked).toBe(true)
      expect(console.log).toHaveBeenCalledWith(`${value} clicked`)
    }
  })
})
