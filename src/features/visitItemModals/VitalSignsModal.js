import React, { useEffect } from 'react'
import { Formik } from 'formik'
import { Form } from 'react-bootstrap'
import { object as YupObject, number as YupNumber } from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import { useFeatures } from 'flagged'
import FormGroup from 'components/molecules/FormGroup'
import ModalFooter from 'components/molecules/ModalFooter'
import Banner from 'components/molecules/Banner'
import { Button, BUTTON_VARIANT } from 'components/atoms/Button'
import { PROVIDER_ORDER_TYPES, ORDER_ACTIONS } from 'constants/orders'
import { USER_ROLES } from 'constants/users'
import { isEmptyObject } from 'utils/isEmptyObject'
import { getAgeFromDateOfBirth } from 'utils/getAgeFromDateOfBirth'
import { getDaysSinceDate } from 'utils/getDaysSinceDate'
import Modal, { hideModal, showModal } from '../../widgets/modal'
import {
  selectVisitDetails,
  selectPatientVisitDetails,
  selectLastCompletedPhq,
} from '../VisitItem/visitItem.selectors'
import {
  updateVisit,
  fetchVisitDetails,
  addOrUpdateOrder,
  fetchPhqAssessmentDetails,
} from '../VisitItem/visitItem.asyncActions'
import { actions } from '../VisitItem/visitItem.slice'
import { useRouter } from 'next/router'
import { MAX_TEMPERATURE } from '../visitItemModals/visitItemModal.constants'
import IMAGES from '../../assets/images'
import { selectCurrentUserHasPermissions } from '../../infrastructure/userContext'
import {
  ASSESSMENTS,
  MIDDLE_PANEL_MODAL,
} from '../MiddlePanelModals/middlePanelModal.constants'

const {
  setSelectedVisitItemModal,
  setSelectedMiddlePanelModal,
  setSelectedOrder,
} = actions

// although the word eligibility is used, this is only to determine if a PHQ assessment is SUGGESTED
const MINIMUM_AGE_PHQ_ELIGIBITY = 11
const DAYS_SINCE_LAST_PHQ_ELIGIBILITY = 365
// TODO Pull programs out into an importable constant
const MENTAL_HEALTH_PROGRAM = 7

// TODO: Reimplement when time allows
const validationSchema = YupObject().shape({
  // bodyTemperature: YupNumber()
  // .required('Body Temperature is required')
  // .nullable(),
  weight: YupNumber()
    // .required('weight is required')
    .integer('You must specify an integer value')
    .nullable(),
  // pulseRate: Yup.number(),
  // .required('Pulse Rate is required'),
  // pulseOx: Yup.number(),
  // .required('Pulse Ox is required'),
  // respirationRate: Yup.number()
  // .required('Respiration Rate is required')
  // .integer('You must specify an integer value')
  // .nullable(),
  // systolicPressure: Yup.number()
  // .required('Systolic Pressure is required')
  // .integer('You must specify an integer value')
  // .nullable(),
  // diastolicPressure: Yup.number()
  // .required('Diastolic Pressure is required')
  // .integer('You must specify an integer value')
  // .nullable(),
})

const VitalSignsModal = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const visitDetails = useSelector(selectVisitDetails)
  const { programs } = useSelector(selectPatientVisitDetails)
  const lastCompletedPhq = useSelector(selectLastCompletedPhq)
  const resetModal = () => dispatch(setSelectedVisitItemModal(null))
  const currentUserHasPermissions = useSelector(selectCurrentUserHasPermissions)
  const isFacilitator = currentUserHasPermissions([USER_ROLES.NURSE])
  const { assessmentOrder } = useFeatures()
  const { id } = router.query

  const {
    bodyTemperature,
    weight,
    pulseRate,
    pulseOx,
    respirationRate,
    diastolicPressure,
    systolicPressure,
    dateOfBirth,
    assessments,
    patientId,
  } = visitDetails

  const assessment = assessments.find(
    ({ type }) => type === ASSESSMENTS.PHQ_ASSESSMENT
  )

  const vitalSigns = {
    bodyTemperature,
    weight,
    pulseRate,
    pulseOx,
    respirationRate,
    diastolicPressure,
    systolicPressure,
  }

  const initialValues = { ...vitalSigns }

  // misnomer. This can be true for other reasons, but this will be the vast majority of reasons
  const isFirstOpen = isEmptyObject(initialValues)

  const hasConsentToMentalHealth = programs?.find(
    ({ id, isActive }) => id === MENTAL_HEALTH_PROGRAM && isActive
  )
  const hasPastPhqBeenChecked = typeof lastCompletedPhq !== 'undefined'
  const hasOldOrNoPhq = hasPastPhqBeenChecked
    ? lastCompletedPhq?.completedAt
      ? getDaysSinceDate(lastCompletedPhq.completedAt) >
        DAYS_SINCE_LAST_PHQ_ELIGIBILITY
      : true
    : false

  const isOfEligibleAge =
    getAgeFromDateOfBirth(dateOfBirth) >= MINIMUM_AGE_PHQ_ELIGIBITY

  // PERMISSION:- Can Create orders && ! can delete order
  const showPhqBanner =
    hasConsentToMentalHealth &&
    assessmentOrder &&
    isOfEligibleAge &&
    hasOldOrNoPhq &&
    isFacilitator &&
    isFirstOpen

  useEffect(() => {
    dispatch(showModal())
    // prevent unnecessary call with feature flag
    if (assessmentOrder) dispatch(fetchPhqAssessmentDetails({ patientId }))
  }, [dispatch, patientId, assessmentOrder])

  useEffect(() => {
    if (showPhqBanner && !assessment) {
      dispatch(
        setSelectedOrder({ id: null, type: PROVIDER_ORDER_TYPES.ASSESSMENT })
      )
      dispatch(
        // @ts-ignore
        addOrUpdateOrder({
          updatedOrder: {
            visitId: Number(id),
            type: ASSESSMENTS.PHQ_ASSESSMENT,
            status: 'Incomplete',
          },
          type: PROVIDER_ORDER_TYPES.ASSESSMENT,
        })
      )
    }
  }, [assessments.length, showPhqBanner, assessment, id, dispatch])

  const handleClose = () => {
    dispatch(hideModal())
    resetModal()
  }

  const handlePhqBannerClick = () => {
    if (!assessment || assessment.status !== 'Incomplete') return null

    dispatch(
      setSelectedOrder({
        id: assessment.id,
        type: PROVIDER_ORDER_TYPES.ASSESSMENT,
        action: ORDER_ACTIONS.COMPLETE,
        assessmentResults: assessment.results,
        completedAt: assessment.completedAt,
      })
    )
    dispatch(setSelectedMiddlePanelModal(MIDDLE_PANEL_MODAL.PHQ_ASSESSMENT))
    resetModal()
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const removeNullProperties = (obj) => {
            for (const propName in obj) {
              if (obj[propName] === null || obj[propName] === undefined) {
                delete obj[propName]
              }
            }

            return obj
          }
          dispatch(
            updateVisit({
              visitId: id,
              updatedVisit: removeNullProperties(values),
            })
          ).then(() => {
            resetForm()
            setSubmitting(false)
            dispatch(fetchVisitDetails({ visitId: id }))
            resetModal()
          })
        }}
      >
        {({ touched, errors, handleSubmit, setFieldValue }) => {
          const footer = (
            <ModalFooter
              submitButtonProps={{
                onClick: handleSubmit,
              }}
              cancelButtonProps={{
                onClick: handleClose,
              }}
            />
          )

          return (
            <Modal
              title='Patient Vital Signs'
              footer={footer}
              reset={resetModal}
              size='sm'
            >
              <p className='f-14 mb-30'>
                Please record the patient current vital signs:
              </p>
              <div className='container-fluid '>
                <Form onSubmit={handleSubmit}>
                  <FormGroup
                    name='bodyTemperature'
                    label='Body Temperature'
                    type='number'
                    inputProps={{
                      suffix: ' °F',
                      isAllowed: ({ value }) => value < MAX_TEMPERATURE,
                      decimalScale: 1,
                      onValueChange: ({ value }) => {
                        setFieldValue('bodyTemperature', parseFloat(value))
                      },
                      className: classNames('form-control', {
                        error:
                          touched.bodyTemperature && errors.bodyTemperature,
                      }),
                    }}
                  />
                  <FormGroup
                    name='weight'
                    label='Weight'
                    type='number'
                    inputProps={{
                      customErrorMessage: 'Weight is required.',
                      suffix: ' LBS',
                      onValueChange: ({ value }) => {
                        setFieldValue('weight', parseInt(value))
                      },
                      className: classNames('form-control', {
                        error: touched.weight && errors.weight,
                      }),
                    }}
                  />
                  <FormGroup
                    name='pulseRate'
                    label='Pulse Rate'
                    type='number'
                    inputProps={{
                      id: 'pulseRate',
                      suffix: ' BPM',
                      onValueChange: ({ value }) => {
                        setFieldValue('pulseRate', parseInt(value))
                      },
                      className: classNames('form-control', {
                        error: touched.pulseRate && errors.pulseRate,
                      }),
                    }}
                  />
                  <FormGroup
                    name='pulseOx'
                    label='Pulse OX'
                    type='number'
                    inputProps={{
                      suffix: ' %',
                      onValueChange: ({ value }) => {
                        setFieldValue('pulseOx', parseInt(value))
                      },
                      className: classNames('form-control', {
                        error: touched.pulseOx && errors.pulseOx,
                      }),
                    }}
                  />
                  <FormGroup
                    name='respirationRate'
                    label='Respiration Rate'
                    type='number'
                    inputProps={{
                      suffix: ' BPM',
                      onValueChange: ({ value }) => {
                        setFieldValue('respirationRate', parseInt(value))
                      },
                      className: classNames('form-control', {
                        error:
                          touched.respirationRate && errors.respirationRate,
                      }),
                    }}
                  />
                  <FormGroup
                    name='systolicPressure'
                    label='Systolic Pressure'
                    type='number'
                    inputProps={{
                      onValueChange: ({ value }) => {
                        setFieldValue('systolicPressure', parseInt(value))
                      },
                      className: classNames('form-control', {
                        error:
                          touched.systolicPressure && errors.systolicPressure,
                      }),
                    }}
                  />
                  <FormGroup
                    name='diastolicPressure'
                    label='Diastolic Pressure'
                    type='number'
                    inputProps={{
                      onValueChange: ({ value }) => {
                        setFieldValue('diastolicPressure', parseInt(value))
                      },
                      className: classNames('form-control', {
                        error:
                          touched.diastolicPressure && errors.diastolicPressure,
                      }),
                    }}
                  />
                </Form>
                {showPhqBanner && (
                  <Banner
                    title='Please Complete a Patient Health Questionnaire'
                    image={IMAGES.checklist}
                    imageProps={{
                      alt: 'Goodside Health Duck',
                    }}
                  >
                    <p className='mb-0'>
                      Ask your patient to complete the form at the link below.
                    </p>
                    <Button
                      className='tw-mt-3'
                      variant={BUTTON_VARIANT.PRIMARY}
                      onClick={handlePhqBannerClick}
                    >
                      Start PHQ
                    </Button>
                  </Banner>
                )}
              </div>
            </Modal>
          )
        }}
      </Formik>
    </>
  )
}
export default VitalSignsModal
