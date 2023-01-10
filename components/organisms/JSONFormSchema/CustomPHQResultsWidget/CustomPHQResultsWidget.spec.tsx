import { render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './index.stories'

const { Primary, WithSchema } = composeStories(stories)

describe('CustomPHQResultsWidget interaction test', () => {
  test('Verify the widget label title to exist', async () => {
    const targetItem = stories.Primary.args
    // Render a whole story element
    render(<Primary />)

    const { label } = targetItem
    const widget = screen.getByText(label)
    expect(widget).toBeTruthy()
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
})
