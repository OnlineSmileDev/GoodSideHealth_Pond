import React from 'react'
import { Col, Form, FormControlProps } from 'react-bootstrap'
import { useFormikContext } from 'formik'

export interface FormikInputProps extends FormControlProps {
  name: string
  customErrorMessage?: string
}

const FormikInput = ({
  name,
  customErrorMessage,
  ...props
}: FormikInputProps) => {
  const { values, touched, errors } = useFormikContext() || {}
  const errorMessage = customErrorMessage || (touched?.[name] && errors?.[name])

  return (
    <Col md={8}>
      <Form.Control name={name} value={values?.[name]} {...props} />
      {errorMessage && <div className='error-message'>{errorMessage}</div>}
    </Col>
  )
}

export default FormikInput
