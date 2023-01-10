import { Formik } from 'formik'
import { object as YupObject, string as YupString } from 'yup'
import classNames from 'classnames'
import { Button, BUTTON_VARIANT } from 'components/atoms/Button'
import { Switch } from 'components/atoms/Switch'
import { InputControl } from 'components/molecules/InputControl'
import { ErrorMessage } from 'components/atoms/ErrorMessage'
import {
  Notification,
  NOTIFICATION_VARIANT,
} from 'components/atoms/Notification'
import { CLEARANCE_STATUS } from 'constants/kanbanBoard'

type NotificationType = {
  variant: NOTIFICATION_VARIANT
  message: string
}

export type ClearanceProps = {
  currentStep: number
  setCurrentStep: (value: number) => void
  formValues: any
  setFormValues: (value: {}) => void
  resetWizard: () => void
  notifications?: Array<NotificationType>
}

type InitialValuesType = {
  selectedClearance: string | null
  preClearanceEvaluation: string | null
  notClearedDetails: string | null
}

const clearanceValidationSchema = YupObject().shape({
  selectedClearance: YupString().required('Clearance Status is required'),
  preClearanceEvaluation: YupString().when('selectedClearance', {
    is: CLEARANCE_STATUS.CLEARED_AFTER_EVAL,
    then: YupString().required('Clearance Evaluation is required'),
  }),
  notClearedDetails: YupString().when('selectedClearance', {
    is: CLEARANCE_STATUS.NOT_CLEARED,
    then: YupString().required('Not Cleared reason is required'),
  }),
})

const getInitialFormValues = (formValues): InitialValuesType => ({
  ...formValues,
  selectedClearance: formValues?.selectedClearance || '',
  preClearanceEvaluation: formValues?.preClearanceEvaluation || '',
  notClearedDetails: formValues?.notClearedDetails || '',
})

export const Clearance = ({
  currentStep,
  setCurrentStep,
  formValues,
  setFormValues,
  resetWizard,
  notifications = [],
}: ClearanceProps) => (
  <Formik
    enableReinitialize={true}
    initialValues={getInitialFormValues(formValues)}
    validationSchema={clearanceValidationSchema}
    onSubmit={(values, { setSubmitting }) => {
      setFormValues({ ...formValues, ...values })
      setCurrentStep(currentStep + 1)
      setSubmitting(false)
    }}
  >
    {({ values, handleSubmit, setFieldValue, errors, handleBlur, touched }) => {
      // Todo : Need to Remove when we handle use Cases
      const handleChange = (name, value) => setFieldValue(name, value)
      return (
        <form onSubmit={handleSubmit}>
          <div className='tw-pl-5 tw-pb-5 tw-pr-5'>
            {notifications?.map(({ variant, message }, index) => (
              <Notification
                key={`${index}-${variant}`}
                message={message}
                variant={variant}
              />
            ))}
            <div
              className={classNames('tw-bg-light tw-p-3.5 tw-mt-2', {
                'tw-border tw-border-danger-darker':
                  errors.selectedClearance && touched.selectedClearance,
              })}
            >
              <div className='tw-font-hind tw-text-sm tw-px-3.5 tw-pb-7.5'>
                Please choose the appropriate clearance selection from the
                toggles below:
              </div>

              <div className='tw-grid tw-grid-cols-12 tw-items-center'>
                <div className='tw-col-span-2'>
                  <Switch
                    checked={
                      values.selectedClearance === CLEARANCE_STATUS.CLEARED
                    }
                    onChange={(ev) =>
                      handleChange('selectedClearance', ev.target.name)
                    }
                    name={CLEARANCE_STATUS.CLEARED}
                  />
                </div>
                <div className='tw-col-span-10 tw-text-sm tw-font-hind'>
                  Cleared
                </div>
              </div>
              <div className='tw-grid tw-grid-cols-12 tw-items-center'>
                <div className='tw-col-span-2 tw-flex tw-self-start'>
                  <Switch
                    checked={
                      values.selectedClearance ===
                      CLEARANCE_STATUS.CLEARED_AFTER_EVAL
                    }
                    onChange={(ev) =>
                      handleChange('selectedClearance', ev.target.name)
                    }
                    name={CLEARANCE_STATUS.CLEARED_AFTER_EVAL}
                  />
                </div>
                <div className='tw-col-span-10 tw-text-sm tw-font-hind'>
                  <div className='tw-py-2'>
                    Cleared after completing evaluation/rehabilitation for:
                  </div>
                  <InputControl
                    as='textarea'
                    name='preClearanceEvaluation'
                    rows={4}
                    placeholder='Your Instructions...'
                    maxLength={2000}
                    onChange={(ev) =>
                      handleChange('preClearanceEvaluation', ev.target.value)
                    }
                    value={values.preClearanceEvaluation}
                    disabled={
                      values.selectedClearance !==
                      CLEARANCE_STATUS.CLEARED_AFTER_EVAL
                    }
                    onBlur={handleBlur}
                    errorMessage={
                      touched.preClearanceEvaluation &&
                      errors.preClearanceEvaluation
                    }
                  />
                </div>
              </div>
              <div className='tw-grid tw-grid-cols-12 tw-items-center'>
                <div className='tw-col-span-2 tw-flex tw-self-start'>
                  <Switch
                    checked={
                      values.selectedClearance === CLEARANCE_STATUS.NOT_CLEARED
                    }
                    onChange={(ev) =>
                      handleChange('selectedClearance', ev.target.name)
                    }
                    name={CLEARANCE_STATUS.NOT_CLEARED}
                  />
                </div>
                <div className='tw-col-span-10 tw-text-sm tw-font-hind'>
                  <div className='tw-py-2'>Not cleared for:</div>
                  <InputControl
                    as='textarea'
                    name='notClearedDetails'
                    rows={4}
                    placeholder='Your Instructions...'
                    maxLength={2000}
                    value={values.notClearedDetails}
                    onChange={(ev) =>
                      handleChange('notClearedDetails', ev.target.value)
                    }
                    disabled={
                      values.selectedClearance !== CLEARANCE_STATUS.NOT_CLEARED
                    }
                    onBlur={handleBlur}
                    errorMessage={
                      touched.notClearedDetails && errors.notClearedDetails
                    }
                  />
                  <div className='tw-py-2'>Reason:</div>
                  <InputControl
                    as='textarea'
                    name='notClearedReason'
                    rows={4}
                    placeholder='Your Instructions...'
                    maxLength={2000}
                    onChange={(ev) =>
                      handleChange('notClearedReason', ev.target.value)
                    }
                    onBlur={handleBlur}
                    disabled={
                      values.selectedClearance !== CLEARANCE_STATUS.NOT_CLEARED
                    }
                  />
                </div>
              </div>
            </div>
            {touched.selectedClearance && errors.selectedClearance && (
              <ErrorMessage errorMessage={errors.selectedClearance} />
            )}

            <div className='tw-py-2 tw-text-sm tw-font-hind tw-mt-5'>
              Recommendations
            </div>
            <InputControl
              as='textarea'
              name='recommendation'
              rows={4}
              placeholder='Your Instructions'
              onChange={(ev) => handleChange('recommendation', ev.target.value)}
            />

            <div className='tw-flex tw-justify-end tw-mt-12.25 tw-mb-5 tw-gap-2.5'>
              <Button
                variant={BUTTON_VARIANT.LIGHT}
                className='tw-mx-1.5 tw-text-sm'
                size='sm'
                onClick={() => resetWizard()}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                variant={BUTTON_VARIANT.PRIMARY}
                className='tw-mx-1.5 tw-text-sm'
                size='lg'
              >
                Next
              </Button>
            </div>
          </div>
        </form>
      )
    }}
  </Formik>
)
