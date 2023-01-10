import React from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useFeatures } from 'flagged'
import { USER_ROLES, USER_STATUS } from 'constants/users'
import { VISITS_STATUS } from 'constants/visits'
import { selectCurrentUserHasPermissions } from '../../infrastructure/userContext/userContext.selectors'
import ScreeningDataDashboard from '../ScreeningDataDashboard'
import Visits from '../Visits'
import { selectUserDetails } from '../Users'
import ScheduleArchive from '../ScheduleArchive'

const Dashboard = () => {
  const router = useRouter()
  const currentUserHasPermissions = useSelector(selectCurrentUserHasPermissions)
  const isAdmin = currentUserHasPermissions([USER_ROLES.ADMIN])
  const isFacilitator = currentUserHasPermissions([USER_ROLES.NURSE])
  const isTestAdmin = currentUserHasPermissions([USER_ROLES.TEST_ADMIN])
  const isTestScheduler = currentUserHasPermissions([USER_ROLES.TEST_SCHEDULER])
  const { visitAndSessionArchiveTable, visitsTable, sessionsTable } =
    useFeatures()

  const { approved, status: userStatus } = useSelector(selectUserDetails)

  let status
  if (visitAndSessionArchiveTable || visitsTable || sessionsTable) {
    status = [VISITS_STATUS.WAITING, VISITS_STATUS.IN_PROGRESS]
  } else {
    status = [VISITS_STATUS.WAITING]
  }

  if (isFacilitator) {
    // PERMISSION:- !Can Read Visits && Can Read Created/Claimed Visits
    router.push('/visits')
  }

  return (
    <>
      {userStatus !== USER_STATUS.PENDING && (
        <>
          {isAdmin ? (
            // PERMISSION:- Admin Permissions
            <ScreeningDataDashboard />
          ) : isTestAdmin || isTestScheduler ? (
            // PERMISSION:- Can Create session || Can Add test result to Session Visits
            <ScheduleArchive />
          ) : (
            // PERMISSION:- Can Read Visits &&  Can Read Created/Claimed Visits
            approved && <Visits status={status} />
          )}
        </>
      )}
    </>
  )
}

export default Dashboard
