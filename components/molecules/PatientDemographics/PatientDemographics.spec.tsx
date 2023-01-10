import { render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './index.stories'
import { convertDateToUTCWithFullMonth } from 'utils/datePicker'

const { Primary, WithAgeLessThan21 } = composeStories(stories)

describe('Patient Demographics interaction test', () => {
  test('Verify date of birth in proper format', async () => {
    const dob = stories.Primary.args.dateOfBirth
    render(<Primary />)
    expect(screen.getByText(convertDateToUTCWithFullMonth(dob))).toBeTruthy()
  })

  test('Verify 21+ badge is present', async () => {
    const dob = stories.Primary.args.dateOfBirth
    render(<Primary />)
    const element = screen.getByText(convertDateToUTCWithFullMonth(dob))
    expect(element.firstElementChild).toBeTruthy()
  })

  test('Verify 21+ badge is absent', async () => {
    const dob = stories.WithAgeLessThan21.args.dateOfBirth
    render(<WithAgeLessThan21 />)
    const element = screen.getByText(convertDateToUTCWithFullMonth(dob))
    expect(element.firstElementChild).toBeFalsy()
  })

  test('Verify it should show N/A if value is not available', async () => {
    const knownConditions = stories.Primary.args.knownConditions
    render(<Primary />)

    if (knownConditions) {
      const element = screen.getByText(knownConditions)
      expect(element.textContent).toBe(knownConditions)
    } else {
      const element = screen.getByText('N/A')
      expect(element.textContent).toBe('N/A')
    }
  })
})
