import React from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'

const SessionSummary = ({ sessionSummary }) => {
  const {
    totalAbsentPatients,
    totalNegativeTests,
    totalPatientsInSession,
    totalPositiveTests,
    totalWaitingPatients,
  } = sessionSummary
  return (
    <Card className='border-0 shadow-sm'>
      <Card.Body className='px-20 pt-20 pb-0'>
        <h3 className='f-18 lh-40 mb-20 font-weight-bold text-center'>
          Session Summary
        </h3>
        <Row>
          <Col sm={12}>
            <div className='text-center mb-15 covid-summary-card'>
              <h6 className='f-14 font-weight-bold lh-25 mb-0'>
                Total Patients in Session
              </h6>
              <h3 className='lh-50 f-32 text-dark mb-0'>
                {totalPatientsInSession}
              </h3>
              <Button
                className='f-12 btn-auto lh-25 font-weight-bold text-decoration-none'
                variant='link'
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
                {totalPositiveTests}
              </h3>
            </div>
          </Col>
          <Col sm={12}>
            <div className='text-center mb-30 covid-summary-card'>
              <h6 className='f-14 font-weight-bold lh-25 mb-0'>
                Total Negative Tests
              </h6>
              <h3 className='lh-50 f-32 text-dark mb-0'>
                {totalNegativeTests}
              </h3>
            </div>
          </Col>
          <Col sm={12}>
            <div className='text-center mb-30 covid-summary-card'>
              <h6 className='f-14 font-weight-bold lh-25 mb-0'>
                Total Patients Waiting For Visit
              </h6>
              <h3 className='lh-50 f-32 text-dark mb-0'>
                {totalWaitingPatients}
              </h3>
            </div>
          </Col>
          <Col sm={12}>
            <div className='text-center mb-30 covid-summary-card'>
              <h6 className='f-14 font-weight-bold lh-25 mb-0'>
                Total Absent Patients
              </h6>
              <h3 className='lh-50 f-32 text-dark mb-0'>
                {totalAbsentPatients}
              </h3>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default SessionSummary
