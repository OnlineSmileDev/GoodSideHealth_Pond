import { render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/testing-react'
import * as stories from './index.stories'

const { Primary } = composeStories(stories)

// data-testid is unavailable in react-bootstrap-table
describe('PatientList molecule interaction test', () => {
  test('Verify number of patients rendered inside table', async () => {
    const targetItem = stories.Primary.args
    const { patients } = targetItem
    const { container } = render(<Primary />)

    /**
     * Can't pass custom data-attribute to Bootstrap table rows
     * https://github.com/react-bootstrap-table/react-bootstrap-table2/issues/1451
     * so cannot use testid for now
     * expect(screen.getAllByTestId('patient-list').length).toBe(patients.length)
     */
    expect(container.querySelectorAll('.patient-list').length).toBe(
      patients.length
    )
  })
})
