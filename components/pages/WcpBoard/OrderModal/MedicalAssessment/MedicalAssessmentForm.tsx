import { useEffect, useRef, useState } from 'react'
import { Image } from 'react-bootstrap'
import SignatureCanvas from 'react-signature-canvas'
import { Formik } from 'formik'
import classNames from 'classnames'
import {
  Notification,
  NOTIFICATION_VARIANT,
} from 'components/atoms/Notification'
import { Button, BUTTON_VARIANT } from 'components/atoms/Button'
import {
  DiagnosticInput,
  DIAGNOSIS_RESULTS,
} from 'components/molecules/DiagnosticInput'
import { InputGroup } from 'components/molecules/InputGroup'
import { Switch } from 'components/atoms/Switch'
import Icons from 'src/assets/icons'
import { validationSchema } from './validationSchema'
import { MedicalHistory } from 'components/organisms/MedicalHistory'

const { ABNORMAL } = DIAGNOSIS_RESULTS

export type MedicalAssessmentValuesType = {
  appearance?: string
  appearance_notes?: string | null
  eyes_ears_nose_throat?: string
  eyes_ears_nose_throat_notes?: string | null
  lymph_nodes?: string
  lymph_nodes_notes?: string | null
  heart_auscultation_supine_position?: string
  heart_auscultation_supine_position_notes?: string | null
  heart_auscultation_standing_position?: string
  heart_auscultation_standing_position_notes?: string | null
  heart_lower_pulses?: string
  heart_lower_pulses_notes?: string | null
  pulses?: string
  pulses_notes?: string | null
  lungs?: string
  lungs_notes?: string | null
  abdomen?: string
  abdomen_notes?: string | null
  skin?: string
  skin_notes?: string | null
  marfans_stigmata?: string
  marfans_stigmata_notes?: string | null
  is_pupils_equal?: boolean
  signature?: string
}

export type MedicalAssessmentFormType = {
  id: string
  title: string
  data?: any[]
  url?: string
  schema?: object[]
  ui_schema?: object[]
  localizations?: object[]
}

export type MedicalAssessmentFormProps = {
  patientId?: string
  forms?: MedicalAssessmentFormType[]
  medicalAssessmentValues: MedicalAssessmentValuesType
  // patientName: string | null
  handleFormSubmission: (values: any, shouldBeFlagged: boolean) => void
  isUploading?: boolean
  isPreloading?: boolean
}

const checkValues = (values: MedicalAssessmentValuesType) =>
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

const shouldFlagForm = (values: MedicalAssessmentValuesType) => {
  let shouldBeFlagged = false

  // is_pupils_equal is the only boolean value sent
  shouldBeFlagged = !values.is_pupils_equal

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

export const MedicalAssessmentForm = ({
  patientId,
  medicalAssessmentValues = {},
  handleFormSubmission,
  forms = [],
  isPreloading,
  isUploading,
}: MedicalAssessmentFormProps) => {
  const signatureRef = useRef<any>()
  const notificationRef = useRef<HTMLDivElement>()
  const [showNotificationAlert, setShowNotificationAlert] = useState(false)

  const { signature } = medicalAssessmentValues

  useEffect(() => {
    if (signature) signatureRef.current.fromDataURL(signature)
    if (showNotificationAlert)
      notificationRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
  }, [signature, showNotificationAlert])

  return (
    <div className='tw-p-5 tw-grid tw-grid-cols-2 tw-gap-5'>
      <div>
        {forms.length > 0 && (
          <>
            {forms.forEach((form) => (
              <MedicalHistory
                url={form.url}
                schema={form.schema}
                uiSchema={form.ui_schema}
                data={form.data}
                handleFormAction={handleFormSubmission}
                handleClose={() => {}}
                disabled={isUploading || isPreloading}
              />
            ))}
          </>
        )}
      </div>
      <div>
        {showNotificationAlert && (
          <Notification
            notificationRef={notificationRef}
            message='Signature is a required field'
            variant={NOTIFICATION_VARIANT.DANGER}
          />
        )}
        <Formik
          enableReinitialize={true}
          initialValues={medicalAssessmentValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            // NOTE: May be we will not need setValues props as we are planing to handle submission inside component.
            if (!values.signature) setShowNotificationAlert(true)
            else {
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
            errors,
            touched,
            handleBlur,
          }) => {
            const handleChange = (name, value) => setFieldValue(name, value)
            const handleSignature = () => {
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
                  id='appearance'
                  className='tw-item-center tw-mb-4'
                  label='Appearance'
                >
                  <div className='tw-col-span-2'>
                    <DiagnosticInput
                      name='appearance'
                      toggleValue={values.appearance}
                      notesValue={values.appearance_notes}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      errorMessage={
                        touched.appearance_notes && errors.appearance_notes
                      }
                    />
                  </div>
                </InputGroup>

                <InputGroup
                  id='eyes_ears_nose_throat'
                  className='tw-item-center tw-mb-4'
                  label='Eyes/Ears/Nose/Throat'
                >
                  <div className='tw-col-span-2'>
                    <DiagnosticInput
                      name='eyes_ears_nose_throat'
                      toggleValue={values.eyes_ears_nose_throat}
                      notesValue={values.eyes_ears_nose_throat_notes}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      errorMessage={
                        touched.eyes_ears_nose_throat_notes &&
                        errors.eyes_ears_nose_throat_notes
                      }
                    />
                  </div>
                </InputGroup>

                <InputGroup
                  id='lymph_nodes'
                  className='tw-item-center tw-mb-4'
                  label='Lymph Nodes'
                >
                  <div className='tw-col-span-2'>
                    <DiagnosticInput
                      name='lymph_nodes'
                      toggleValue={values.lymph_nodes}
                      notesValue={values.lymph_nodes_notes}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      errorMessage={
                        touched.lymph_nodes_notes && errors.lymph_nodes_notes
                      }
                    />
                  </div>
                </InputGroup>

                <InputGroup
                  id='heart_auscultation_supine_position'
                  className='tw-item-center tw-mb-4'
                  label='Heart-Auscultation of the heart the supine position'
                >
                  <div className='tw-col-span-2'>
                    <DiagnosticInput
                      name='heart_auscultation_supine_position'
                      toggleValue={values.heart_auscultation_supine_position}
                      notesValue={
                        values.heart_auscultation_supine_position_notes
                      }
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      errorMessage={
                        touched.heart_auscultation_supine_position_notes &&
                        errors.heart_auscultation_supine_position_notes
                      }
                    />
                  </div>
                </InputGroup>

                <InputGroup
                  id='heart_auscultation_standing_position'
                  className='tw-item-center tw-mb-4'
                  label='Heart-Auscultation of the heart the standing position'
                >
                  <div className='tw-col-span-2'>
                    <DiagnosticInput
                      name='heart_auscultation_standing_position'
                      toggleValue={values.heart_auscultation_standing_position}
                      notesValue={
                        values.heart_auscultation_standing_position_notes
                      }
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      errorMessage={
                        touched.heart_auscultation_standing_position_notes &&
                        errors.heart_auscultation_standing_position_notes
                      }
                    />
                  </div>
                </InputGroup>

                <InputGroup
                  id='heart_lower_pulses'
                  className='tw-item-center tw-mb-4'
                  label='Heart-Lower extremity pulses'
                >
                  <div className='tw-col-span-2'>
                    <DiagnosticInput
                      name='heart_lower_pulses'
                      toggleValue={values.heart_lower_pulses}
                      notesValue={values.heart_lower_pulses_notes}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      errorMessage={
                        touched.heart_lower_pulses_notes &&
                        errors.heart_lower_pulses_notes
                      }
                    />
                  </div>
                </InputGroup>

                <InputGroup
                  id='pulses'
                  className='tw-item-center tw-mb-4'
                  label='Pulses'
                >
                  <div className='tw-col-span-2'>
                    <DiagnosticInput
                      name='pulses'
                      toggleValue={values.pulses}
                      notesValue={values.pulses_notes}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      errorMessage={touched.pulses_notes && errors.pulses_notes}
                    />
                  </div>
                </InputGroup>

                <InputGroup
                  id='lungs'
                  className='tw-item-center tw-mb-4'
                  label='Lungs'
                >
                  <div className='tw-col-span-2'>
                    <DiagnosticInput
                      name='lungs'
                      toggleValue={values.lungs}
                      notesValue={values.lungs_notes}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      errorMessage={touched.lungs_notes && errors.lungs_notes}
                    />
                  </div>
                </InputGroup>

                <InputGroup
                  id='abdomen'
                  className='tw-item-center tw-mb-4'
                  label='Abdomen'
                >
                  <div className='tw-col-span-2'>
                    <DiagnosticInput
                      name='abdomen'
                      toggleValue={values.abdomen}
                      notesValue={values.abdomen_notes}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      errorMessage={
                        touched.abdomen_notes && errors.abdomen_notes
                      }
                    />
                  </div>
                </InputGroup>

                <InputGroup
                  id='skin'
                  className='tw-item-center tw-mb-4'
                  label='Skin'
                >
                  <div className='tw-col-span-2'>
                    <DiagnosticInput
                      name='skin'
                      toggleValue={values.skin}
                      notesValue={values.skin_notes}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      errorMessage={touched.skin_notes && errors.skin_notes}
                    />
                  </div>
                </InputGroup>

                <InputGroup
                  id='marfans_stigmata'
                  className='tw-item-center tw-mb-4'
                  label='Marfan’s stigmata (arachnodactyly, pectus excavatum, joint hypermobility, scoliosis)'
                >
                  <div className='tw-col-span-2'>
                    <DiagnosticInput
                      name='marfans_stigmata'
                      toggleValue={values.marfans_stigmata}
                      notesValue={values.marfans_stigmata_notes}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      errorMessage={
                        touched.marfans_stigmata_notes &&
                        errors.marfans_stigmata_notes
                      }
                    />
                  </div>
                </InputGroup>

                <InputGroup
                  id='pupils'
                  className='tw-item-center tw-mb-4'
                  label='Pupils'
                >
                  <Switch
                    name='is_pupils_equal'
                    className='tw-col-span-2'
                    onChange={(ev) =>
                      setFieldValue(
                        'is_pupils_equal',
                        ev.target.checked ? true : false
                      )
                    }
                    checked={values.is_pupils_equal}
                  >
                    {!values.is_pupils_equal ? 'Abnormal' : 'Normal'}
                  </Switch>
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
      </div>
    </div>
  )
}
