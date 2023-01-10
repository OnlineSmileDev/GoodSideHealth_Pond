import { render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './UploadPaperwork.stories'

const { Primary } = composeStories(stories)

// Needs mock QueryClientProvider pattern in order to render:
test.skip('Verify Upload Paperwork component functionality', async () => {
  render(<Primary />)

  const mockUploadFileModal = jest.fn()

  const uploadButton = screen.getByText('Upload')

  uploadButton.onclick(mockUploadFileModal())
  uploadButton.click()

  expect(mockUploadFileModal).toHaveBeenCalledTimes(1)
})
