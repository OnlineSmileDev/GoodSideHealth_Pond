import React from 'react'
import { Col } from 'react-bootstrap'

export type AssessmentDetailProps = {
  name: string
  value: string | number
}

const AssessmentDetail = ({ name, value }: AssessmentDetailProps) => (
  <>
    <Col xs={3}>
      <span className='f-14 font-weight-bold'>{name}</span>
    </Col>
    <Col xs={3}>
      <span className='f-14'>{value}</span>
    </Col>
  </>
)

export default AssessmentDetail
