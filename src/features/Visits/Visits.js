import React from 'react'
import router, { useRouter } from 'next/router'
import { Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import { USER_ROLES } from 'constants/users'
import { VISITS_STATUS, PROVIDER_VISIT_TYPE } from 'constants/visits'
import { selectCurrentUserHasPermissions } from '../../infrastructure/userContext'
import SessionsTable from './SessionsTable'
import {
  selectProviderVisit,
  selectSelectedVisitModal,
} from './visits.selector'
import VisitsAndSessionArchiveTable from './VisitsAndSessionArchiveTable'
import VisitsAndSessionArchive from './VisitsAndSessionArchive'
import VisitsArchive from './VisitsArchive'
import getVisitModal from '../visitModals'
import SessionsArchive from './SessionsArchive'
import VisitsTable from './VisitsTable'
import SearchBar from './SearchBar'

const Visits = ({ status }) => {
  const { pathname } = useRouter()
  const currentUserHasPermissions = useSelector(selectCurrentUserHasPermissions)
  const isProvider = currentUserHasPermissions([USER_ROLES.PROVIDER])
  const isSchoolAdmin = currentUserHasPermissions([USER_ROLES.ADMIN])
  const providerVisit = useSelector(selectProviderVisit)
  const isVisitArchive = pathname === '/visits'
  const selectedVisitModal = useSelector(selectSelectedVisitModal)

  if (!status) {
    status = isProvider
      ? [VISITS_STATUS.WAITING, VISITS_STATUS.IN_PROGRESS]
      : [VISITS_STATUS.COMPLETED]
  }
  const isDashboardPath = pathname === '/'

  if (isSchoolAdmin) router.push('/')
  if (isDashboardPath && !isProvider) router.push('/visits')

  return (
    <>
      {selectedVisitModal && getVisitModal(selectedVisitModal)}
      <div className={classNames('px-15', { 'py-25': !isDashboardPath })}>
        <SearchBar />
        {providerVisit === PROVIDER_VISIT_TYPE.SCHEDULED_VISITS &&
        !isVisitArchive ? (
          // Can Read sessions
          <>
            <Row>
              <SessionsTable />
            </Row>
            <SessionsArchive />
          </>
        ) : // PERMISSION:- Can Read Created/Claimed Visits &&  Can Read Created/Claimed sessions.
        isProvider && isVisitArchive ? (
          <>
            <Row>
              <VisitsAndSessionArchiveTable />
            </Row>
            <VisitsAndSessionArchive />
          </>
        ) : (
          <>
            <Row>
              <VisitsTable
                status={status}
                // PERMISSION:- Can Read visits
                isProviderDashboard={isDashboardPath && isProvider}
              />
            </Row>
            <VisitsArchive />
          </>
        )}
      </div>
    </>
  )
}
export default Visits
