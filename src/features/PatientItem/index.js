import PatientItem from './PatientItem'
import * as selectors from './patientItem.selectors'
import slice from './patientItem.slice'
import { withFeature } from 'flagged'

export const { name, actions, reducer } = slice

export const { selectPatientDetails, selectFilters, selectLocations } =
  selectors

export default withFeature('patientDetails')(PatientItem)
