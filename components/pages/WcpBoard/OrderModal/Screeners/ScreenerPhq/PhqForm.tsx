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
import CustomPHQResultsWidget from 'components/organisms/JSONFormSchema/CustomPHQResultsWidget'

// ToDo: Abstract and Merge whole file with webapp/src/features/MiddlePanelModals/PHQModal/PHQForm.tsx

type PHQFormProps = {
  formData: object
  setFormData: (object) => void
  schema: any
  uiSchema: any
  localization: any
  disabled?: boolean
}

// Due to useAuthQuery polling, we have to keep state or the form will rebuild from scratch
// the <div /> components prevents Form from rendering a submit button
const PHQForm = (
  {
    formData,
    setFormData,
    schema = defaultSchema,
    uiSchema = defaultUiSchema,
    localization = defaultSchemaLocalization,
    disabled = false,
  },
  ref //@ts-ignore
) => {
  const localizedUiSchema = merge([], uiSchema, localization)
  const RadioWidget = disabled ? CustomPHQResultsWidget : CustomRadioWidget

  return (
    <Form
      ref={ref}
      //@ts-ignore
      schema={schema[0]}
      uiSchema={localizedUiSchema[0]}
      widgets={{ RadioWidget }}
      FieldTemplate={CustomFieldTemplate}
      formData={formData}
      onChange={({ formData }) => setFormData(formData)}
      // onSubmit={(e) => console.log('submitted ', e)}
      onError={(e) => console.log('errors ', e)}
      disabled={disabled}
    >
      <div />
    </Form>
  )
}

export default forwardRef<HTMLFormElement, PHQFormProps>(PHQForm)
