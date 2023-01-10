import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { WidgetProps } from '@rjsf/core'

const CustomPHQResultsWidget = ({
  label: widgetLabel,
  value: selectedValue,
  uiSchema,
}: WidgetProps) => {
  const widgetTitle = uiSchema?.['ui:title'] || widgetLabel
  const optionTitle =
    uiSchema?.['ui:enumNames']?.[selectedValue] || selectedValue

  const {
    'custom:checkIsValue': checkIsInValues = [],
    'custom:checkIsClass': checkIsInValuesClass = '',
    'custom:checkIsNotValue': checkIsNotInValues = [],
    'custom:checkIsNotClass': checkIsNotInValuesClass = '',
    'custom:additionalContainerClass': additionalContainerClasses = '',
  } = uiSchema || {}

  let bgClass = ''

  if (checkIsInValues.some((val) => val === selectedValue))
    bgClass += checkIsInValuesClass
  if (!checkIsNotInValues.some((val) => val === selectedValue))
    bgClass += checkIsNotInValuesClass
  if (bgClass) bgClass += ' text-white'

  return (
    <Container className={`pt-3 px-0 tw-ml-0 ${additionalContainerClasses}`}>
      <Row className='pb-3'>
        <Col>
          <span className='f-14'>{widgetTitle}</span>
        </Col>
        <Col xs={4}>
          <p className={`f-14 text-center rounded py-1 ${bgClass}`}>
            {optionTitle}
          </p>
        </Col>
      </Row>
    </Container>
  )
}

export default CustomPHQResultsWidget
