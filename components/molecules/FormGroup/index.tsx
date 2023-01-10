import React from 'react'
import { Row, Form, Col } from 'react-bootstrap'
import FormikInput, {
  FormikInputProps,
} from 'components/atoms/FormInputs/FormikInput'
import FormikNumberInput, {
  FormikNumberInputProps,
} from 'components/atoms/FormInputs/FormikNumberInput'
import { Label } from 'components/atoms/Label'

export type FormGroupProps = {
  name: string
  label: string
} & (
  | {
      type?: string
      inputProps: FormikInputProps
    }
  | {
      type: 'number'
      inputProps: FormikNumberInputProps
    }
)

const FormGroup = ({ name, label, type, inputProps }: FormGroupProps) => (
  <Form.Group controlId={name}>
    <Row>
      <Col md={4}>
        <Label htmlFor={name}>{label}</Label>
      </Col>
      {type === 'number' ? (
        <FormikNumberInput
          name={name}
          {...(inputProps as FormikNumberInputProps)}
        />
      ) : (
        <FormikInput name={name} {...(inputProps as FormikInputProps)} />
      )}
    </Row>
  </Form.Group>
)

export default FormGroup
