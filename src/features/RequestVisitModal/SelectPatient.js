import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFeatures } from 'flagged'
import { CustomSelectInput } from 'components/molecules/CustomSelectInput'
import { NoCostBadge } from 'components/atoms/NoCostBadge'
import { getDateFromIsoString } from 'utils/datePicker'
import { actions } from '../../widgets/Wizard/wizard.slice'
import { selectWizardFormValues } from '../../widgets/Wizard/wizard.selectors'
import { fetchLocationPatients } from '../../features/VisitItem/visitItem.asyncActions'
import {
  selectPatients,
  selectSelectedLocation,
} from '../../features/VisitItem/visitItem.selectors'
import { actions as visitItemActions } from '../VisitItem/visitItem.slice'

const { setIsCurrentPageValid, setFormValues } = actions
const { resetPatients } = visitItemActions

const SelectPatient = () => {
  const dispatch = useDispatch()
  const wizardForm = useSelector(selectWizardFormValues)
  const selectedLocation = useSelector(selectSelectedLocation)
  const patients = useSelector(selectPatients)
  const { insuranceValidationBadge } = useFeatures()
  const noCostField = { field: 'noCostVisit', badge: <NoCostBadge /> }
  const fieldsToBeDisplayed = ['name', 'dateOfBirth', 'id']

  useEffect(() => {
    if (wizardForm.patient) dispatch(setIsCurrentPageValid(true))
  }, [dispatch, wizardForm.patient])

  useEffect(() => {
    return () => dispatch(resetPatients())
  }, [dispatch])

  const handleChange = (value) => {
    dispatch(setIsCurrentPageValid(!!value))
    dispatch(setFormValues({ patient: value }))
  }

  const getFormattedName = (key) => `${key.firstName} ${key.lastName}`

  const formattedData = patients.map((key) => ({
    ...key,
    name: getFormattedName(key),
    dateOfBirth: getDateFromIsoString(key.dateOfBirth),
  }))

  return (
    <div className='p-20'>
      <p className='f-14 mb-30'>
        Please select the patient requiring a visit using the field below. You
        can use this field to search for patients by name, student ID or date of
        birth.
      </p>
      <div className='mb-30'>
        <CustomSelectInput
          placeholder='Select Patient'
          options={formattedData}
          onChange={(data) => handleChange(data)}
          value={wizardForm.patient && getFormattedName(wizardForm.patient)}
          searchBoxPlaceholder='Search Patient by Name, Date of Birth or Student ID'
          keyField='id'
          fieldsToBeDisplayed={
            insuranceValidationBadge
              ? [...fieldsToBeDisplayed, noCostField]
              : fieldsToBeDisplayed
          }
          onEmptySearchRes={`No Patient Match found at ${selectedLocation.name}`}
          onClearSearchText={() => dispatch(resetPatients())}
          onSearchChange={(value) =>
            dispatch(
              fetchLocationPatients({
                value,
                locationId: selectedLocation.id,
                organizationId: selectedLocation.organizationId,
              })
            )
          }
        />
      </div>
    </div>
  )
}
export default SelectPatient
