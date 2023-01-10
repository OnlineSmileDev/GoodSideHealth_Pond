import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { Card, Row, Col } from 'react-bootstrap'

type PatientListSkeletonProps = {
  columns: number
  canRequestVisit: boolean
}

export const PatientListSkeleton = ({
  columns,
  canRequestVisit,
}: PatientListSkeletonProps) => (
  <>
    <Col>
      <Skeleton width={'20%'} className='mb-10' />
    </Col>
    {Array(columns)
      //@ts-ignore
      .fill()
      .map((each, index) => (
        <Card
          key={index}
          className='border-left border-0 shadow-sm rounded-lg border-left mb-30'
        >
          <Card.Body className='p-20 pl-40'>
            <Row className='align-items-center'>
              <Col xl={3} lg={4} className='mb-4 mb-xl-0'>
                <Skeleton />
              </Col>
              <Col xl={3} lg={4} className='mb-4 mb-xl-0'>
                <Skeleton width='70%' />
              </Col>
              <Col xl={6} lg={4} className='mb-4 mb-xl-0'>
                <Row>
                  {canRequestVisit && (
                    <Col>
                      <Skeleton />
                    </Col>
                  )}
                  <Col>
                    <Skeleton />
                  </Col>
                  <Col>
                    <Skeleton width='50%' />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      ))}
  </>
)
