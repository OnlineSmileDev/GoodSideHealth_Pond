import React from 'react'
import { Form, Image, Button } from 'react-bootstrap'
import Icons from '../../assets/icons'

const MultiValueEditor = ({ multiValue, setMultiValue, title }) => {
  const addMultiValue = () => {
    const updatedMultiValues = multiValue ? [...multiValue, ''] : ['']
    setMultiValue(updatedMultiValues)
  }

  const handleMultiValueChange = (updatedValue, index) => {
    const updatedMultiValues = [
      ...multiValue.slice(0, index),
      updatedValue,
      ...multiValue.slice(index + 1),
    ]
    setMultiValue([...updatedMultiValues])
  }

  const isDisabled = multiValue && multiValue.some((each) => each === '')

  return (
    <>
      {multiValue &&
        multiValue.map((each, index) => (
          <Form.Group key={index}>
            <Form.Control
              type='text'
              name='multiValue'
              value={each}
              onChange={(e) => handleMultiValueChange(e.target.value, index)}
            />
          </Form.Group>
        ))}
      <Form.Group>
        <Button
          variant='primary'
          className='py-1 d-flex align-items-center'
          onClick={() => addMultiValue()}
          block
          disabled={isDisabled}
        >
          <Image src={Icons.addIcon} alt='' width='20' />
          <span className='ml-2 f-12'>Add {title}</span>
        </Button>
      </Form.Group>
    </>
  )
}

export default MultiValueEditor
