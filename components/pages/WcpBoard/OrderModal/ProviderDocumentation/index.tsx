import React, { useRef, useState } from 'react'
import {
  Button,
  BUTTON_VARIANT,
  BUTTON_OUTLINE_VARIANT,
} from 'components/atoms/Button'
import ProviderDocumentationForm from './ProviderDocumentationForm'

export type ProviderDocumentationFormValuesType = {
  bmi_screening?: any
  tobacco_screening?: any
  depression_screening?: any
}

export type ProviderDocumentationFormProps = {
  providerDocumentationFormValues: ProviderDocumentationFormValuesType
  handleFormAction: (values: ProviderDocumentationFormValuesType) => void
  handleClose: () => void
  schema: any
  uiSchema: any
  localization: any
  disabled?: boolean
  isUploading?: boolean
  isPreloading?: boolean
}

const isValid = (values: ProviderDocumentationFormValuesType) => {
  // ToDo: set up validation function
  return true
}

export const ProviderDocumentation = ({
  providerDocumentationFormValues = {},
  handleFormAction,
  handleClose,
  schema,
  uiSchema,
  localization,
  disabled,
  isUploading,
  isPreloading,
}: ProviderDocumentationFormProps) => {
  const formRef = useRef()
  const [formValues, setFormValues] = useState(providerDocumentationFormValues)
  const handleSubmit = () => handleFormAction(formValues)

  return (
    <div className='tw-text-sm tw-font-hind tw-font-bold'>
      <ProviderDocumentationForm
        ref={formRef}
        formData={formValues}
        setFormData={setFormValues}
        schema={schema}
        uiSchema={uiSchema}
        localization={localization}
      />
      <div className='tw-flex tw-justify-end tw-gap-4 tw-mt-7'>
        <Button
          variant={BUTTON_VARIANT.LIGHT}
          outline={BUTTON_OUTLINE_VARIANT.OUTLINE_DARK}
          size=''
          className='tw-w-31.25'
          onClick={handleClose}
        >
          Close
        </Button>
        <Button
          variant={BUTTON_VARIANT.SUCCESS}
          size=''
          className='tw-w-92'
          disabled={!isValid(providerDocumentationFormValues) || isPreloading}
          isLoading={isUploading}
          onClick={handleSubmit}
        >
          {disabled ? 'Close' : 'Complete'}
        </Button>
      </div>
    </div>
  )
}
