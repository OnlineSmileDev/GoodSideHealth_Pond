import React from 'react'
import { Col } from 'react-bootstrap'
import NumberFormat, { NumberFormatProps } from 'react-number-format'
import { useFormikContext } from 'formik'

export interface FormikNumberInputProps extends NumberFormatProps {
  name: string
  customErrorMessage?: string
}

const FormikNumberInput = ({
  name,
  customErrorMessage,
  ...props
}: FormikNumberInputProps) => {
  const { values, touched, errors } = useFormikContext()

  return (
    <Col md={8}>
      <NumberFormat
        name={name}
        value={values[name]}
        allowNegative={false}
        {...props}
      />
      {touched[name] && errors[name] && (
        <div className='error-message'>
          {customErrorMessage || errors[name]}
        </div>
      )}
    </Col>
  )
}

export default FormikNumberInput
