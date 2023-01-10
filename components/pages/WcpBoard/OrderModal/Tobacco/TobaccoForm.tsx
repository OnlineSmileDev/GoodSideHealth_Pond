import React, { forwardRef } from 'react'
import Form from '@rjsf/core'
import merge from 'lodash.merge'
import {
  CustomRadioWidget,
  CustomFieldTemplate,
} from 'components/organisms/JSONFormSchema'
import defaultSchema from './schema.json'
import defaultUiSchema from './uiSchema.json'
import defaultSchemaLocalization from './localizationSchema.json'

type TobaccoFormProps = {
  formData: object
  setFormData: (object) => void
  schema: any
  uiSchema: any
  localization: any
}

// Due to useAuthQuery polling, we have to keep state or the form will rebuild from scratch
// the <div /> components prevents Form from rendering a submit button
const TobaccoForm = (
  { formData, setFormData },
  ref, //@ts-ignore
  schema = defaultSchema,
  uiSchema = defaultUiSchema,
  localization = defaultSchemaLocalization
) => {
  const localizedUiSchema = merge([], uiSchema, localization)

  return (
    <Form
      ref={ref}
      //@ts-ignore
      schema={schema[0]}
      uiSchema={localizedUiSchema[0]}
      widgets={{ RadioWidget: CustomRadioWidget }}
      FieldTemplate={CustomFieldTemplate}
      formData={formData}
      onChange={({ formData }) => setFormData(formData)}
      // onSubmit={(e) => console.log('submitted ', e)}
      onError={(e) => console.log('errors ', e)}
    >
      <div />
    </Form>
  )
}

export default forwardRef<HTMLFormElement, TobaccoFormProps>(TobaccoForm)
