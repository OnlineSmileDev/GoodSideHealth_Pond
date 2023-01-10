import React, { useEffect } from 'react'
import { Formik } from 'formik'
import { Row, Col, Form } from 'react-bootstrap'
import { object as YupObject, string as YupString } from 'yup'
import FormGroup from 'components/molecules/FormGroup'
import ModalFooter from 'components/molecules/ModalFooter'
import { isEqual } from 'utils/isEqual'
import Modal, { hideModal, showModal } from '../../widgets/modal'
import { actions } from '../VisitItem/visitItem.slice'
import {
  selectVisitDetails,
  // selectVisitReasons,
} from '../VisitItem/visitItem.selectors'
import {
  updateVisit,
  // fetchVisitReasons,
} from '../VisitItem/visitItem.asyncActions'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'
import { INPUT_LIMIT } from '../../config'
// import { getFormattedDate } from '../../widgets/DatePicker/datePicker.utils'
// import MultiValueEditor from '../../widgets/MutiValueEditor'
// import { LANGUAGES } from '../RequestVisitModal/requestVisitModal.constants'

const { setSelectedVisitItemModal } = actions
const validationSchema = YupObject().shape({
  language: YupString().required('Primary Language is required'),
  visitReason: YupString().required('Reason for visit is required'),
})

const PatientDetailsModal = () => {
  const dispatch = useDispatch()
  const resetModal = () => dispatch(setSelectedVisitItemModal(null))
  useEffect(() => {
    dispatch(showModal())
    // dispatch(fetchVisitReasons())
  }, [dispatch])
  const handleClose = () => {
    dispatch(hideModal())
    resetModal()
  }
  // const visitReasons = useSelector(selectVisitReasons)
  const visitDetails = useSelector(selectVisitDetails)

  const {
    // patient,
    visitReason,
    language,
    allergies,
    medications,
    conditions,
    // notes,
    id,
  } = visitDetails
  // const { dateOfBirth } = patient

  const initialValues = {
    language: language,
    allergies: allergies || '',
    medications: medications || '',
    conditions: conditions || '',
    // notes: notes,
    visitReason: visitReason,
  }

  const isButtonDisabled = (values) =>
    isEqual(values.allergies, initialValues.allergies) &&
    isEqual(values.medications, initialValues.medications) &&
    isEqual(values.conditions, initialValues.conditions)

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          dispatch(
            updateVisit({
              visitId: id,
              updatedVisit: values,
            })
          ).then(() => handleClose())
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          handleBlur,
          // setFieldValue,
          // dirty,
        }) => {
          const footer = (
            <ModalFooter
              cancelButtonProps={{
                onClick: handleClose,
              }}
              submitButtonProps={{
                disabled: isButtonDisabled(values),
                onClick: handleSubmit,
              }}
            />
          )

          return (
            <Modal
              title='Patient Details'
              footer={footer}
              reset={resetModal}
              size='sm'
            >
              <div className='container-fluid '>
                <Form onSubmit={handleSubmit}>
                  {/* TODO: Uncomment when needed */}
                  {/* <Form.Group controlId='dateOfBirth'>
										<Row>
											<Col md={4}>
												<Form.Label className='f-12 font-weight-bold my-2'>
													Date of Birth
												</Form.Label>
											</Col>
											<Col md={8}>
												<Form.Control
													type='text'
													name='dateOfBirth'
													onChange={handleChange}
													value={getFormattedDate(dateOfBirth)}
													onBlur={handleBlur}
													disabled // TODO- disabled for now
												/>
											</Col>
										</Row>
									</Form.Group> */}
                  {/* TODO: Uncomment when needed */}

                  {/* <Form.Group controlId='language'>
										<Row>
											<Col md={4}>
												<Form.Label className='f-12 font-weight-bold my-2'>
													Primary Language
												</Form.Label>
											</Col>
											<Col md={8}>
												<Form.Control
													as='select'
													name='language'
													onChange={handleChange}
													value={values.language}
													onBlur={handleBlur}
													className={classNames({
														error: touched.language && errors.language,
													})}
												>
													{LANGUAGES.map((language) => (
														<option key={language.value} value={language.value}>
															{language.value}
														</option>
													))}
												</Form.Control>
												{touched.language && errors.language && (
													<div className='error-message'>{errors.language}</div>
												)}
											</Col>
										</Row>
									</Form.Group> */}
                  <FormGroup
                    label='Allergies'
                    name='allergies'
                    inputProps={{
                      as: 'textarea',
                      cols: '30',
                      rows: '5',
                      placeholder: 'Allergies',
                      onChange: handleChange,
                      onBlur: handleBlur,
                      maxLength: INPUT_LIMIT.DEFAULT,
                      className: classNames('mb-20', {
                        error: touched.allergies && errors.allergies,
                      }),
                    }}
                  />
                  <FormGroup
                    label='Known Medications'
                    name='medications'
                    inputProps={{
                      as: 'textarea',
                      cols: '30',
                      rows: '5',
                      placeholder: 'Medications',
                      onChange: handleChange,
                      onBlur: handleBlur,
                      maxLength: INPUT_LIMIT.DEFAULT,
                      className: classNames('mb-20', {
                        error: touched.medications && errors.medications,
                      }),
                    }}
                  />
                  <FormGroup
                    label='Known Conditions'
                    name='conditions'
                    inputProps={{
                      as: 'textarea',
                      cols: '30',
                      rows: '10',
                      placeholder: 'Conditions',
                      onChange: handleChange,
                      onBlur: handleBlur,
                      maxLength: INPUT_LIMIT.DEFAULT,
                      className: classNames('mb-20', {
                        error: touched.conditions && errors.conditions,
                      }),
                    }}
                  />
                  {/* TODO: Uncomment when needed */}
                  {/* <Form.Group controlId='visitReason'>
										<Row>
											<Col md={4}>
												<Form.Label className='f-12 font-weight-bold my-2'>
													Reason For Visit
												</Form.Label>
											</Col>
											<Col md={8}>
												<Form.Control
													as='select'
													name='visitReason'
													onChange={handleChange}
													value={values.visitReason}
													onBlur={handleBlur}
													className={classNames({
														error: touched.visitReason && errors.visitReason,
													})}
												>
													{visitReasons.map(({ reason }) => (
														<option key={reason} value={reason}>
															{reason}
														</option>
													))}
												</Form.Control>
												{touched.visitReason && errors.visitReason && (
													<div className='error-message'>
														{errors.visitReason}
													</div>
												)}
											</Col>
										</Row>
									</Form.Group> */}
                  {/* TODO: Uncomment when needed */}
                  {/* <Form.Group controlId='notes'>
										<Row>
											<Col md={4}>
												<Form.Label className='f-12 font-weight-bold my-2'>
													Additional Notes
												</Form.Label>
											</Col>
											<Col md={8}>
												<Form.Control
													as='textarea'
													placeholder='Additionals Notes'
													onChange={handleChange}
													rows='5'
												/>
											</Col>
										</Row>
									</Form.Group> */}
                  {/* TODO- need to comment out once added to the BE */}
                </Form>
              </div>
            </Modal>
          )
        }}
      </Formik>
    </>
  )
}

export default PatientDetailsModal
