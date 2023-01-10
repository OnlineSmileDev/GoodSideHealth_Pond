import React, { useEffect } from 'react'
import { Formik } from 'formik'
import { Form } from 'react-bootstrap'
import { object as YupObject, string as YupString } from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import FormGroup from 'components/molecules/FormGroup'
import ModalFooter from 'components/molecules/ModalFooter'
import Modal, { hideModal, showModal } from '../../widgets/modal'
import { actions } from '../VisitItem/visitItem.slice'
import { withFeature } from 'flagged'
import { createVideoInvitation } from '../VisitItem/visitItem.asyncActions'
import { selectVisitDetails } from '../VisitItem/visitItem.selectors'

const { setSelectedVisitItemModal } = actions

const DEFAULT_SHARE_METHOD = 'text'
const getPhoneNumberInE164Format = (value) =>
  (value.length > 10 ? '+' : '+1') + value

const validationSchema = YupObject().shape({
  recipientName: YupString().required('Recipient Name is required'),
  phoneNumber: YupString().when('shareMethod', {
    is: DEFAULT_SHARE_METHOD,
    then: YupString()
      .min(10, 'Phone number must have atleast 10 digits')
      .required('Phone Number is required'),
  }),
  email: YupString().when('shareMethod', {
    is: DEFAULT_SHARE_METHOD,
    otherwise: YupString().required('Email is required'),
  }),
})

const initialValues = {
  recipientName: '',
  shareMethod: DEFAULT_SHARE_METHOD,
  phoneNumber: '',
  email: '',
}

const ShareVideoLinkModal = () => {
  const visitDetails = useSelector(selectVisitDetails)
  const dispatch = useDispatch()
  const resetModal = () => dispatch(setSelectedVisitItemModal(null))

  useEffect(() => {
    dispatch(showModal())
  }, [dispatch])

  const handleClose = () => {
    dispatch(hideModal())
    resetModal()
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={({ email, phoneNumber, recipientName }) => {
          const type = email.length > 0 ? 'email' : 'sms'

          const videoInvitation = {
            type,
            name: recipientName,
            videoCallId: visitDetails.videoCall.id,
            invitee:
              type === 'email'
                ? email
                : getPhoneNumberInE164Format(phoneNumber),
          }

          dispatch(createVideoInvitation({ videoInvitation })).then((res) =>
            handleClose()
          )
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          handleBlur,
          setFieldValue,
        }) => {
          const footer = (
            <ModalFooter
              cancelButtonProps={{
                onClick: handleClose,
              }}
              submitButtonProps={{
                onClick: handleSubmit,
                buttonText: 'Share Link',
              }}
            />
          )
          return (
            <Modal
              title='Share Video Link'
              footer={footer}
              reset={resetModal}
              size='sm'
            >
              <p className='f-14 mb-30'>
                You can share your authenticated video link by email or text
                message using the form below.
              </p>
              <Form onSubmit={handleSubmit} className='mb-30'>
                <FormGroup
                  label='Recipient Name'
                  name='recipientName'
                  inputProps={{
                    type: 'text',
                    placeholder: 'Recipient Name',
                    onChange: handleChange,
                    onBlur: handleBlur,
                  }}
                />
                <FormGroup
                  label='Select Method'
                  name='shareMethod'
                  inputProps={{
                    as: 'select',
                    name: 'shareMethod',
                    placeholder: 'Select Method',
                    onChange: handleChange,
                    onBlur: handleBlur,
                    children: (
                      <>
                        <option value='text'>Text Message</option>
                        <option value='email'>Email</option>
                      </>
                    ),
                  }}
                />
                {values.shareMethod === DEFAULT_SHARE_METHOD ? (
                  <FormGroup
                    label='Phone Number'
                    name='selectedMethod'
                    type='number'
                    inputProps={{
                      required: true,
                      type: 'text',
                      className: 'form-control',
                      name: 'phoneNumber',
                      maxLength: 12,
                      placeholder: 'Phone Number',
                      onValueChange: (e) =>
                        setFieldValue('phoneNumber', e.value),
                      onBlur: handleBlur,
                    }}
                  />
                ) : (
                  <FormGroup
                    label='Email Address'
                    name='selectedMethod'
                    inputProps={{
                      type: 'text',
                      placeholder: 'Email',
                      name: 'email',
                      onChange: handleChange,
                      onBlur: handleBlur,
                    }}
                  />
                )}
              </Form>
            </Modal>
          )
        }}
      </Formik>
    </>
  )
}
export default withFeature('shareVideoLink')(ShareVideoLinkModal)
