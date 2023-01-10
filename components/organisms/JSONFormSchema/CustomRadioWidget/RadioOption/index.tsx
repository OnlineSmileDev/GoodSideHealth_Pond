import React from 'react'
import { Form, FormCheckProps } from 'react-bootstrap'

export interface RadioOptionProps extends FormCheckProps {
  onChange: (value: any) => void
}

const RadioOption = ({ onChange, ...props }: RadioOptionProps) => (
  <div className='tw-flex-1'>
    <Form.Check
      type='radio'
      onChange={({ target: { value } }) => onChange(value)}
      {...props}
    />
  </div>
)

export default RadioOption
