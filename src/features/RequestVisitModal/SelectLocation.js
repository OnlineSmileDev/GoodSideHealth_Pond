import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CustomSelectInput } from 'components/molecules/CustomSelectInput'
import { actions } from '../../widgets/Wizard/wizard.slice'
import { selectWizardFormValues } from '../../widgets/Wizard/wizard.selectors'
import { actions as action } from '../VisitItem/visitItem.slice'
import { fetchLocations } from '../../features/VisitItem/visitItem.asyncActions'
import { selectLocations } from '../../features/VisitItem/visitItem.selectors'
import { selectUserDetails } from '../Users/users.selectors'

const { setIsCurrentPageValid, setFormValues, resetFormValues } = actions
const { saveSelectedLocation } = action

const SelectLocation = () => {
  const dispatch = useDispatch()
  const wizardForm = useSelector(selectWizardFormValues)
  const locations = useSelector(selectLocations)
  const user = useSelector(selectUserDetails)

  const defaultLocation = locations.find(
    ({ id }) => id === user.defaultLocationId
  )

  useEffect(() => {
    if (user.defaultLocationId && !wizardForm.location) {
      dispatch(setFormValues({ location: defaultLocation }))
      dispatch(saveSelectedLocation(defaultLocation))
    }
  }, [dispatch, user.defaultLocationId, defaultLocation, wizardForm.location])

  useEffect(() => {
    if (locations.length === 0) {
      dispatch(fetchLocations())
    }
  }, [dispatch, wizardForm, locations])

  useEffect(() => {
    if (wizardForm.location) dispatch(setIsCurrentPageValid(true))
  }, [dispatch, wizardForm, wizardForm.location])

  const handleChange = (data) => {
    const value = data.name
    if (wizardForm?.location?.name !== value) {
      dispatch(resetFormValues())
    }
    dispatch(setIsCurrentPageValid(!!value))
    dispatch(saveSelectedLocation(data))
    dispatch(setFormValues({ location: data }))
  }

  return (
    <div className='p-20'>
      <p className='f-14 mb-30'>
        Please select the primary location of your patient using the dropdown
        below:
      </p>
      <div className='mb-30'>
        <CustomSelectInput
          placeholder='Select Location'
          options={locations}
          onChange={handleChange}
          value={wizardForm.location && wizardForm.location.name}
          searchBoxPlaceholder='Search Location'
          keyField='id'
          fieldsToBeDisplayed={['name']}
        />
      </div>
    </div>
  )
}
export default SelectLocation
