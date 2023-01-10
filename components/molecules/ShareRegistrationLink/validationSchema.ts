import { object as YupObject, string as YupString } from 'yup'
import { SHARE_METHOD } from 'constants/invitations'

const { SMS, EMAIL } = SHARE_METHOD

export const validationSchema = YupObject().shape({
  recipientName: YupString().required('Recipient Name is required'),
  district: YupString().required('District is required'),
  phoneNumber: YupString().when('shareMethod', {
    is: SMS,
    then: YupString()
      .min(10, 'Phone number must have atleast 10 digits')
      .required('Phone Number is required'),
  }),
  emailAddress: YupString().when('shareMethod', {
    is: EMAIL,
    then: YupString()
      .email('Must be a valid email')
      .required('Email is required'),
  }),
})
