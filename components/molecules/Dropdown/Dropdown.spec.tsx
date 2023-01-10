import { render, screen, wait } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './index.stories'

const { Primary } = composeStories(stories)

test('onclick handler is called', async () => {
  const targetItem = stories.Primary.args.items[2] // { label: 'Item 3', value: 3 }
  const onChangeMock = jest.fn()

  const onChange = ({ value }) => {
    expect(value).toBe(targetItem.value) // 3
    onChangeMock()
  }

  // Render a whole story element
  render(<Primary onItemChange={onChange} />)
  const dropdownElement = screen.getByText(stories.Primary.args.title) // 'Dropdown Title'
  dropdownElement.click()

  // Choose Item element
  const anotherItemElement = screen.getByText(targetItem.label) // 'Item 3'
  anotherItemElement.click()

  await wait(() => expect(onChangeMock).toHaveBeenCalledTimes(1))
})
