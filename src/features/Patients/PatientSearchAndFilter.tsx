import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { InputWidget } from 'components/molecules/InputWidget'
import { Card } from 'components/atoms/Card'
import { Label } from 'components/atoms/Label'
import {
  CustomDatePicker,
  DATE_PICKER_VARIANT,
} from 'components/atoms/DatePicker'
import { DEBOUNCE_TIMEOUT } from 'constants/general'
import { getBackendFormattedDate } from 'utils/datePicker'
import { useDebounce } from '../../hooks'
import { selectPatientFilters } from './patients.selectors'
import { actions } from './patients.slice'

const { setPatientFilters } = actions

const PatientSearchAndFilter = () => {
  const dispatch = useDispatch()
  const debounce = useDebounce()
  const { dateOfBirth } = useSelector(selectPatientFilters)

  const handleSearchAndFilter = (name, value) =>
    debounce(
      () =>
        dispatch(
          setPatientFilters({
            [name]: value,
            page: 1,
          })
        ),
      DEBOUNCE_TIMEOUT
    )

  return (
    <Card className='tw-my-2'>
      <Label className='tw-text-base tw-font-extrabold tw-mb-3'>
        Search and Filter
      </Label>
      <InputWidget
        as='search'
        type='text'
        name='firstName'
        className='tw-mb-3'
        placeholder='Search by First Name...'
        onChange={({ target: { name, value } }) =>
          handleSearchAndFilter(name, value)
        }
      />
      <InputWidget
        as='search'
        type='text'
        name='lastName'
        className='tw-mb-3'
        placeholder='Search by Last Name...'
        onChange={({ target: { name, value } }) =>
          handleSearchAndFilter(name, value)
        }
      />
      <CustomDatePicker
        date={dateOfBirth}
        variant={DATE_PICKER_VARIANT.DARK}
        dateFormat='yyyy-MM-dd'
        name='dateOfBirth'
        placeholderText='Filter by Birthdate'
        autoComplete='off'
        setDate={(value) =>
          handleSearchAndFilter('dateOfBirth', getBackendFormattedDate(value))
        }
      />
    </Card>
  )
}
export default PatientSearchAndFilter
