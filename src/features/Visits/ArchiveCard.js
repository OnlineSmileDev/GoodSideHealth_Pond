import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { Col, Row, Button, Badge, Image } from 'react-bootstrap'
import classNames from 'classnames'
import { BadgeRound, BADGE_VARIANT } from 'components/atoms/BadgeRound'
import { Card, CARD_VARIANT } from 'components/atoms/Card'
import { AT_HOME_TELEHEALTH } from 'constants/placeOfService'
import { MAJOR_PATIENT_AGE, PATIENT_STATUS } from 'constants/patients'
import { USER_ROLES } from 'constants/users'
import { VISITS_STATUS } from 'constants/visits'
import { capitalizeFirstLetterOfEachWord } from 'utils/capitalizeFirstLetterOfEachWord'
import { getFormattedTime } from 'utils/getFormattedTime'
import Icons from '../../assets/icons'
import { isAgeIsGreaterThan21 } from '../../helpers/dobFormatter'
import { getTimerFormatter } from '../../helpers/getTimerFormatter'
import { selectCurrentUserHasPermissions } from '../../infrastructure/userContext'
import { actions } from './visits.slice'
import { VISIT_MODALS } from '../visitModals/visitModals.constants'
import { fetchVisitDetails } from '../VisitItem'
import { updateVisitSession } from '../VisitSession/visitSession.asyncActions'
import { SESSION_STATUS } from '../VisitSession/visitSession.constants'
import { selectUserDetails } from '../Users'

const { saveSelectedVisit, setSelectedVisitModal } = actions
const COMPLETE = 'Complete'
const MIN_VIDEO_VISIT_PARTICIPANT = 1

const ArchiveCard = ({ visits, status }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const currentUserHasPermissions = useSelector(selectCurrentUserHasPermissions)
  const user = useSelector(selectUserDetails)
  const isProvider = currentUserHasPermissions([USER_ROLES.PROVIDER])
  const isVisitArchive = router.pathname === '/visits'
  // PERMISSION:- Can Read Visit
  const isProviderQueue = isProvider && !isVisitArchive
  const isVisitCompleted =
    status === VISITS_STATUS.COMPLETED ||
    status === VISITS_STATUS.ACTION_REQUIRED ||
    status === VISITS_STATUS.VISIT_ENDED

  const isVideoParticipantsAvailable = (videoParticipants) =>
    videoParticipants?.length >= MIN_VIDEO_VISIT_PARTICIPANT
  // TODO: Replace role check with extraction of role and using it to fetch role specific values like we did for session logs
  const isActionRequired = (visit) =>
    isProvider ? !visit.providerCompleted : !visit.facilitatorCompleted

  const filteredVisits = !status
    ? visits
    : visits.filter((visit) => {
        const visitStatus = capitalizeFirstLetterOfEachWord(visit.status)
        return !visit.sessionType
          ? status === VISITS_STATUS.ACTION_REQUIRED
            ? visitStatus === VISITS_STATUS.ENDED && isActionRequired(visit)
            : status === VISITS_STATUS.PENDING
            ? visitStatus === VISITS_STATUS.IN_PROGRESS &&
              !isVideoParticipantsAvailable(visit.videoParticipants)
            : status === VISITS_STATUS.IN_PROGRESS
            ? visitStatus === VISITS_STATUS.IN_PROGRESS &&
              isVideoParticipantsAvailable(visit.videoParticipants)
            : status === VISITS_STATUS.VISIT_ENDED
            ? visitStatus === VISITS_STATUS.ENDED && !isActionRequired(visit)
            : visitStatus === status
          : status === VISITS_STATUS.VISIT_ENDED
          ? visitStatus === VISITS_STATUS.ENDED
          : visitStatus === status
      })

  const ordersStatusFormatter = (completeOrder, toatalOrders) => {
    const isOrdersCompleted = completeOrder === toatalOrders
    return (
      <Badge
        className={classNames('font-weight-bold badge-sm w-160', {
          'badge-outline-success': isOrdersCompleted,
          'badge-outline-warning': !isOrdersCompleted,
        })}
      >
        {`${completeOrder}/${toatalOrders} Orders Complete`}
      </Badge>
    )
  }

  const handleClick = (visit) => {
    const { status: visitStatus, sessionType, id } = visit
    if (sessionType) {
      if (
        visitStatus === SESSION_STATUS.NEW ||
        visitStatus === SESSION_STATUS.WAITING
      ) {
        const updatedSession = { status: SESSION_STATUS.IN_PROGRESS }
        dispatch(updateVisitSession({ id: id, updatedSession })).then(() =>
          router.push(`/sessions/${id}`)
        )
      } else {
        router.push(`/sessions/${id}`)
      }
    } else {
      dispatch(saveSelectedVisit(visit))
      // PERMISSION:  Can Read Visit
      if (visitStatus === VISITS_STATUS.WAITING && isProvider) {
        dispatch(setSelectedVisitModal(VISIT_MODALS.CLAIM_VISIT_REQUEST))
        dispatch(fetchVisitDetails({ visitId: id }))
      } else router.push(`/visit/${id}`)
    }
  }

  if (!filteredVisits.length) return null

  const getCardVariant = (status) => {
    switch (status) {
      case VISITS_STATUS.COMPLETED:
        return CARD_VARIANT.SUCCESS
      case VISITS_STATUS.WAITING:
      case VISITS_STATUS.PENDING:
      case VISITS_STATUS.NEW:
        return CARD_VARIANT.WARNING
      case VISITS_STATUS.IN_PROGRESS:
        return CARD_VARIANT.PURPLE
      case VISITS_STATUS.ACTION_REQUIRED:
      case VISITS_STATUS.VISIT_ENDED:
        return CARD_VARIANT.DANGER
      default:
        return ''
    }
  }

  return (
    <Col md={12}>
      {status && (
        <h4
          className='font-weight-bold text-light lh-40 mb-20 f-18'
          data-test={status === VISITS_STATUS.COMPLETED ? 'Complete' : status}
        >
          {status === VISITS_STATUS.COMPLETED ? 'Complete' : status} (
          {filteredVisits.length})
        </h4>
      )}
      {filteredVisits.map((visit) => {
        const {
          status: visitStatus,
          videoParticipants,
          sessionType,
          completeMedicationOrders,
          completeTestOrders,
          visitReason,
          locationName,
          state,
          medicationOrders,
          testOrders,
          dateOfBirth,
          name,
          firstName,
          lastName,
          organizationName,
          language,
          visitCount,
          providerFirstName,
          providerLastName,
          providerCredentials,
          placeOfServiceId,
        } = visit
        const firstParticipantIndex = 0
        const completedOrders = +completeMedicationOrders + +completeTestOrders
        const totalOrders = +medicationOrders + +testOrders
        const otherVideoParticipants = videoParticipants?.filter(
          (each) => parseInt(each.id) !== user.id
        )
        const visitStatusCapitalized =
          capitalizeFirstLetterOfEachWord(visitStatus)

        const getVideoCallDetails = (videoParticipants) => {
          const { name, credentials } = videoParticipants[firstParticipantIndex]
          const restVideoParticipants =
            videoParticipants.length > 1
              ? ` +${videoParticipants.length - 1}`
              : ''

          return (
            name +
            `${credentials ? `, ${credentials}` : ''}` +
            restVideoParticipants
          )
        }

        const buttonClass = isProviderQueue
          ? 'btn-view-more'
          : isVisitCompleted
          ? 'btn-view'
          : 'btn-resume'

        const isAtHomeVisit = placeOfServiceId === AT_HOME_TELEHEALTH

        return (
          <Card
            key={visit.id}
            className='tw-mb-5'
            variant={getCardVariant(status || visitStatusCapitalized)}
            dataTest='visit-card'
          >
            <Row className='align-items-center'>
              <Col lg={3} md={6} className='mb-4 mb-md-0'>
                <h4 className='lh-40 mb-1 font-weight-bold f-22 d-flex align-items-center'>
                  {(isAgeIsGreaterThan21(dateOfBirth) || visitCount) && (
                    <Badge
                      className='badge-round rounded-circle border-0 text-white p-0  text-center f-10 lh-25 mr-2'
                      variant={visitCount ? 'primary' : 'warning'}
                    >
                      {visitCount || `${MAJOR_PATIENT_AGE}+`}
                    </Badge>
                  )}
                  {isAtHomeVisit && (
                    <BadgeRound
                      variant={BADGE_VARIANT.PRIMARY}
                      className='tw-flex tw-flex-row tw-items-center tw-p-0.5'
                    >
                      <Image
                        src={Icons.homeVisitBadge}
                        alt='home visit badge'
                        className='tw-mb-0.5'
                      />
                    </BadgeRound>
                  )}
                  <span className='overflow-hidden'>
                    {name || `${firstName} ${lastName}`}
                  </span>
                </h4>
                {isProviderQueue ? (
                  <Badge className='font-weight-bold badge-sm w-160 badge-outline-warning'>
                    {visitStatusCapitalized === VISITS_STATUS.COMPLETED
                      ? COMPLETE
                      : visitStatusCapitalized === VISITS_STATUS.NEW
                      ? VISITS_STATUS.WAITING
                      : visitStatusCapitalized}
                  </Badge>
                ) : (
                  !sessionType &&
                  totalOrders > 0 &&
                  ordersStatusFormatter(completedOrders, totalOrders)
                )}
              </Col>
              <Col lg={3} md={6} className='mb-4 mb-md-0'>
                <h5 className='lh-40 mb-1 font-weight-bold f-14 '>
                  {sessionType || visitReason}
                </h5>
                <span className='lh-25 f-14'>
                  {`${
                    locationName &&
                    capitalizeFirstLetterOfEachWord(locationName)
                  }
								| ${state}`}
                </span>
              </Col>
              <Col lg={2} md={6} className='mb-4 mb-md-0'>
                <h5 className='lh-40 mb-1 f-14 '>
                  <strong>
                    {isProviderQueue && sessionType
                      ? 'Visit Scheduled: '
                      : 'Time in Status: '}
                  </strong>
                  {isProviderQueue && sessionType
                    ? getFormattedTime(visit.createdAt)
                    : getTimerFormatter(
                        visit.createdAt,
                        sessionType ? visit.updatedAt : visit.date,
                        status
                      )}
                </h5>
                <span className='lh-25 f-14'>{organizationName}</span>
              </Col>
              <Col lg={2} md={6} className='align-self-start mb-4 mb-md-0'>
                <h5 className='lh-40 mb-1 f-14 '>{language}</h5>
                {status === VISITS_STATUS.COMPLETED ? (
                  <span className='tw-text-sm tw-leading-6'>
                    {providerFirstName} {providerLastName}
                    {providerCredentials ? `, ${providerCredentials}` : null}
                  </span>
                ) : null}
                {otherVideoParticipants?.length ? (
                  <>
                    <div className='d-flex lh-25 align-items-center'>
                      <span className='status-sign d-inline-block rounded-circle mr-2 bg-success' />
                      <span className='f-14'>
                        {getVideoCallDetails(otherVideoParticipants)}
                      </span>
                    </div>
                  </>
                ) : null}
              </Col>
              <Col lg={2} md={12}>
                <Button
                  id={`viewButton-${visit.id}`}
                  variant={`${isVisitCompleted ? 'light' : 'secondary'}`}
                  className={`btn-block ${buttonClass}`}
                  data-test={`view-button-${visit.id}`}
                  onClick={() => handleClick(visit)}
                >
                  {isProviderQueue
                    ? 'View More'
                    : isVisitCompleted
                    ? 'View'
                    : 'Resume'}
                </Button>
              </Col>
            </Row>
          </Card>
        )
      })}
    </Col>
  )
}
export default ArchiveCard
