import { Formik } from 'formik'
import { Button, BUTTON_VARIANT } from 'components/atoms/Button'
import { InputControl } from 'components/molecules/InputControl'
import { InputGroup } from 'components/molecules/InputGroup'
import { SHARE_METHOD } from 'constants/invitations'
import { validationSchema } from './validationSchema'

const { SUCCESS, LIGHT } = BUTTON_VARIANT
const { SMS, EMAIL } = SHARE_METHOD

type ShareRegFormValuesType = {
  recipientName: string
  shareMethod: SHARE_METHOD
  district: string
  phoneNumber: string
  emailAddress: string
}

type DistrictOptionType = {
  name: string
  value: string
}

export type ShareRegLinkProps = {
  formValues: ShareRegFormValuesType
  setFormValues: (value: ShareRegFormValuesType) => void
  reset: () => void
  districtOptions: Array<DistrictOptionType>
}

export const ShareRegistrationLink = ({
  formValues,
  setFormValues,
  reset,
  districtOptions,
}: ShareRegLinkProps) => {
  const { recipientName, shareMethod, district, phoneNumber, emailAddress } =
    formValues

  const initialValues = {
    recipientName: recipientName || '',
    shareMethod: shareMethod || SMS,
    district: district || '',
    phoneNumber: phoneNumber || '',
    emailAddress: emailAddress || '',
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={(values, { setSubmitting }) => {
          setFormValues({ ...formValues, ...values })
          setSubmitting(false)
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
          const selectedShareMethodLabel =
            values.shareMethod === SMS ? 'Phone Number' : 'Email Address'
          return (
            <>
              <div className='tw-px-5'>
                <p className='tw-text-sm tw-mb-5'>
                  You can share the patient registration link by email or text
                  message using the form below.
                </p>
                <form onSubmit={handleSubmit}>
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
                      {districtOptions.map(({ name, value }) => (
                        <option value={value} key={value}>
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
                      <option value={SMS}>Text Message</option>
                      <option value={EMAIL}>Email</option>
                    </InputControl>
                  </InputGroup>
                  <InputGroup
                    id='selectedMethod'
                    className='tw-grid md:tw-grid-cols-3 md:tw-gap-6'
                    label={selectedShareMethodLabel}
                  >
                    {values.shareMethod === SMS ? (
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
                  <div className='tw-mt-10 tw-flex tw-items-center'>
                    <Button
                      type='submit'
                      className='tw-mr-4'
                      size='lg'
                      variant={SUCCESS}
                      data-testid='submit-button'
                    >
                      Share Link
                    </Button>
                    <Button
                      className='tw-mr-4'
                      size='sm'
                      variant={LIGHT}
                      onClick={() => reset()}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            </>
          )
        }}
      </Formik>
    </>
  )
}
