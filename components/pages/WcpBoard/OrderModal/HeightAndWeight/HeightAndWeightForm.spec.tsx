import { render, screen, act } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './HeightAndWeightForm.stories'
import { getBMI } from 'utils/bmi/getBMI'
import { getBMIPercentile } from 'utils/bmi/getBMIPercentile'
import { getAgeByMonth } from 'utils/bmi/getAgeByMonth'

const { Primary, Disabled } = composeStories(stories)

describe('Height and Weight Order Form interaction test', () => {
  test('Verify Submit button to be disable', async () => {
    render(<Disabled />)
    console.log = jest.fn()
    expect(screen.getByTestId('submit-button')).toHaveProperty('disabled')
    const submitButton = screen.getByTestId('submit-button')
    await act(async () => submitButton.click())
    expect(console.log).not.toHaveBeenCalled()
  })

  test('Verify Submit functionality', async () => {
    render(<Primary />)
    console.log = jest.fn()
    const patientValues = stories.Primary.args.visitValues
    const values = stories.Primary.args.heightAndWeightValues
    const { birth_sex, date_of_birth } = patientValues
    const { height_ft, height_in, weight_lbs } = values
    const ageByMonth = getAgeByMonth(date_of_birth)
    const bmi = getBMI(height_ft, height_in, weight_lbs)
    const bmiPercentile = getBMIPercentile(birth_sex, ageByMonth, bmi)
    const submitButton = screen.getByTestId('submit-button')
    await act(async () => submitButton.click())
    expect(console.log).toHaveBeenCalledWith({
      ...values,
      bmi,
      bmi_percentile: bmiPercentile,
    })
  })
})
