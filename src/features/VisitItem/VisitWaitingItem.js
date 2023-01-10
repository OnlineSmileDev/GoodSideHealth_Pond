import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'

const VisitWaitingItem = ({ toggleAddOrEditTestModal }) => (
  <Row className='mb-20'>
    <Col sm={5}>
      <h3 className='lh-45 f-18 font-weight-bold mb-4 mb-sm-0'>
        Provider Orders
      </h3>
    </Col>
    <Col sm={7}>
      <Button className='btn-big'>Add Medication</Button>
      <Button
        className='btn-big ml-2'
        onClick={() => toggleAddOrEditTestModal(true)}
      >
        Add Test
      </Button>
    </Col>
  </Row>
)

export default VisitWaitingItem
