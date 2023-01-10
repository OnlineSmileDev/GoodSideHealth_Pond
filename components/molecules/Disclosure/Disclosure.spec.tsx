import { render, screen, waitForDomChange } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './index.stories'

const { Primary } = composeStories(stories)

test('Verify Header and toggle card', async () => {
  //Render a whole story element
  render(<Primary />)

  expect(screen.getByTestId('disclosure-body').textContent).toBe(
    'This is Disclosure Header'
  )
  expect(screen.getByTestId('disclosure-collapse').textContent).toBe(
    'This is Disclosure Collapse'
  )

  const button = screen.getByRole('button')
  let show = screen
    .getByTestId('disclosure-collapse')
    .classList.contains('show')
  expect(show).toBeFalsy()
  button.click()
  await waitForDomChange()
  show = screen.getByTestId('disclosure-collapse').classList.contains('show')
  expect(show).toBeTruthy()
  const collapseContent = screen.getByText('This is Disclosure Collapse')
  expect(collapseContent).toBeTruthy()
})
