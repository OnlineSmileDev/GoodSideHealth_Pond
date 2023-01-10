import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Row,
  Col,
  Button,
  Badge,
  Card,
  Image,
  Accordion,
} from 'react-bootstrap'
import classNames from 'classnames'
import { BUSY_INDICATOR_NAME } from 'constants/busyIndicator'
import { USER_ROLES } from 'constants/users'
import { dateFormatter } from 'utils/dateFormatter'
import { getFormattedTime } from 'utils/getFormattedTime'
import ScheduleVisitSessionTable from './ScheduleVisitSessionTable'
import { actions } from './scheduleArchive.slice'
import Icons from '../../assets/icons'
import { SCHEDULE_ARCHIVE_MODAL } from '../ScheduleArchiveModal/scheduleArchiveModal.constants'
import {
  selectScheduleArchiveData,
  selectScheduleArchiveFilters,
} from './scheduleArchive.selectors'
import IMAGES from '../../assets/images'
import { selectCurrentUserHasPermissions } from '../../infrastructure/userContext/userContext.selectors'
import { fetchVisitsOfSchedule } from './scheduleArchive.asyncActions'
import BusyIndicator from '../../widgets/busyIndicator'
import { WEEK_DAY_TO_NUMBER } from './scheduleArchive.constants'

const {
  setScheduleArchiveModal,
  saveSelectedSession,
  setScheduleVisitSessionFilter,
  resetScheduledVisits,
} = actions

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

const getDays = (obj) => {
  return Object.keys(obj)
    .sort(
      (firstDay, secondDay) =>
        WEEK_DAY_TO_NUMBER[firstDay] - WEEK_DAY_TO_NUMBER[secondDay]
    )
    .reduce((acc, cur) => {
      if (obj[cur]) acc.push(capitalize(cur))
      return acc
    }, [])
    .join(', ')
}

const ScheduleVisitSession = () => {
  const currentUserHasPermissions = useSelector(selectCurrentUserHasPermissions)
  const isTestAdmin = currentUserHasPermissions([USER_ROLES.TEST_ADMIN])
  const isTestScheduler = currentUserHasPermissions([USER_ROLES.TEST_SCHEDULER])
  const [toggleVisitSession, setToggleVisitSession] = useState({})
  const scheduleArchiveData = useSelector(selectScheduleArchiveData)
  const filters = useSelector(selectScheduleArchiveFilters)

  const dispatch = useDispatch()

  const dataWithEventKey = scheduleArchiveData.map((data, i) => ({
    ...data,
    eventKey: data.id,
  }))

  useEffect(() => {
    filters && setToggleVisitSession({})
  }, [filters])

  const onClickToggle = (field) => {
    if (!toggleVisitSession.id) {
      dispatch(fetchVisitsOfSchedule(field.id))
    }
    setToggleVisitSession((prev) => ({
      ...prev,
      id: prev.id === field.id ? null : field.id,
    }))
  }

  return (
    <BusyIndicator
      busyIndicatorName={BUSY_INDICATOR_NAME.FETCH_SCHEDULE_ARCHIVE_DATA}
    >
      <Accordion>
        {dataWithEventKey.map((each) => (
          <Card className='border-0 shadow-sm mb-50' key={each.id}>
            <Card.Header className='bg-white border-0 p-20'>
              <Row className='align-items-center'>
                <Col md={3} className='text-center'>
                  <h4 className='f-18 font-weight-bold mb-10'>
                    {getFormattedTime(each.sessionTime)}
                  </h4>
                  <h5
                    className={`opacity-50 mb-0 f-14 font-weight-bold lh-25 e2e-schedule-visit-session-schoolname-${each.name}`}
                  >
                    {each.locationName}
                  </h5>
                </Col>
                <Col md={9}>
                  <div className='d-flex mb-10 align-items-center'>
                    <h4
                      className={`mb-0 f-18 font-weight-bold lh-25 d-flex align-items-center e2e-schedule-visit-session-groupname-${each.name}`}
                    >
                      <Badge
                        variant='light'
                        className='badge-round rounded-circle lh-25 p-0 border-0 f-14 mr-2'
                      >
                        {each.visitCount}
                      </Badge>
                      {each.name}
                    </h4>
                    {/* PERMISSION:- Can add/edit sessions or appointments */}
                    {isTestScheduler && (
                      <>
                        <Button
                          variant='link'
                          className='btn-auto p-0 mr-15 ml-auto'
                          onClick={() => {
                            dispatch(
                              setScheduleArchiveModal(
                                SCHEDULE_ARCHIVE_MODAL.EDIT_SCHEDULE_TEST_MODAL
                              )
                            )
                            dispatch(saveSelectedSession(each))
                            dispatch(setScheduleVisitSessionFilter({}))
                            dispatch(resetScheduledVisits())
                          }}
                        >
                          <Image
                            src={Icons.editIcon}
                            width='20'
                            alt='edit-icon'
                            data-test={`edit-icon-${each.name}`}
                          />
                        </Button>
                        <Button
                          variant='link'
                          className={classNames('btn-auto p-0', {
                            'mr-15': toggleVisitSession.id === each.id,
                          })}
                          onClick={(e) => {
                            dispatch(
                              setScheduleArchiveModal(
                                SCHEDULE_ARCHIVE_MODAL.SCHEDULE_TEST_DELETE_MODAL
                              )
                            )
                            dispatch(saveSelectedSession(each))
                          }}
                        >
                          <Image
                            src={Icons.trashIcon}
                            width='18'
                            alt='trash-icon'
                          />
                        </Button>
                      </>
                    )}
                    {toggleVisitSession.id === each.id && (
                      <Button
                        variant='link'
                        className={classNames('btn-auto p-0', {
                          'ml-auto': isTestAdmin,
                        })}
                      >
                        <Image
                          src={IMAGES.download}
                          width='18'
                          alt='download-icon'
                        />
                      </Button>
                    )}
                  </div>
                  <div className='d-flex align-items-center'>
                    <h5
                      className={`opacity-50 mb-0 f-14 font-weight-bold lh-25 e2e-schedule-visit-session-sessiontype-${each.name}`}
                    >
                      {`${each.sessionType} ${
                        each.frequencyType ===
                          SCHEDULE_ARCHIVE_MODAL.RECURRING_TEST &&
                        each.repeatsOn
                          ? `Every ${getDays(
                              each.repeatsOn
                            )} Until ${dateFormatter(each.sessionEndDate)} `
                          : ''
                      }`}
                    </h5>
                    <Accordion.Toggle
                      eventKey={each.eventKey}
                      className={`d-flex text-nowrap btn btn-link btn-auto p-0 f-14 text-dark font-weight-bold ml-auto border-0 pendo-schedule-visit-session-view-more e2e-schedule-visit-session-view-more-${each.name}`}
                      onClick={() => onClickToggle(each)}
                    >
                      {toggleVisitSession.id === each.id
                        ? 'Less Details'
                        : 'View More'}
                      <Image
                        src={
                          toggleVisitSession.id === each.id
                            ? Icons.arrowUpIcon
                            : Icons.arrowDownIcon
                        }
                        width='15'
                        className='ml-2'
                        alt='arrow-down-icon'
                      />
                    </Accordion.Toggle>
                  </div>
                </Col>
              </Row>
            </Card.Header>
            <Accordion.Collapse eventKey={each.eventKey}>
              <>
                {toggleVisitSession.id === each.id && (
                  <Card.Body
                    className='px-20 py-0 collapse show'
                    data-test={`session-name-${each.name}`}
                  >
                    <ScheduleVisitSessionTable sessionId={each.id} />
                  </Card.Body>
                )}
              </>
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>
    </BusyIndicator>
  )
}
export default ScheduleVisitSession
