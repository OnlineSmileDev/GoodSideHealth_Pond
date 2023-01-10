import React from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { actions } from './scheduleArchive.slice'
import { SCHEDULE_ARCHIVE_MODAL } from '../ScheduleArchiveModal/scheduleArchiveModal.constants'
import {
  selectSelectedScheduleArchiveModal,
  selectSchedulePatients,
} from './scheduleArchive.selectors'
import getScheduleArchiveModal from '../ScheduleArchiveModal'
import { useSelector, useDispatch } from 'react-redux'

const { setScheduleArchiveModal } = actions

const TestSummary = () => {
  const selectedScheduleArchiveModal = useSelector(
    selectSelectedScheduleArchiveModal
  )
  const schedulePatients = useSelector(selectSchedulePatients)
  const dispatch = useDispatch()

  return (
    <>
      {selectedScheduleArchiveModal &&
        getScheduleArchiveModal(selectedScheduleArchiveModal)}
      <Card className='border-0 shadow-sm'>
        <Card.Body className='px-20 pt-20 pb-0'>
          <h3 className='f-18 lh-40 mb-20 font-weight-bold text-center'>
            Tests Summary
          </h3>
          <Row>
            <Col sm={12}>
              <div className='text-center mb-15 covid-summary-card'>
                <h6 className='f-14 font-weight-bold lh-25 mb-0'>
                  Total Scheduled Patients
                </h6>
                <h3 className='lh-50 f-32 text-dark mb-0'>
                  {schedulePatients.totalScheduledPatients}
                </h3>
                <Button
                  className='f-12 btn-auto lh-25 font-weight-bold text-decoration-none'
                  variant='link'
                  onClick={() =>
                    dispatch(
                      setScheduleArchiveModal(
                        SCHEDULE_ARCHIVE_MODAL.SCHEDULE_PATIENTS_MODAL
                      )
                    )
                  }
                >
                  Quick View
                </Button>
              </div>
            </Col>
            <Col sm={12}>
              <div className='text-center mb-30 covid-summary-card'>
                <h6 className='f-14 font-weight-bold lh-25 mb-0'>
                  Total Positive Tests
                </h6>
                <h3 className='lh-50 f-32 text-dark mb-0'>
                  {schedulePatients.totalPositiveTests}
                </h3>
              </div>
            </Col>
            <Col sm={12}>
              <div className='text-center mb-30 covid-summary-card'>
                <h6 className='f-14 font-weight-bold lh-25 mb-0'>
                  Total Negative Tests
                </h6>
                <h3 className='lh-50 f-32 text-dark mb-0'>
                  {schedulePatients.totalNegativeTests}
                </h3>
              </div>
            </Col>
            <Col sm={12}>
              <div className='text-center mb-30 covid-summary-card'>
                <h6 className='f-14 font-weight-bold lh-25 mb-0'>
                  Total Tests Denied
                </h6>
                <h3 className='lh-50 f-32 text-dark mb-0'>
                  {schedulePatients.totalTestsDenied}
                </h3>
              </div>
            </Col>
            <Col sm={12}>
              <div className='text-center mb-30 covid-summary-card'>
                <h6 className='f-14 font-weight-bold lh-25 mb-0'>
                  Total Absent Patients
                </h6>
                <h3 className='lh-50 f-32 text-dark mb-0'>
                  {schedulePatients.totalAbsentPatients}
                </h3>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  )
}

export default TestSummary
