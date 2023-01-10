import VisitItem from './VisitItem'
import * as selectors from './visitItem.selectors'
import slice from './visitItem.slice'
import * as asyncActions from './visitItem.asyncActions'
import * as effects from './visitItem.effects'
export const {
  name,
  reducer,
  actions: { setSelectedVisitItemModal, resetRequestVisitForm },
} = slice

export const { fetchVisitDetails, updateVisit, fetchLocations } = asyncActions

export const {
  selectVisitDetails,
  selectSelectedVisitItemModal,
  selectSelectedLocation,
  selectLocations,
} = selectors

export const { useFetchVisitItems } = effects

export default VisitItem
