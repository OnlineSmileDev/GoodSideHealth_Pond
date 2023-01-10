import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFeatures } from 'flagged'
import { Card, Form } from 'react-bootstrap'
import { DEBOUNCE_TIMEOUT, REG_DATE_INPUT } from 'constants/general'
import { CustomSelectInput } from 'components/molecules/CustomSelectInput'
import { actions } from './patients.slice'
import { selectPatientFilters } from './patients.selectors'
import {
  fetchLocations,
  fetchOrganizations,
} from '../ScreeningDataDashboard/screeningDataDashboard.asyncActions'
import {
  selectLocations,
  selectOrganizations,
} from '../ScreeningDataDashboard/screeningDataDashboard.selectors'
import { ALL_LOCATIONS, ALL_ORGANIZATIONS } from './patients.constants'
import { selectUserDetails } from '../Users'
// import { PATIENT_STATUS_OPTIONS } from './patients.constants'
import { useDebounce } from '../../hooks'
import { selectCurrentUserHasPermissions } from '../../infrastructure/userContext'
import PatientSearchAndFilter from './PatientSearchAndFilter'

const { setPatientFilters } = actions

const PatientSearch = () => {
  const dispatch = useDispatch()
  const debounce = useDebounce()
  const locations = useSelector(selectLocations)
  const organizations = useSelector(selectOrganizations)
  const user = useSelector(selectUserDetails)
  const currentUserHasPermissions = useSelector(selectCurrentUserHasPermissions)
  const { locationId, organizationId } = useSelector(selectPatientFilters)
  const formattedLocations = [ALL_LOCATIONS, ...locations]
  const { patientSearchAndFilter } = useFeatures()

  const compareByName = (object1, object2) =>
    object1.name > object2.name ? 1 : object2.name > object1.name ? -1 : 0

  const formattedOrganizations = [
    ALL_ORGANIZATIONS,
    ...organizations.slice().sort(compareByName),
  ]

  useEffect(() => {
    dispatch(fetchLocations({ organizationId }))
    dispatch(fetchOrganizations())
  }, [dispatch, organizationId])

  useEffect(() => {
    if (user?.locationId) {
      dispatch(setPatientFilters({ locationId: user.locationId }))
    }
    if (user?.organizationId) {
      dispatch(setPatientFilters({ organizationId: user.organizationId }))
    }
  }, [dispatch, user])

  const getSelectedItem = (options, selectedValue) =>
    options.find((item) => item.id === selectedValue)

  const selectedLocation = getSelectedItem(formattedLocations, locationId)

  const selectedOrganization = getSelectedItem(
    formattedOrganizations,
    organizationId
  )
  // const [selectedStatus, setSelectedStatus] = useState(PATIENT_STATUS_OPTIONS)
  // const selectedStatusName = selectedStatus?.label

  const handleSearch = (ev) => {
    const value = ev.target.value
    const isDateInput = REG_DATE_INPUT.test(value)
    if (isDateInput) {
      if (value.length === 10) {
        dispatch(setPatientFilters({ search: value, page: 1 }))
      }
    } else {
      debounce(
        () => dispatch(setPatientFilters({ search: value, page: 1 })),
        DEBOUNCE_TIMEOUT
      )
    }
  }

  const handleChange = (key, selectedValue) => {
    dispatch(setPatientFilters({ [key]: selectedValue?.id, page: 1 }))
  }

  // const handleStatusChange = (patientStatus) => {
  // 	setSelectedStatus(patientStatus)
  // 	dispatch(setPatientFilters({ status: patientStatus.value }))
  // }
  return (
    <>
      <Card className='shadow-0 border-0 bg-transparent'>
        <Card.Body className='p-0'>
          {patientSearchAndFilter ? (
            <PatientSearchAndFilter />
          ) : (
            <Form.Group className='mb-10'>
              <Form.Control
                id='patients-search'
                className='search-control'
                type='text'
                placeholder='Search Patients'
                onChange={handleSearch}
              />
            </Form.Group>
          )}

          <Form.Group className='mb-10'>
            {/* PERMISSION:- Can view all location patients  */}
            <CustomSelectInput
              placeholder='All Organizations'
              options={formattedOrganizations}
              onChange={(selectedValue) =>
                handleChange('organizationId', selectedValue)
              }
              value={selectedOrganization?.name || ALL_ORGANIZATIONS.name}
              keyField='id'
              fieldsToBeDisplayed={['name']}
              showSearchBar={true}
              screeningDashboardStyles
              readOnly={!!user.organizationId}
              dataTestId='patient-organizations'
            />
          </Form.Group>

          <Form.Group id='patients-search-location-filter' className='mb-10'>
            <CustomSelectInput
              placeholder='All Locations'
              options={formattedLocations}
              onChange={(selectedValue) =>
                handleChange('locationId', selectedValue)
              }
              value={selectedLocation?.name || ALL_LOCATIONS.name}
              keyField='id'
              fieldsToBeDisplayed={['name']}
              showSearchBar={true}
              screeningDashboardStyles
              dataTestId='patient-locations'
            />
          </Form.Group>
          {/* <Form.Group className='mb-10'>
						<CustomSelectInput
							placeholder='All Status'
							options={PATIENT_STATUS_OPTIONS}
							onChange={handleStatusChange}
							value={selectedStatusName}
							keyField='label'
							fieldsToBeDisplayed={['label']}
							showSearchBar={false}
							screeningDashboardStyles
						/>
					</Form.Group> */}
        </Card.Body>
      </Card>
    </>
  )
}
export default PatientSearch
