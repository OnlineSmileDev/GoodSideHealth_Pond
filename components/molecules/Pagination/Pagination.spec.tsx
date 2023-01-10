import { render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './index.stories'

const { Primary } = composeStories(stories)

test('Verify Pagination component functionality', async () => {
  const targetItem = stories.Primary.args
  const { currentPage, recordsPerPage, totalSize } = targetItem
  console.log = jest.fn()
  render(<Primary />)

  const initialPage = screen.getByTestId('initialPage')
  expect(initialPage.childNodes[0].textContent).toBe(`${currentPage}`)
  initialPage.click()
  expect(console.log).toHaveBeenCalledWith(currentPage)

  const lastPage = screen.getByTestId('lastPage')
  const lastPageValue = Math.ceil(totalSize / recordsPerPage)
  expect(lastPage.childNodes[0].textContent).toBe(`${lastPageValue}`)
  lastPage.click()
  expect(console.log).toHaveBeenCalledWith(lastPageValue)
})
