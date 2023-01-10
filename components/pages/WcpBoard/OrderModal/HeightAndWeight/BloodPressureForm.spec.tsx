import { render, screen, act, fireEvent } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './BloodPressureForm.stories'
import { BloodPressureReading } from './BloodPressureForm'

const { Primary, Disabled } = composeStories(stories)

describe('Blood pressure form interaction test', () => {
  test('form returns latest value when multiple values entered', async () => {
    render(<Primary />)
    console.log = jest.fn()
    await act(async () => screen.getByText('Add Blood Pressure Test').click())
    const sys = await screen.findByTestId('pressure-systolic-1')
    const dia = await screen.findByTestId('pressure-diastolic-1')
    expect(sys).toBeDefined()
    fireEvent.change(sys, { target: { value: 200 } })
    expect(dia).toBeDefined()
    fireEvent.change(dia, { target: { value: 150 } })
    expect(console.log).toHaveBeenCalledWith({
      pressure_systolic: 200,
      pressure_diastolic: 150,
    } as BloodPressureReading)
  })

  test('form allows removal of previous values', async () => {
    render(<Primary />)
    console.log = jest.fn()
    await act(async () => screen.getByText('Add Blood Pressure Test').click())
    const sys = await screen.findByTestId('pressure-systolic-1')
    const dia = await screen.findByTestId('pressure-diastolic-1')
    expect(sys).toBeDefined()
    fireEvent.change(sys, { target: { value: 200 } })
    expect(dia).toBeDefined()
    fireEvent.change(dia, { target: { value: 150 } })
    await act(async () => screen.getByTestId('remove-reading-1').click())
    expect(console.log).toHaveBeenCalledWith(stories.Primary.args.value)
  })
})
