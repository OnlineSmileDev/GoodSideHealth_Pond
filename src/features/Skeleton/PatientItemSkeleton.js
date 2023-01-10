import Skeleton from 'react-loading-skeleton'
import React from 'react'
import { Col, Card, Row } from 'react-bootstrap'

const PatientItemSkeleton = ({ column }) => (
  <>
    <Card className='shadow-sm border-0 mb-30'>
      <Card.Body className='p-20'>
        {Array(column)
          .fill()
          .map((each, index) => (
            <Row key={index}>
              <Col md={6}>
                <div className='my-2'>
                  <Skeleton height={40} />
                </div>
              </Col>
              <Col md={6}>
                <div className='my-2'>
                  <Skeleton height={40} />
                </div>
              </Col>
            </Row>
          ))}
      </Card.Body>
    </Card>
    <Card className='shadow-sm border-0 mb-30'>
      <Card.Body className='p-20'>
        {Array(column)
          .fill()
          .map((each, index) => (
            <Row key={index}>
              <Col md={6}>
                <div className='my-2'>
                  <Skeleton height={40} />
                </div>
              </Col>
              <Col md={6}>
                <div className='my-2'>
                  <Skeleton height={40} />
                </div>
              </Col>
            </Row>
          ))}
      </Card.Body>
    </Card>
  </>
)

export default PatientItemSkeleton
