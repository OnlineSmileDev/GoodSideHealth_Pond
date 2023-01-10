import ScreeningDataDashboard from './ScreeningDataDashboard'
import * as selectors from './screeningDataDashboard.selectors'
import slice from './screeningDataDashboard.slice'

export const { name, reducer } = slice
export const {
  selectScreeningReport,
  selectSubmissionFilters,
  selectSelectedModal,
  selectPatients,
  selectOrganizations,
} = selectors

export default ScreeningDataDashboard
