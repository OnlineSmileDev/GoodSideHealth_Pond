import { render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import { getFormattedDate } from 'utils/datePicker'
import * as stories from './index.stories'

const { Primary } = composeStories(stories)

describe('VisitCard interaction test', () => {
  test('Verify Visit Card Details: FirstName, LastName, DoB, ID', async () => {
    const targetItem = stories.Primary.args
    const { visit } = targetItem
    const { id, first_name, last_name, date_of_birth } = visit
    render(<Primary />)

    const nameElement = screen.getByText(`${first_name} ${last_name}`)
    expect(nameElement).not.toBeNull()

    const dob = getFormattedDate(date_of_birth)
    const dobAndIdElement = screen.getByText(`DoB ${dob} | ID #${id}`)
    expect(dobAndIdElement).not.toBeNull()
  })

  test('Verify Visit Card dynamic actionName', async () => {
    const targetItem = stories.Primary.args
    const { actionName } = targetItem
    render(<Primary />)

    const actionNameElement = screen.getByText(actionName)
    expect(actionNameElement).not.toBeNull()
  })

  test('Verify Visit Card onClick handler', async () => {
    const targetItem = stories.Primary.args
    const { actionName, visit } = targetItem
    const patientName = `${visit?.first_name} ${visit?.last_name}`
    const { patient_id } = visit
    const mockAPI = jest.fn()
    render(<Primary handleAction={mockAPI} />)

    const visitCardElement = screen.getByText(actionName)
    visitCardElement.click()

    expect(mockAPI).toHaveBeenCalledWith(
      targetItem.visit?.id,
      patientName,
      patient_id
    )
  })

  test('Verify Visit Card onClick download handler', async () => {
    const targetItem = stories.Primary.args
    const { handleDownload } = targetItem
    console.log = jest.fn()
    render(<Primary handleDownload={handleDownload} />)

    const visitCardElement = screen.getByAltText('downloadButton')
    visitCardElement.click()

    expect(console.log).toHaveBeenCalledWith('Handle download for Visit')
  })
})
