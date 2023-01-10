import React, { forwardRef } from 'react'
import Form from '@rjsf/core'
import { CustomRadioWidget } from 'components/organisms/JSONFormSchema'
import { schema, uiSchema } from './PHQJsonSchema'

type PHQFormProps = {
  formData: object
  setFormData: (object) => void
}

// Due to useAuthQuery polling, we have to keep state or the form will rebuild from scratch
// the <div /> components prevents Form from rendering a submit button
const PHQForm = (
  { formData, setFormData },
  ref //@ts-ignore
) => (
  <Form
    ref={ref}
    //@ts-ignore
    schema={schema}
    uiSchema={uiSchema}
    widgets={{ RadioWidget: CustomRadioWidget }}
    formData={formData}
    onChange={({ formData }) => setFormData(formData)}
    // onSubmit={(e) => console.log('submitted ', e)}
    onError={(e) => console.log('errors ', e)}
  >
    <div />
  </Form>
)

export default forwardRef<HTMLFormElement, PHQFormProps>(PHQForm)
