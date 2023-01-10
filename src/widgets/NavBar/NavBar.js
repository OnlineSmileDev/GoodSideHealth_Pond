import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Navbar,
  Nav,
  Button,
  Container,
  Image,
  Dropdown,
} from 'react-bootstrap'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useQuery } from 'react-query'
import { Feature, useFeatures } from 'flagged'
import { useAuth0 } from '@auth0/auth0-react'
import { USER_ROLES } from 'constants/users'
import { VISITS_STATUS, PROVIDER_VISIT_TYPE } from 'constants/visits'
import RequestVisitModal from '../../features/RequestVisitModal'
import IMAGES from '../../assets/images'
import { actions } from '../Wizard/wizard.slice'
import { SELECTED_MODAL } from '../../features/ScreeningDataDashboard/screeningDataDashboard.constants'
import { actions as action } from '../../features/ScreeningDataDashboard/screeningDataDashboard.slice'
import ScheduleTestModal from '../../features/ScheduleTestModal'
import { selectVisitDetails } from '../../features/VisitItem/visitItem.selectors'
import Icons from '../../assets/icons'
import { selectProviderVisit } from '../../features/Visits/visits.selector'
import { actions as visitAction } from '../../features/Visits/visits.slice'

const { resetCurrentStep, resetFormValues } = actions
const { saveSelectedModal } = action
const { setProviderVisit, resetSessionsFilters, resetVisitsFilters } =
  visitAction

function userHasPermissions(user, permission) {
  if (!user) return false
  const { permissions } = user[`${process.env.NEXT_PUBLIC_JWT_AUDIENCE}/user`]
  return permissions.includes(permission)
}

export default function NavBar() {
  const { logout, user } = useAuth0()
  const { pathname } = useRouter()
  const [shouldShowModal, toggleModal] = useState({
    requestVisit: false,
    scheduleTest: false,
  })

  const isProvider = userHasPermissions(user, USER_ROLES.PROVIDER)
  const isTestAdmin = userHasPermissions(user, USER_ROLES.TEST_ADMIN)
  const isSchoolAdmin = userHasPermissions(user, USER_ROLES.ADMIN)
  const isNurse = userHasPermissions(user, USER_ROLES.NURSE)
  const isTestScheduler = userHasPermissions(user, USER_ROLES.TEST_SCHEDULER)
  const visitDetails = useSelector(selectVisitDetails)
  const userQuery = useQuery('/api/users/1')
  const providerVisit = useSelector(selectProviderVisit)
  const dispatch = useDispatch()
  const {
    visitAndSessionArchive,
    visitsArchive,
    visitAndSessionArchiveTable,
    visitsTable,
    sessionsTable,
    sessionsArchive,
  } = useFeatures()

  const isNursePage = pathname === '/visits' || pathname === '/patients'
  const isCompletedSession = visitDetails.status === VISITS_STATUS.COMPLETED
  const isDashboardPath = pathname === '/'

  const resetWizard = () => {
    dispatch(resetCurrentStep())
    dispatch(resetFormValues())
  }
  return (
    <>
      <Navbar bg='white' expand='lg' className='static-top p-0'>
        {shouldShowModal.requestVisit && (
          <RequestVisitModal
            onClose={() =>
              toggleModal({
                requestVisit: false,
              })
            }
          />
        )}
        {shouldShowModal.scheduleTest && (
          <ScheduleTestModal
            onClose={() =>
              toggleModal({
                scheduleTest: false,
              })
            }
          />
        )}
        <Container fluid>
          <Link passHref href={isNurse ? '/visits' : '/'} onClick={resetWizard}>
            <Navbar.Brand className='pt-0 mr-15 pendo-duck-icon-home-button'>
              <Image
                src={IMAGES.logoCircle}
                alt='logo-circle'
                width='53'
                height='53'
              />
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle
            aria-controls='basic-navbar-nav'
            className='border-0 text-white'
          />
          <Navbar.Collapse>
            <Nav className='mr-auto align-items-lg-center pendo-dashboard-button'>
              {(isProvider || isSchoolAdmin) && (visitsArchive || visitsTable) && (
                <Nav.Item>
                  <Link passHref href='/'>
                    <Nav.Link>
                      {isProvider && visitsArchive ? 'Queue' : 'Dashboard'}
                    </Nav.Link>
                  </Link>
                </Nav.Item>
              )}
              {!isSchoolAdmin &&
                !isTestAdmin &&
                !isTestScheduler &&
                (visitAndSessionArchive || visitAndSessionArchiveTable) && (
                  <Nav.Item>
                    <Link passHref href={'/visits'}>
                      <Nav.Link>
                        {visitAndSessionArchive ? 'My Visits' : 'Visits'}
                      </Nav.Link>
                    </Link>
                  </Nav.Item>
                )}
              {(isNurse || isProvider) && (
                <Feature name='patientArchive'>
                  <Nav.Item>
                    <Link passHref href={'/patients'}>
                      <Nav.Link>Patients</Nav.Link>
                    </Link>
                  </Nav.Item>
                </Feature>
              )}
              {(isTestAdmin || isTestScheduler) && (
                <Nav.Item>
                  <Link passHref href={'/'}>
                    <Nav.Link>Schedule</Nav.Link>
                  </Link>
                </Nav.Item>
              )}
              {isNurse && (isNursePage || isCompletedSession) && (
                <Nav.Item className='px-0 px-md-4 pendo-request-visit-button'>
                  <Button
                    size='lg'
                    variant='warning'
                    data-pen='request-visit-button'
                    onClick={() => {
                      toggleModal({
                        requestVisit: true,
                      })
                      dispatch(saveSelectedModal(SELECTED_MODAL.REQUEST_VISIT))
                    }}
                  >
                    Request Visit
                  </Button>
                </Nav.Item>
              )}
              {isTestScheduler && (
                <Nav.Item className='px-0 px-md-8 pendo-schedule-test-button e2e-schedule-test-button'>
                  <Button
                    size='lg'
                    variant='primary'
                    onClick={() => {
                      toggleModal({
                        scheduleTest: true,
                      })
                      dispatch(saveSelectedModal(SELECTED_MODAL.SCHEDULE_TEST))
                    }}
                  >
                    Schedule Test
                  </Button>
                </Nav.Item>
              )}
            </Nav>
            <Nav className='nav-bar-right align-items-lg-center'>
              <Nav.Item className='px-0 px-md-4'>
                <span className='f-14 px-15 nav-link font-weight-normal'>
                  {userQuery.isSuccess && (
                    <>
                      Welcome, {userQuery.data.firstName}{' '}
                      {userQuery.data.lastName}
                      {userQuery.data.credentials
                        ? `, ${userQuery.data.credentials}`
                        : ''}
                    </>
                  )}
                </span>
              </Nav.Item>
              <Nav.Item className='pl-lg-4 ml-lg-2 pendo-settings-button'>
                <Link passHref href='/settings'>
                  <Nav.Link className='d-flex align-items-center'>
                    Settings
                  </Nav.Link>
                </Link>
              </Nav.Item>
              <Nav.Item className='px-0 px-md-4'>
                <Button
                  variant=''
                  className='f-14 font-weight-bold'
                  onClick={() => logout({ returnTo: window.location.origin })}
                >
                  Log out
                </Button>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {isDashboardPath && isProvider && (
        <div className='px-15 py-25 bg-white border-top border-bottom'>
          <Container fluid>
            <Dropdown>
              <Dropdown.Toggle
                variant='link'
                className='btn btn-link btn-auto text-decoration-none p-0 f-16 text-grey hind font-weight-bold d-flex align-items-center mwd-185 pendo-visits-sessions-toggle e2e-visits-sessions-toggle'
              >
                {providerVisit}
                <Image
                  src={Icons.caretDarkIcon}
                  width='9'
                  className='ml-auto'
                  alt='caret-dark'
                />
              </Dropdown.Toggle>
              <Dropdown.Menu className='top-nav-dropdown py-20'>
                <h4 className='mb-20 lh-25 hind f-16 font-weight-bold px-10'>
                  Dashboards
                </h4>
                <Dropdown.Item
                  className='f-14 lh-25 font-weight-normal px-10 d-block py-0 mb-2 pendo-visits-sessions-toggle-on-demand e2e-visits-sessions-toggle-on-demand'
                  onSelect={() => {
                    dispatch(
                      setProviderVisit(PROVIDER_VISIT_TYPE.ON_DEMAND_VISITS)
                    )
                    dispatch(resetVisitsFilters())
                  }}
                >
                  {visitsTable
                    ? 'On-Demand Visit'
                    : visitsArchive
                    ? 'On-Demand Visit Queue'
                    : ''}
                </Dropdown.Item>
                <Dropdown.Item
                  className='f-14 lh-25 font-weight-normal px-10 d-block py-0 mb-2 pendo-visits-sessions-scheduled-visits e2e-visits-sessions-scheduled-visits'
                  onSelect={() => {
                    dispatch(
                      setProviderVisit(PROVIDER_VISIT_TYPE.SCHEDULED_VISITS)
                    )
                    dispatch(resetSessionsFilters())
                  }}
                >
                  {sessionsTable
                    ? 'Scheduled Visits'
                    : sessionsArchive
                    ? 'Scheduled Visits Queue'
                    : ''}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Container>
        </div>
      )}
    </>
  )
}
