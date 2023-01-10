import React, { useEffect } from 'react'
import { Button, Row, Col } from 'react-bootstrap'
import { isEmpty } from 'utils/isEmpty'
import SessionSummary from './SessionSummary'
import SessionPatientsTable from './SessionPatientsTable'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectVisitSession,
  selectSelectedVisitSessionModal,
  selectSessionSummary,
} from './visitSession.selectors'
import { useRouter } from 'next/router'
import { VISIT_SESSION_MODALS } from '../VisitSessionModals/visitSessionModals.constants'
import { actions } from './visitSession.slice'
import getVisitSessionModal from '../VisitSessionModals'
import { useFetchVisitSession } from './visitSession.effects'
import { SESSION_STATUS } from './visitSession.constants'

const { setVisitSessionModal } = actions

const VisitSession = () => {
  const router = useRouter()
  const { id } = router.query
  const visitSession = useSelector(selectVisitSession)
  const sessionSummary = useSelector(selectSessionSummary)
  const selectedVisitSessionModal = useSelector(selectSelectedVisitSessionModal)
  const dispatch = useDispatch()
  const { name, locationName, sessionType, location, status } = {
    ...visitSession,
  }
  let state = ''
  if (location && location.organization) state = location.organization.state
  const isSessionCompleted = status === SESSION_STATUS.COMPLETED
  const isSessionEnded = status === SESSION_STATUS.ENDED

  useEffect(() => {
    return () => {
      dispatch(setVisitSessionModal(null))
    }
  }, [dispatch])

  useFetchVisitSession(id)

  return (
    !isEmpty(visitSession) && (
      <>
        {selectedVisitSessionModal &&
          getVisitSessionModal(selectedVisitSessionModal)}
        <div className='px-15'>
          <Row className='py-15 bg-white mb-20 border-top border-bottom'>
            <Col lg={6} xl={8}>
              <Button
                variant='link'
                className={`btn-auto p-0 f-16 text-dark font-weight-bold e2e-provider-session-groupname-${name}`}
              >
                {name}
              </Button>
              <h5
                className={`opacity-50 mb-0 f-14 font-weight-bold lh-25 e2e-provider-session-locationname-${name} e2e-provider-session-sessiontype-${name}`}
              >{`${locationName} | ${state} | ${sessionType}`}</h5>
            </Col>
            <Col lg={3} xl={2} className='my-3 my-lg-0'>
              {!(isSessionCompleted || isSessionEnded) && (
                <Button
                  variant='warning'
                  className='btn-block pendo-visits-sessions-archive-release-session-button'
                  onClick={() =>
                    dispatch(
                      setVisitSessionModal(
                        VISIT_SESSION_MODALS.RELEASE_SESSION_MODAL
                      )
                    )
                  }
                >
                  Release Session
                </Button>
              )}
            </Col>
            <Col lg={3} xl={2}>
              {!isSessionEnded && (
                <Button
                  variant='primary'
                  className='btn-block pendo-visits-sessions-archive-end-session-button'
                  onClick={() =>
                    isSessionCompleted
                      ? router.push('/visits')
                      : dispatch(
                          setVisitSessionModal(
                            VISIT_SESSION_MODALS.END_SESSION_MODAL
                          )
                        )
                  }
                >
                  {isSessionCompleted ? 'Close Session' : 'End Session'}
                </Button>
              )}
            </Col>
          </Row>
          <Row>
            <Col lg={3}>
              <SessionSummary sessionSummary={sessionSummary} />
            </Col>
            <Col lg={9}>
              <SessionPatientsTable />
            </Col>
          </Row>
        </div>
      </>
    )
  )
}

export default VisitSession
