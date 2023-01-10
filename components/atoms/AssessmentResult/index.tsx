import React from 'react'
import { Row, Col } from 'react-bootstrap'

export type AssessmentResultProps = {
  question: string
  answer: string | number
  bgColorClass?: string
}

const AssessmentResult = ({
  question,
  answer,
  bgColorClass,
}: AssessmentResultProps) => {
  const additionalClasses = bgColorClass ? `text-white ${bgColorClass}` : ''

  return (
    <Row className='pb-3'>
      <Col>
        <span className='f-14'>{question}</span>
      </Col>
      <Col xs={4}>
        <p className={`f-14 text-center rounded py-1 ${additionalClasses}`}>
          {answer}
        </p>
      </Col>
    </Row>
  )
}

export default AssessmentResult
