import Skeleton from 'react-loading-skeleton'
import React from 'react'
import { Col, Card, Row } from 'react-bootstrap'

const PatientVisitActivitySkeleton = ({ column }) =>
  Array(column)
    .fill()
    .map((each, index) => (
      <Card
        className='visit-card border-0 shadow-sm rounded-lg mb-20'
        key={index}
      >
        <Card.Body className='p-20 pl-40'>
          <Row className='align-items-center'>
            <Col xl={2} md={3} className='mb-4 mb-lg-0'>
              <Skeleton height={28} />
              <Skeleton />
            </Col>
            <Col xl={6} md={6} className='mb-4 mb-lg-0'>
              <Skeleton height={28} width={'45%'} />
              <Skeleton width={'60%'} />
            </Col>

            <Col xl={2} lg={3} className='ml-auto'>
              <Skeleton height={35} />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    ))

export default PatientVisitActivitySkeleton
