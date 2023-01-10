import React from 'react'
import { FieldTemplateProps } from '@rjsf/core'

// built with react-jsonschema-form (@rjsf) in mind
const CustomFieldTemplate = ({
  classNames,
  help,
  description,
  errors,
  children,
}: FieldTemplateProps) => (
  <div className={classNames}>
    {description}
    {children}
    {errors}
    {help}
  </div>
)

export default CustomFieldTemplate
