import { render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './index.stories'

const { Primary } = composeStories(stories)

describe('CustomStepper Interaction test', () => {
  test('Verify total number of steps', async () => {
    const targetItem = stories.Primary.args
    const { steps } = targetItem
    render(<Primary />)

    expect(screen.getByTestId('steps').childNodes.length).toBe(steps.length)
  })
  test('Verify number of active steps', async () => {
    render(<Primary activeStep={2} />)
    const step1 = screen.getByTestId('step-1')
    const step2 = screen.getByTestId('step-2')
    expect(step1.classList.contains('tw-bg-success')).toBeTruthy()
    expect(step2.classList.contains('tw-bg-success')).toBeTruthy()
  })
})
