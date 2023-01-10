import React, { useEffect } from 'react'
import { Formik } from 'formik'
import { withFeature } from 'flagged'
import Form from 'react-bootstrap/Form'
import { object as YupObject, string as YupString } from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'components/molecules/Modal'
import { Button, BUTTON_VARIANT } from 'components/atoms/Button'
import { InputControl } from 'components/molecules/InputControl'
import { InputGroup } from 'components/molecules/InputGroup'
import { actions } from '../Patients/patients.slice'
import { selectOrganizations } from '../ScreeningDataDashboard'
import { fetchOrganizations } from '../ScreeningDataDashboard/screeningDataDashboard.asyncActions'
import { sendRegistrationInvitation } from '../Patients/patients.asyncActions'
import { selectUserDetails } from '../Users/users.selectors'

const { setSelectedPatientModal } = actions

const DEFAULT_SHARE_METHOD = 'text'

// TODO :- We can move ShareRegistrationLinkModal as template to components/templates
const ShareRegistrationLinkModal = () => {
  const dispatch = useDispatch()
  const resetModal = () => dispatch(setSelectedPatientModal(null))
  const user = useSelector(selectUserDetails)
  const { organizationId } = user
  const organizations = useSelector(selectOrganizations)
  const userOrganization = organizations.find(
    (org) => org.id === organizationId
  )
  const { SUCCESS, LIGHT } = BUTTON_VARIANT

  const organizationOptions = userOrganization
    ? [userOrganization]
    : organizations

  useEffect(() => {
    dispatch(fetchOrganizations())
  }, [dispatch])

  const handleClose = () => {
    resetModal()
  }

  const getPhoneNumberInE164Format = (value) =>
    (value.length > 10 ? '+' : '+1') + value

  const validationSchema = YupObject().shape({
    recipientName: YupString().required('Recipient Name is required'),
    district: YupString().required('District is required'),
    phoneNumber: YupString().when('shareMethod', {
      is: DEFAULT_SHARE_METHOD,
      then: YupString()
        .min(10, 'Phone number must have atleast 10 digits')
        .required('Phone Number is required'),
    }),
    emailAddress: YupString().when('shareMethod', {
      is: DEFAULT_SHARE_METHOD,
      otherwise: YupString().required('Email is required'),
    }),
  })
  const initialValues = {
    recipientName: '',
    shareMethod: DEFAULT_SHARE_METHOD,
    district: userOrganization?.slug ?? '',
    phoneNumber: '',
    emailAddress: '',
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={({
          emailAddress,
          phoneNumber,
          shareMethod,
          recipientName,
          district,
        }) => {
          const type = emailAddress.length > 0 ? 'email' : 'sms'
          const invitation = {
            type,
            name: recipientName,
            district,
            invitee:
              shareMethod === DEFAULT_SHARE_METHOD
                ? getPhoneNumberInE164Format(phoneNumber)
                : emailAddress,
          }

          dispatch(sendRegistrationInvitation({ invitation })).then((res) =>
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
          const selectedMethodLabel =
            values.shareMethod === DEFAULT_SHARE_METHOD
              ? 'Phone Number'
              : 'Email Address'
          const footer = (
            <>
              <Button
                type='submit'
                className='tw-mr-4'
                size='lg'
                variant={SUCCESS}
                onClick={handleSubmit}
              >
                Share Link
              </Button>
              <Button
                className='tw-mr-4'
                size='sm'
                variant={LIGHT}
                onClick={handleClose}
              >
                Cancel
              </Button>
            </>
          )
          return (
            <Modal
              title='Share Registration Link'
              footer={footer}
              reset={resetModal}
              size='sm'
            >
              <p className='f-14 mb-30'>
                You can share the patient registration link by email or text
                message using the form below.
              </p>
              <Form onSubmit={handleSubmit} className='mb-30'>
                <InputGroup
                  id='recipientName'
                  className='tw-grid md:tw-grid-cols-3 md:tw-gap-6'
                  label='Recipient Name'
                >
                  <InputControl
                    type='text'
                    name='recipientName'
                    placeholder='Recipient Name'
                    className='tw-col-span-2'
                    value={values.recipientName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorMessage={
                      touched.recipientName ? errors.recipientName : ''
                    }
                  />
                </InputGroup>

                <InputGroup
                  id='district'
                  className='tw-grid md:tw-grid-cols-3 md:tw-gap-6'
                  label='District'
                >
                  <InputControl
                    as='select'
                    name='district'
                    className='tw-col-span-2'
                    value={values.district}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    errorMessage={touched.district ? errors.district : ''}
                  >
                    <option value='' hidden>
                      Select
                    </option>
                    {organizationOptions.map(({ name, slug }) => (
                      <option value={slug} key={slug}>
                        {name}
                      </option>
                    ))}
                  </InputControl>
                </InputGroup>

                <InputGroup
                  id='shareMethod'
                  className='tw-grid md:tw-grid-cols-3 md:tw-gap-6'
                  label='Share Method'
                >
                  <InputControl
                    as='select'
                    name='shareMethod'
                    className='tw-col-span-2'
                    value={values.shareMethod}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value='text'>Text Message</option>
                    <option value='email'>Email</option>
                  </InputControl>
                </InputGroup>
                <InputGroup
                  id='selectedMethod'
                  className='tw-grid md:tw-grid-cols-3 md:tw-gap-6'
                  label={selectedMethodLabel}
                >
                  {values.shareMethod === DEFAULT_SHARE_METHOD ? (
                    <InputControl
                      as='number'
                      type='text'
                      name='phoneNumber'
                      placeholder='Phone Number'
                      className='tw-col-span-2'
                      value={values.phoneNumber}
                      maxLength={12}
                      allowNegative={false}
                      onValueChange={(e) =>
                        setFieldValue('phoneNumber', e.value)
                      }
                      onBlur={handleBlur}
                      errorMessage={
                        touched.phoneNumber ? errors.phoneNumber : ''
                      }
                      required
                    />
                  ) : (
                    <InputControl
                      type='text'
                      name='emailAddress'
                      placeholder='Email'
                      className='tw-col-span-2'
                      value={values.emailAddress}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      errorMessage={
                        touched.emailAddress ? errors.emailAddress : ''
                      }
                    />
                  )}
                </InputGroup>
              </Form>
            </Modal>
          )
        }}
      </Formik>
    </>
  )
}
export default withFeature('shareRegistrationLink')(ShareRegistrationLinkModal)
