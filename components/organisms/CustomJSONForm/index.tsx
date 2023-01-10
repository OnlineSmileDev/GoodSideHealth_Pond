import React, { useEffect } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { useFormikContext } from 'formik'
import { InputGroup } from 'components/molecules/InputGroup'
import { InputControl } from 'components/molecules/InputControl'

type SchemaObject = {
  properties: Object
  required: Array<string>
  title: string
}

const CustomJSONForm = ({
  schema,
  readOnly: isFormReadyOnly,
  setNotification,
  errorNotification,
}) => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldError,
  } = useFormikContext()

  const isInValid = Object.keys(errors).some((key) => touched[key])

  useEffect(() => {
    if (setNotification) {
      setNotification({
        isError: true,
        text: errorNotification,
        show: isInValid,
      })
    }
  }, [isInValid, setNotification, errorNotification])

  return Object.entries(schema).map(([item, each]) => {
    const { properties, required, title } = each as SchemaObject

    return (
      <div key={title}>
        <Col md={4} className='mb-20 pl-0'>
          <h4 className='hind font-weight-bold f-18 mb-0'>{title}</h4>
        </Col>

        <Card key={item} className='shadow-sm border-0 mb-30'>
          <Card.Body className='p-20'>
            <Row>
              {Object.entries(properties).map(([key, value]) => {
                const {
                  title = '',
                  widget: fieldWidget,
                  type,
                  placeholder,
                  readOnly: isFieldReadOnly,
                  disabled,
                  options,
                  format,
                } = value

                const isReadOnly = isFormReadyOnly || isFieldReadOnly
                const asWidget = isReadOnly ? 'readOnly' : fieldWidget
                const isRequired = required && required.includes(key)
                const label = `${title}${isRequired ? '*' : ''}`

                const { title: selectedValue } =
                  options?.find((option) => option.value === value) || {}

                const readOnlyValue = selectedValue || values[key] || ''

                return (
                  <Col key={key} md={6}>
                    <InputGroup label={label}>
                      <InputControl
                        as={asWidget}
                        rows={6}
                        type={type}
                        name={key}
                        format={format}
                        value={isReadOnly ? readOnlyValue : values[key] || ''}
                        disabled={disabled}
                        placeholder={placeholder}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        setFieldError={setFieldError}
                        setFieldValue={setFieldValue}
                        errorMessage={touched[key] && errors[key]}
                      >
                        {asWidget === 'select' ? (
                          <>
                            <option value=''>Select</option>
                            {options?.map((option) =>
                              typeof option === 'object' ? (
                                <option
                                  key={`${key}_${option.value}`}
                                  value={option.value}
                                  hidden={option.hidden}
                                >
                                  {option.title}
                                </option>
                              ) : (
                                <option key={`${key}_${option}`} value={option}>
                                  {option}
                                </option>
                              )
                            )}
                          </>
                        ) : null}
                      </InputControl>
                    </InputGroup>
                  </Col>
                )
              })}
            </Row>
          </Card.Body>
        </Card>
      </div>
    )
  })
}

export default CustomJSONForm
