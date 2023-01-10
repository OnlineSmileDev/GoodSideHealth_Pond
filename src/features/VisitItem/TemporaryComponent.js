import React from 'react'
import { Card, Image } from 'react-bootstrap'
import Icons from '../../assets/icons'

const TemporaryComponent = () => {
  return (
    <>
      <Card>
        <Card.Body className='d-flex justify-content-center align-items-center flex-column pt-50'>
          <Image
            alt='Empty Order Icon'
            width='100'
            height='100'
            src={Icons.nullIcon}
            className='mb-20 mt-5'
          />
          <Card.Text className='f-18 font-weight-bold mb-5'>
            There Are Not Currently Any Orders
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}

export default TemporaryComponent
