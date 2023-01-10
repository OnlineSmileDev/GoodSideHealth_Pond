import React, { useRef, useState } from 'react'
import {
  Button,
  BUTTON_VARIANT,
  BUTTON_OUTLINE_VARIANT,
} from 'components/atoms/Button'
import TobaccoForm from './TobaccoForm'

export type TobaccoFormValuesType = {
  tobaccoUser?: string
}

export type TobaccoFormProps = {
  tobaccoFormValues: TobaccoFormValuesType
  handleFormAction: (
    values: TobaccoFormValuesType,
    shouldBeFlagged: boolean
  ) => void
  handleClose: () => void
  schema: any
  uiSchema: any
  localization: any
  disabled?: boolean
  isUploading?: boolean
  isPreloading?: boolean
}

export const Tobacco = ({
  tobaccoFormValues = {},
  handleFormAction,
  handleClose,
  schema,
  uiSchema,
  localization,
  disabled,
  isUploading,
  isPreloading,
}: TobaccoFormProps) => {
  const formRef = useRef()
  const [formValues, setFormValues] = useState(tobaccoFormValues)
  const shouldTobaccoBeFlagged = formValues.tobaccoUser === 'Yes'
  const handleSubmit = () =>
    handleFormAction(formValues, shouldTobaccoBeFlagged)

  return (
    <div className='tw-text-sm tw-font-hind tw-font-bold'>
      <TobaccoForm
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
          disabled={!formValues.tobaccoUser || isPreloading}
          isLoading={isUploading}
          onClick={handleSubmit}
        >
          {disabled ? 'Close' : 'Complete'}
        </Button>
      </div>
    </div>
  )
}
