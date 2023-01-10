import React from 'react'
import { getFormattedNumber } from 'utils/getFormattedNumber'

const PatientCount = ({ count }) => (
  <h4 className='font-weight-bold text-light mb-10 f-16 '>
    {`Showing ${getFormattedNumber(count)} Patients`}
  </h4>
)

export default PatientCount
