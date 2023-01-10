import { Image } from 'react-bootstrap'
import SignatureCanvas from 'react-signature-canvas'
import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { Formik } from 'formik'
import { Button, BUTTON_VARIANT } from 'components/atoms/Button'
import {
  Notification,
  NOTIFICATION_VARIANT,
} from 'components/atoms/Notification'
import {
  DiagnosticInput,
  DIAGNOSIS_RESULTS,
} from 'components/molecules/DiagnosticInput'
import { InputGroup } from 'components/molecules/InputGroup'
import Icons from 'src/assets/icons'
import { validationSchema } from './validationSchema'

const { ABNORMAL } = DIAGNOSIS_RESULTS

export type MusculoskeletalValuesType = {
  neck?: string
  neck_notes?: string | null
  back?: string
  back_notes?: string | null
  shoulder_or_arm?: string
  shoulder_or_arm_notes?: string | null
  elbow_or_forearm?: string
  elbow_or_forearm_notes?: string | null
  wrist_or_hand?: string
  wrist_or_hand_notes?: string | null
  hip_or_thigh?: string
  hip_or_thigh_notes?: string | null
  knee?: string
  knee_notes?: string | null
  leg_or_ankle?: string
  leg_or_ankle_notes?: string | null
  foot?: string
  foot_notes?: string | null
  signature?: string | null
}

export type MusculoskeletalFormProps = {
  musculoskeletalValues: MusculoskeletalValuesType
  handleFormSubmission: (values: any, shouldBeFlagged: boolean) => void
  isPreloading?: boolean
  isUploading?: boolean
}

const checkValues = (values: MusculoskeletalValuesType) =>
  Object.keys(values)
    .filter((key) => !/_notes$/.test(key))
    .reduce((acc, key) => {
      const notes_object_key = `${key}_notes`
      if (!Object.prototype.hasOwnProperty.call(acc, notes_object_key))
        return acc

      return {
        ...acc,
        [`${key}_notes`]:
          values[key] === ABNORMAL ? values[`${key}_notes`] : null,
      }
    }, values)

const shouldFlagForm = (values: MusculoskeletalValuesType) => {
  let shouldBeFlagged = false

  Object.keys(values)
    .filter((key) => !/_notes$/.test(key))
    .some((item) => {
      if (item === ABNORMAL) {
        shouldBeFlagged = true
        return true
      }
    })

  return shouldBeFlagged
}

export const MusculoskeletalForm = ({
  musculoskeletalValues = {},
  handleFormSubmission,
  isPreloading,
  isUploading,
}: MusculoskeletalFormProps) => {
  const signatureRef = useRef<any>()
  const notificationRef = useRef<HTMLDivElement>()
  const [showNotificationAlert, setShowNotificationAlert] = useState(false)

  const { signature } = musculoskeletalValues

  useEffect(() => {
    if (signature) signatureRef.current.fromDataURL(signature)
    if (showNotificationAlert)
      notificationRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
  }, [signature, showNotificationAlert])

  return (
    <>
      {showNotificationAlert && (
        <Notification
          notificationRef={notificationRef}
          message='Signature is a required field'
          variant={NOTIFICATION_VARIANT.DANGER}
        />
      )}
      <Formik
        enableReinitialize={true}
        initialValues={musculoskeletalValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          // NOTE: May be we will not need setValues props as we are planing to handle submission inside component.
          if (!values.signature) {
            setShowNotificationAlert(true)
          } else {
            const checkedValues = checkValues(values)
            const shouldBeFlagged = shouldFlagForm(values)
            handleFormSubmission(checkedValues, shouldBeFlagged)
            setSubmitting(false)
          }
        }}
      >
        {({
          values,
          handleSubmit,
          setFieldValue,
          touched,
          errors,
          handleBlur,
        }) => {
          const handleSignature = () => {
            console.log('handlesig :>> ', values)
            if (signatureRef) {
              const signature = signatureRef.current
                .getCanvas()
                .toDataURL('image/png')
              setFieldValue('signature', signature)
              setShowNotificationAlert(false)
            }
          }

          const resetSignature = () => {
            if (signatureRef) {
              signatureRef.current.clear()
              setFieldValue('signature', '')
            }
          }

          return (
            <form onSubmit={handleSubmit}>
              <InputGroup
                id='neck'
                className='tw-item-center tw-mb-4'
                label='Neck'
              >
                <div className='tw-col-span-2'>
                  <DiagnosticInput
                    name='neck'
                    toggleValue={values.neck}
                    notesValue={values.neck_notes}
                    handleChange={(name, value) => setFieldValue(name, value)}
                    handleBlur={handleBlur}
                    errorMessage={touched.neck_notes && errors.neck_notes}
                  />
                </div>
              </InputGroup>

              <InputGroup
                id='back'
                className='tw-item-center tw-mb-4'
                label='Back'
              >
                <div className='tw-col-span-2'>
                  <DiagnosticInput
                    name='back'
                    toggleValue={values.back}
                    notesValue={values.back_notes}
                    handleChange={(name, value) => setFieldValue(name, value)}
                    handleBlur={handleBlur}
                    errorMessage={touched.back_notes && errors.back_notes}
                  />
                </div>
              </InputGroup>

              <InputGroup
                id='shoulder_or_arm'
                className='tw-item-center tw-mb-4'
                label='Shoulder/Arm'
              >
                <div className='tw-col-span-2'>
                  <DiagnosticInput
                    name='shoulder_or_arm'
                    toggleValue={values.shoulder_or_arm}
                    notesValue={values.shoulder_or_arm_notes}
                    handleChange={(name, value) => setFieldValue(name, value)}
                    handleBlur={handleBlur}
                    errorMessage={
                      touched.shoulder_or_arm_notes &&
                      errors.shoulder_or_arm_notes
                    }
                  />
                </div>
              </InputGroup>

              <InputGroup
                id='elbow_or_forearm'
                className='tw-item-center tw-mb-4'
                label='Elbow/Forearm'
              >
                <div className='tw-col-span-2'>
                  <DiagnosticInput
                    name='elbow_or_forearm'
                    toggleValue={values.elbow_or_forearm}
                    notesValue={values.elbow_or_forearm_notes}
                    handleChange={(name, value) => setFieldValue(name, value)}
                    handleBlur={handleBlur}
                    errorMessage={
                      touched.elbow_or_forearm_notes &&
                      errors.elbow_or_forearm_notes
                    }
                  />
                </div>
              </InputGroup>

              <InputGroup
                id='wrist_or_hand'
                className='tw-item-center tw-mb-4'
                label='Wrist/Hand'
              >
                <div className='tw-col-span-2'>
                  <DiagnosticInput
                    name='wrist_or_hand'
                    toggleValue={values.wrist_or_hand}
                    notesValue={values.wrist_or_hand_notes}
                    handleChange={(name, value) => setFieldValue(name, value)}
                    handleBlur={handleBlur}
                    errorMessage={
                      touched.wrist_or_hand_notes && errors.wrist_or_hand_notes
                    }
                  />
                </div>
              </InputGroup>

              <InputGroup
                id='hip_or_thigh'
                className='tw-item-center tw-mb-4'
                label='Hip/Thigh'
              >
                <div className='tw-col-span-2'>
                  <DiagnosticInput
                    name='hip_or_thigh'
                    toggleValue={values.hip_or_thigh}
                    notesValue={values.hip_or_thigh_notes}
                    handleChange={(name, value) => setFieldValue(name, value)}
                    handleBlur={handleBlur}
                    errorMessage={
                      touched.hip_or_thigh_notes && errors.hip_or_thigh_notes
                    }
                  />
                </div>
              </InputGroup>

              <InputGroup
                id='knee'
                className='tw-item-center tw-mb-4'
                label='Knee'
              >
                <div className='tw-col-span-2'>
                  <DiagnosticInput
                    name='knee'
                    toggleValue={values.knee}
                    notesValue={values.knee_notes}
                    handleChange={(name, value) => setFieldValue(name, value)}
                    handleBlur={handleBlur}
                    errorMessage={touched.knee_notes && errors.knee_notes}
                  />
                </div>
              </InputGroup>

              <InputGroup
                id='leg_or_ankle'
                className='tw-item-center tw-mb-4'
                label='Leg/Ankle'
              >
                <div className='tw-col-span-2'>
                  <DiagnosticInput
                    name='leg_or_ankle'
                    toggleValue={values.leg_or_ankle}
                    notesValue={values.leg_or_ankle_notes}
                    handleChange={(name, value) => setFieldValue(name, value)}
                    handleBlur={handleBlur}
                    errorMessage={
                      touched.leg_or_ankle_notes && errors.leg_or_ankle_notes
                    }
                  />
                </div>
              </InputGroup>

              <InputGroup
                id='foot'
                className='tw-item-center tw-mb-4'
                label='Foot'
              >
                <div className='tw-col-span-2'>
                  <DiagnosticInput
                    name='foot'
                    toggleValue={values.foot}
                    notesValue={values.foot_notes}
                    handleChange={(name, value) => setFieldValue(name, value)}
                    handleBlur={handleBlur}
                    errorMessage={touched.foot_notes && errors.foot_notes}
                  />
                </div>
              </InputGroup>

              <InputGroup
                id='initials'
                className='tw-item-center tw-mb-4'
                label='Your Initials'
              >
                <div className='tw-col-span-2 tw-relative'>
                  {values.signature && (
                    <Button
                      size='none'
                      className='tw-absolute tw-right-0 tw-max-h-4 tw-opacity-60 tw-z-10 hover:tw-opacity-100'
                      variant={BUTTON_VARIANT.LIGHT}
                      onClick={resetSignature}
                    >
                      <Image
                        src={Icons.closeIconBlack}
                        className='tw-w-5'
                        alt='clearIcon'
                      />
                    </Button>
                  )}
                  <SignatureCanvas
                    penColor='black'
                    canvasProps={{
                      className: classNames(
                        'tw-bg-light tw-border-2 tw-w-full tw-h-24',
                        {
                          'tw-border-danger-darker': showNotificationAlert,
                        }
                      ),
                      tabIndex: '0',
                      'aria-label': 'Draw your Signature',
                    }}
                    clearOnResize={false}
                    ref={signatureRef}
                    onEnd={handleSignature}
                  />
                </div>
              </InputGroup>
              <div className='tw-flex tw-justify-end tw-w-full tw-mt-10 tw-mb-5'>
                <Button
                  type='submit'
                  variant={BUTTON_VARIANT.PRIMARY}
                  className='tw-mx-1.5 tw-text-sm tw-w-auto tw-flex-auto'
                  size='lg'
                  data-testid='submit-button'
                  disabled={showNotificationAlert || isPreloading}
                  isLoading={isUploading}
                >
                  Save
                </Button>
              </div>
            </form>
          )
        }}
      </Formik>
    </>
  )
}
