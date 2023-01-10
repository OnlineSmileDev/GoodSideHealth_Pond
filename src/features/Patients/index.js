import { withFeature } from 'flagged'
import Patients from './Patients'
import * as selectors from './patients.selectors'
import slice from './patients.slice'

export const { name, actions, reducer } = slice

export const {
  selectPatients,
  selectPatientFilters,
  selectSelectedPatientModal,
} = selectors

export default withFeature('patientArchive')(Patients)
