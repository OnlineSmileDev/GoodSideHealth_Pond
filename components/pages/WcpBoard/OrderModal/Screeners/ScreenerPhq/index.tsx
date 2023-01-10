import React, { useRef, useState } from 'react'
import Banner from 'components/molecules/Banner'
import { Button, BUTTON_VARIANT } from 'components/atoms/Button'
import PHQForm from './PhqForm'
import { isFormValid } from './isValid'
import AssessmentDetail from 'components/atoms/AssessmentDetail'
import { getPhqScore, getPhqFlagged } from './utils'
import { getDateInDateTimeFormat } from 'utils/datePicker'

export type PhqFormValuesType = {
  PH2?: {
    PH8: {
      sleep?: number
      energy?: number
      self?: number
      appetite?: number
      concentration?: number
      slow?: number
      suicide?: number
      difficulty?: number
    }
    interest?: number
    depression?: number
  }
}

export type PhqFormProps = {
  phqFormValues: PhqFormValuesType
  completed_at?: string
  handleFormAction: (
    values: PhqFormValuesType,
    shouldBeFlagged: boolean
  ) => void
  schema: any
  uiSchema: any
  localization: any
  disabled?: boolean
  isUploading?: boolean
  isPreloading?: boolean
}

export const ScreenerPhqForm = ({
  phqFormValues = {},
  completed_at,
  handleFormAction,
  schema,
  uiSchema,
  localization,
  disabled,
  isUploading,
  isPreloading,
}: PhqFormProps) => {
  const formRef = useRef()
  const [formValues, setFormValues] = useState(phqFormValues)
  const phqScore = getPhqScore(phqFormValues)
  const shouldPhqBeFlagged = getPhqFlagged(phqFormValues)
  const handleSubmit = () => handleFormAction(formValues, shouldPhqBeFlagged)

  return (
    <div className='tw-px-5'>
      {disabled && (
        <div className='tw-flex tw-flex-wrap tw-mt-6 tw-mb-12'>
          <AssessmentDetail name='Visit Reason' value='WCP' />
          <AssessmentDetail name='PHQ Score' value={phqScore} />
          <AssessmentDetail
            name='Last Completed'
            value={getDateInDateTimeFormat(completed_at)}
          />
        </div>
      )}

      <h5 className='tw-text-base tw-font-hind tw-font-bold'>
        Over the last 2 weeks, how often have you been bothered by any of the
        following problems?
      </h5>

      <PHQForm
        ref={formRef}
        formData={formValues}
        setFormData={setFormValues}
        schema={schema}
        uiSchema={uiSchema}
        localization={localization}
        disabled={disabled}
      />

      <Banner
        title='Disclaimer'
        text='Developed by Drs. Robert L. Spitzer, Janet B.W. Williams, Kurt Kroenke and colleagues, with an educational grant from Pfizer inc. No permission required to reproduce, translate, display or distribute.'
      />

      <div className='tw-flex tw-justify-end tw-mt-7'>
        <Button
          variant={BUTTON_VARIANT.PRIMARY}
          size=''
          className='tw-w-92'
          disabled={!isFormValid(formValues) || isPreloading}
          isLoading={isUploading}
          onClick={handleSubmit}
        >
          {disabled ? 'Close' : 'Continue'}
        </Button>
      </div>
    </div>
  )
}
