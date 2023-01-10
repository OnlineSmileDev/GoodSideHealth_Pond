import VisitSession from './VisitSession'
import * as selectors from './visitSession.selectors'
import slice from './visitSession.slice'

export const { name, actions, reducer } = slice

export const { selectVisitSession } = selectors

export default VisitSession
