import React from 'react'
import Badge from 'react-bootstrap/Badge'
import { MAJOR_PATIENT_AGE } from 'constants/patients'
import { getAgeFromDateOfBirth } from 'utils/getAgeFromDateOfBirth'
import { convertDateToUTC, getFormattedDate } from 'utils/datePicker'

const Over21Badge = () => (
  <Badge
    variant='warning'
    className='border-0 p-0 btn-auto rounded-circle d-inline-flex align-items-center justyfy-content-center f-10 ml-1 text-white badge-rounded'
  >
    {MAJOR_PATIENT_AGE}+
  </Badge>
)
export const dobFormatter = (rowValue, dateOfBirth) => {
  const dob = convertDateToUTC(dateOfBirth)
  const isOver21 = getAgeFromDateOfBirth(dob) > MAJOR_PATIENT_AGE

  return (
    <span className='d-flex'>
      {rowValue}
      {isOver21 && <Over21Badge />}
    </span>
  )
}

export const isAgeIsGreaterThan21 = (date) => {
  const getAge = getAgeFromDateOfBirth(getFormattedDate(date))
  return getAge > MAJOR_PATIENT_AGE
}
