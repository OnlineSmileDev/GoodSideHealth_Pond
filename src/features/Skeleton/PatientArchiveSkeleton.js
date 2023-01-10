import Skeleton from 'react-loading-skeleton'
import React from 'react'
import { Col, Row, Card } from 'react-bootstrap'

const PatientArchiveSkeleton = ({ columns }) => (
  <>
    <Col>
      <Skeleton width={'20%'} className='mb-10' />
    </Col>
    {Array(columns)
      .fill()
      .map((each, index) => (
        <Card
          key={index}
          className='border-left border-0 shadow-sm rounded-lg border-left mb-30'
        >
          <Card.Body className='p-20 pl-40'>
            <Row className='align-items-center'>
              <Col xl={3} lg={6} className='mb-4 mb-xl-0'>
                <Skeleton />
                <Skeleton />
              </Col>
              <Col xl={3} lg={6} className='mb-4 mb-xl-0'>
                <Skeleton />
                <Skeleton />
              </Col>
              <Col xl={3} lg={6} className='mb-4 mb-xl-0'>
                <Skeleton />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
  </>
)

export default PatientArchiveSkeleton
