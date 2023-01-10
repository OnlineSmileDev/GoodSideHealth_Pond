import { object as YupObject, string as YupString } from 'yup'

export const getInitialFormValues = (schema, data) => {
  let initialFormValues = {}
  Object.values(schema).map(({ properties }) =>
    Object.keys(properties).forEach((key) => {
      initialFormValues = {
        ...initialFormValues,
        [key]: data[key],
      }
    })
  )
  return initialFormValues
}

const emailRegex =
  /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i

const emailError = 'Email should match format username@domain.dom'

export const getValidationSchema = (schema) => {
  let validationSchema = {}
  Object.values(schema).map(({ required, properties }) =>
    Object.keys(properties).forEach((key) => {
      const { format } = properties[key]
      if (!!required && required.includes(key)) {
        validationSchema = {
          ...validationSchema,
          [key]: YupString().required(
            `${properties[key].title} is required field`
          ),
        }
      }
      if (format === 'email') {
        validationSchema = {
          ...validationSchema,
          [key]: validationSchema[key]
            ? validationSchema[key].email(emailError)
            : YupString().email(emailError).matches(emailRegex, emailError),
        }
      }
    })
  )
  return YupObject().shape(validationSchema)
}
