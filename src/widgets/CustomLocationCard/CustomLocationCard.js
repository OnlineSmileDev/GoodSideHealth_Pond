import React from 'react'
import { Col, Row, Card, Button } from 'react-bootstrap'

const CustomLocationCard = ({
  address: {
    streetNumber = '',
    streetName = '',
    municipality = '',
    countrySubdivision = '',
    postalCode = '',
  } = {},
  poi: { name = '' } = {},
  isSelected = false,
  handleLocationClick,
  id = '',
  position: { lat, lon } = {},
}) => (
  <Card className='custom-location-card my-2'>
    <Card.Body className='card-body'>
      <Row className='p-0'>
        <Col className='d-flex align-items-center p-0'>
          <h6>{name}</h6>
        </Col>
      </Row>
      <Row>
        <Button
          variant={isSelected ? 'success' : 'light'}
          onClick={() => {
            handleLocationClick({ id, lat, lon })
          }}
        >
          Selected
        </Button>
      </Row>
      <Row>
        <p className='f-10'>{`${streetNumber} ${streetName}`}</p>
      </Row>
      <Row>
        <p className='f-10'>{`${municipality}, ${countrySubdivision} ${postalCode}`}</p>
      </Row>
    </Card.Body>
  </Card>
)
export default CustomLocationCard
