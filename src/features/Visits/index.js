import Visits from './Visits'
import * as selectors from './visits.selector'
import slice from './visits.slice'
import * as effects from './visits.effects'

export const {
  name,
  actions: { saveSelectedVisit, setSelectedVisitModal },
  reducer,
} = slice

export const {
  selectSelectedVisit,
  selectSelectedVisitModal,
  selectVisits,
  selectVisitsAndSessionFilters,
} = selectors

export const { useFetchVisits } = effects

export default Visits
