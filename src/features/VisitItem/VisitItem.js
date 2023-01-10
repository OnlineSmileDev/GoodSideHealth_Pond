import React, { useEffect, useCallback, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Container } from 'react-bootstrap'
import {
  Notification,
  NOTIFICATION_VARIANT,
} from 'components/atoms/Notification'
import { VISITS_STATUS } from 'constants/visits'
import { isEmpty } from 'utils/isEmpty'
import VisitItemRightPanel from './VisitItemRightPanel'
import VisitItemMiddlePanel from './VisitItemMiddlePanel'
import {
  selectVisitDetails,
  selectPatientVisitDetails,
  selectVisitActivities,
} from './visitItem.selectors'
import { useFetchVisitItems } from './visitItem.effects'
import VisitItemSkeleton from '../Skeleton/VisitItemSkeleton'
import ScheduleVisitItemMiddlePanel from './ScheduleVisitItemMiddlePanel'
import ScheduleVisitItemRightPanel from './ScheduleVisitItemRightPanel'
import { actions } from '../../widgets/Wizard/wizard.slice'
import { actions as action } from './visitItem.slice'
import VideoCard from './VideoCard'
import { REQUEST_FALIURE_ALERT } from './visitItem.constants'
import { fetchPatient } from '../VisitItem/visitItem.asyncActions'
import VisitItemLeftPanel from './VisitItemLeftPanel'

const { resetCurrentStep, resetFormValues } = actions
const {
  setSelectedDischargeNoteModal,
  setSelectedVisitItemModal,
  setSelectedMiddlePanelModal,
  resetPatientVisitDetails,
  resetVisitDetails,
} = action

const VisitItem = () => {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useDispatch()
  const visitDetails = useSelector(selectVisitDetails)
  const patientVisitDetails = useSelector(selectPatientVisitDetails)
  const visitActivities = useSelector(selectVisitActivities)
  const [notifyError, setNotifyError] = useState(false)

  useFetchVisitItems(id)

  const resetWizard = useCallback(() => {
    dispatch(resetCurrentStep())
    dispatch(resetFormValues())
  }, [dispatch])

  useEffect(() => {
    return () => {
      resetWizard()
      dispatch(setSelectedDischargeNoteModal(null))
      dispatch(setSelectedVisitItemModal(null))
      dispatch(setSelectedMiddlePanelModal(null))
      dispatch(resetVisitDetails())
      dispatch(resetPatientVisitDetails())
    }
  }, [resetWizard, dispatch, id])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (isEmpty(patientVisitDetails) && visitDetails.id == id && !notifyError) {
      dispatch(fetchPatient({ id: visitDetails.patientId })).then(
        ({ payload }) => isEmpty(payload) && setNotifyError(true)
      )
    }
  }, [dispatch, visitDetails, patientVisitDetails, notifyError, id])

  return !isEmpty(visitDetails) && !isEmpty(patientVisitDetails) ? (
    <Container fluid>
      <Row className='py-30'>
        <Col
          xl={{ span: 3, order: 1 }}
          lg={{ span: 3, order: 1 }}
          md={{ span: 6, order: 2 }}
          xs={{ span: 12, order: 2 }}
        >
          <VisitItemLeftPanel
            patientDetails={patientVisitDetails}
            visitDetails={visitDetails}
            visitActivities={visitActivities}
          />
        </Col>
        <Col
          xl={{ span: 6, order: 2 }}
          lg={{ span: 6, order: 2 }}
          xs={{ span: 12, order: 1 }}
        >
          {visitDetails.visitMetadata &&
          visitDetails.visitMetadata.isScheduledVisit ? (
            <ScheduleVisitItemMiddlePanel />
          ) : (
            <>
              {(visitDetails.status === VISITS_STATUS.WAITING ||
                visitDetails.status === VISITS_STATUS.IN_PROGRESS) && (
                <VideoCard visit={visitDetails} />
              )}
              <VisitItemMiddlePanel visit={visitDetails} />
            </>
          )}
        </Col>
        <Col
          xl={{ span: 3, order: 3 }}
          lg={{ span: 3, order: 3 }}
          md={{ span: 6, order: 2 }}
          xs={{ span: 12, order: 3 }}
        >
          {visitDetails.visitMetadata &&
          visitDetails.visitMetadata.isScheduledVisit ? (
            <ScheduleVisitItemRightPanel />
          ) : (
            <VisitItemRightPanel visit={visitDetails} />
          )}
        </Col>
      </Row>
    </Container>
  ) : notifyError ? (
    <Notification
      message={REQUEST_FALIURE_ALERT}
      variant={NOTIFICATION_VARIANT.DANGER}
    />
  ) : (
    <VisitItemSkeleton />
  )
}
export default VisitItem
