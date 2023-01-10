import Skeleton from 'react-loading-skeleton'
import React from 'react'
import { Col, Row, Card } from 'react-bootstrap'

const VisitsArchiveSkeleton = ({ columns, isMyVisit = false }) =>
  Array(columns)
    .fill()
    .map((each, index) => (
      <Col key={index} lg={12}>
        {isMyVisit && <Skeleton width={200} height={20} className='mb-20' />}
        <Card className='border-left border-0 shadow-sm rounded-lg border-left mb-30'>
          <Card.Body className='p-20 pl-40'>
            <Row>
              <Col xl={3} lg={6} className='mb-4 mb-xl-0'>
                <Skeleton />
                <Skeleton />
              </Col>
              <Col xl={3} lg={6} className='mb-4 mb-xl-0'>
                <Skeleton />
                <Skeleton />
              </Col>
              <Col xl={2} lg={6} className='mb-4 mb-xl-0'>
                <Skeleton />
                {isMyVisit && <Skeleton />}
              </Col>
              <Col xl={2} lg={12} className='mb-4 mb-xl-0'>
                <Skeleton height={25} />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    ))

export default VisitsArchiveSkeleton
