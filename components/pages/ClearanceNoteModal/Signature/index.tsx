import { useEffect, useRef, useState } from 'react'
import { Image } from 'react-bootstrap'
import SignatureCanvas from 'react-signature-canvas'
import {
  object as YupObject,
  string as YupString,
  boolean as YupBoolean,
} from 'yup'
import { Field, Formik } from 'formik'
import classNames from 'classnames'
import { Button, BUTTON_VARIANT } from 'components/atoms/Button'
import { InputControl } from 'components/molecules/InputControl'
import { ErrorMessage } from 'components/atoms/ErrorMessage'
import Icons from 'src/assets/icons'
import { getFormattedTime } from 'utils/getFormattedTime'
import { formattedDateWithFullMonthAndYear } from 'utils/datePicker'

const ONE_MINUTE = 60000

export type SignatureProps = {
  currentStep: number
  setCurrentStep: (value: number) => void
  formValues: any
  setFormValues: (value: {}) => void
  handleSubmit: (values: any) => void
  resetWizard: () => void
  isLoading: boolean
}

type initialValuesType = {
  providerSignature: string | null
  isProviderCertain: string | null
  providerFirstName: string | null
  providerLastName: string | null
  providerCredentials: string | null
}

const signatureValidationSchema = YupObject().shape({
  providerFirstName: YupString().required('First Name is required'),
  providerLastName: YupString().required('Last Name is required'),
  providerSignature: YupString().required('Signature is required'),
  providerCredentials: YupString().required('Credentials is required'),
  isProviderCertain: YupBoolean()
    .required('Please acknowledge provided information is correct.')
    .oneOf([true], 'Please acknowledge provided information is correct.'),
})

export const Signature = ({
  currentStep,
  setCurrentStep,
  formValues,
  setFormValues,
  handleSubmit,
  resetWizard,
  isLoading,
}: SignatureProps) => {
  const [currentDate] = useState(formattedDateWithFullMonthAndYear(new Date()))
  const [currentTime, setCurrentTime] = useState(getFormattedTime(new Date()))
  const signatureRef = useRef<any>()
  const { providerSignature } = formValues
  const initialValues: initialValuesType = {
    ...formValues,
    providerSignature: formValues?.providerSignature || '',
    isProviderCertain: formValues?.isProviderCertain || '',
    providerFirstName: formValues?.providerFirstName || '',
    providerLastName: formValues?.providerLastName || '',
    providerCredentials: formValues?.providerCredentials || '',
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getFormattedTime(new Date()))
    }, ONE_MINUTE)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (providerSignature) {
      signatureRef.current.fromDataURL(providerSignature)
    }
  }, [providerSignature])

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={signatureValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        const finalValues = { ...formValues, ...values }
        setFormValues(finalValues)
        handleSubmit(finalValues)
        setSubmitting(false)
      }}
    >
      {({
        values,
        handleSubmit,
        errors,
        setFieldValue,
        touched,
        handleBlur,
      }) => {
        const handleSignature = () => {
          if (signatureRef) {
            const providerSignature = signatureRef.current
              .getCanvas()
              .toDataURL('image/png')
            setFieldValue('providerSignature', providerSignature)
          }
        }
        const resetSignature = () => {
          if (signatureRef) {
            signatureRef.current.clear()
            setFieldValue('providerSignature', '')
          }
        }
        return (
          <form onSubmit={handleSubmit}>
            <div className='tw-pl-5 tw-pb-5 tw-pr-5'>
              <div className='tw-bg-light tw-p-15 tw-text-sm tw-font-hind'>
                The following information must be filled in and signed by either
                a Physician, a Physician Assistant licensed by a State Board of
                Physician Assistant Examiners, a Registered Nurse recognized as
                an Advanced Practice Nurse by the Board of Nurse Examiners, or a
                Doctor of Chiropractic. Examination forms signed by any other
                health care practitioner, will not be accepted.
              </div>

              <div className='tw-flex tw-flex-col tw-gap-2.5 tw-mt-5'>
                <div className='tw-grid tw-grid-cols-12 tw-items-center'>
                  <div className='tw-col-span-2 tw-flex tw-self-start tw-text-sm tw-font-hind tw-font-bold'>
                    Draw Your Signature
                  </div>
                  <div className='tw-col-span-10 tw-text-sm tw-font-hind'>
                    {values.providerSignature && (
                      <Button
                        size='none'
                        className='tw-absolute tw-right-6 tw-max-h-4 tw-opacity-60 tw-z-10 tw-mt-1 hover:tw-opacity-100'
                        onClick={resetSignature}
                        variant={BUTTON_VARIANT.LIGHT}
                      >
                        <Image
                          src={Icons.closeIconBlack}
                          width='20'
                          alt='clearIcon'
                        />
                      </Button>
                    )}
                    <SignatureCanvas
                      penColor='black'
                      canvasProps={{
                        className: classNames(
                          'tw-bg-light tw-border tw-w-full tw-h-100',
                          {
                            'tw-border-danger-darker':
                              errors.providerSignature &&
                              touched.providerSignature,
                          }
                        ),
                        tabIndex: '0',
                        'aria-label': 'Draw your Signature',
                      }}
                      clearOnResize={false}
                      ref={signatureRef}
                      onEnd={handleSignature}
                    />
                    {touched.providerSignature && errors.providerSignature && (
                      <ErrorMessage errorMessage={errors.providerSignature} />
                    )}
                  </div>
                </div>
                <div className='tw-grid tw-grid-cols-12 tw-items-center'>
                  <div className='tw-col-span-2 tw-text-sm tw-font-hind tw-font-bold'>
                    First Name
                  </div>
                  <div className='tw-col-span-10 tw-text-sm tw-font-hind'>
                    <InputControl
                      name='providerFirstName'
                      placeholder='First Name'
                      value={values.providerFirstName}
                      onChange={(ev) =>
                        setFieldValue('providerFirstName', ev.target.value)
                      }
                      onBlur={handleBlur}
                      errorMessage={
                        touched.providerFirstName && errors.providerFirstName
                      }
                    />
                  </div>
                </div>
                <div className='tw-grid tw-grid-cols-12 tw-items-center'>
                  <div className='tw-col-span-2 tw-text-sm tw-font-hind tw-font-bold'>
                    Last Name
                  </div>
                  <div className='tw-col-span-10 tw-text-sm tw-font-hind'>
                    <InputControl
                      name='providerLastName'
                      placeholder='Last Name'
                      value={values.providerLastName}
                      onChange={(ev) =>
                        setFieldValue('providerLastName', ev.target.value)
                      }
                      onBlur={handleBlur}
                      errorMessage={
                        touched.providerLastName && errors.providerLastName
                      }
                    />
                  </div>
                </div>
                <div className='tw-grid tw-grid-cols-12 tw-items-center'>
                  <div className='tw-col-span-2 tw-text-sm tw-font-hind tw-font-bold'>
                    Credentials
                  </div>
                  <div className='tw-col-span-10 tw-text-sm tw-font-hind'>
                    <InputControl
                      name='providerCredentials'
                      placeholder='Credentials'
                      value={values.providerCredentials}
                      onChange={(ev) =>
                        setFieldValue('providerCredentials', ev.target.value)
                      }
                      onBlur={handleBlur}
                      errorMessage={
                        touched.providerCredentials &&
                        errors.providerCredentials
                      }
                    />
                  </div>
                </div>
                <div className='tw-grid tw-grid-cols-12 tw-items-center tw-h-10'>
                  <div className='tw-col-span-2 tw-text-sm tw-font-hind tw-font-bold'>
                    Date
                  </div>
                  <div className='tw-col-span-10 tw-text-sm tw-font-hind'>
                    {currentDate}
                  </div>
                </div>
                <div className='tw-grid tw-grid-cols-12 tw-items-center tw-h-10'>
                  <div className='tw-col-span-2 tw-text-sm tw-font-hind tw-font-bold'>
                    Time
                  </div>
                  <div className='tw-col-span-10 tw-text-sm tw-font-hind'>
                    {currentTime}
                  </div>
                </div>
              </div>

              <div className='custom-checkbox tw-mt-2.5'>
                <label>
                  <Field type='checkbox' name='isProviderCertain' />
                  <span className='tw-text-sm tw-font-hind tw-ml-2.5'>
                    I certify that the information I have provided is truthful
                    and accurate to the best of my knowledge
                  </span>
                </label>
                {touched.isProviderCertain && errors.isProviderCertain && (
                  <ErrorMessage errorMessage={errors.isProviderCertain} />
                )}
              </div>

              <div className='tw-flex tw-justify-end tw-mt-12.25 tw-mb-5 tw-gap-2.5'>
                <Button
                  variant={BUTTON_VARIANT.LIGHT}
                  className='tw-mx-1.5 tw-text-sm'
                  size='sm'
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  Back
                </Button>
                <Button
                  type='submit'
                  variant={BUTTON_VARIANT.SUCCESS}
                  className='tw-mx-1.5 tw-text-sm'
                  size='lg'
                  isLoading={isLoading}
                >
                  End Visit
                </Button>
              </div>
            </div>
          </form>
        )
      }}
    </Formik>
  )
}
