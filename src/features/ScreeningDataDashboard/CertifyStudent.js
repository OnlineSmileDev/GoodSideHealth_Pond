import React, { useState, useEffect } from 'react'
// import { Card, Button, Form, Col } from 'react-bootstrap'
import { Card, Form, Col } from 'react-bootstrap'
import { CustomDatePicker } from 'components/atoms/DatePicker'
import { formattedDate, getIsoString } from 'utils/datePicker'
import CertifyStudentModal from '../ScreeningDataDashboardModal'
import { actions } from './screeningDataDashboard.slice'
import { useDispatch, useSelector } from 'react-redux'
// import CustomSelectInput from 'components/molecules/CustomSelectInput'
import {
  fetchLocations,
  fetchDepartments,
} from '../ScreeningDataDashboard/screeningDataDashboard.asyncActions'
import {
  selectLocations,
  selectDepartments,
} from '../ScreeningDataDashboard/screeningDataDashboard.selectors'
// import {
// 	SCREENING_DEFAULT_VALUES,
// 	SELECTED_MODAL,
// } from './screeningDataDashboard.constants'

// const { setDashboardFilters, saveSelectedModal } = actions
const { setDashboardFilters } = actions

const CertifyStudent = () => {
  const dispatch = useDispatch()
  const locations = useSelector(selectLocations)
  const departments = useSelector(selectDepartments)

  // const options = [
  // 	{
  // 		id: 0,
  // 		name: SCREENING_DEFAULT_VALUES.ALL_LOCATIONS,
  // 		organizationId: 0,
  // 	},
  // 	...locations,
  // ]

  const [date, setDate] = useState(new Date())
  const [shouldShowCertifyStudentModal, toggleCertifyStudentModal] =
    useState(false)

  // const [selectedLocation, setSelectedLocation] = useState(locations)
  // const selectedLocationName = selectedLocation?.name

  // const [selectedDepartment, setSelectedDepartment] = useState(departments)
  // const selectedDepartmentName = selectedDepartment?.name

  useEffect(() => {
    if (locations.length === 0) {
      dispatch(fetchLocations())
    }
  }, [dispatch, locations])

  useEffect(() => {
    if (departments.length === 1) {
      dispatch(fetchDepartments())
    }
  }, [dispatch, departments])

  // const handleLocationChange = (location) => {
  // 	setSelectedLocation(location)
  // 	const currentLocation =
  // 		location?.name !== SCREENING_DEFAULT_VALUES.ALL_LOCATIONS
  // 			? location.name
  // 			: ''
  // 	dispatch(setDashboardFilters({ location: currentLocation }))
  // }

  // const handleDepartmentChange = (department) => {
  // 	setSelectedDepartment(department)
  // 	const currentDepartment =
  // 		department?.name !== SCREENING_DEFAULT_VALUES.ALL_GRADES_AND_DEPARTMENTS
  // 			? department.name
  // 			: ''
  // 	dispatch(setDashboardFilters({ grade: currentDepartment }))
  // }
  return (
    <>
      {shouldShowCertifyStudentModal && (
        <CertifyStudentModal onClose={() => toggleCertifyStudentModal(false)} />
      )}
      <Col className='lg-4 xl-4'>
        <Card className='border-0 mb-25'>
          <Card.Body className='p-0'>
            <Card.Title className='font-weight-bold gotham lh-25 d-block mb-20 f-16'>
              Filter
            </Card.Title>
            <Form.Group className='mb-10'>
              <CustomDatePicker
                date={date}
                formattedDate={formattedDate(date)}
                setDate={(value) => {
                  setDate(value)
                  dispatch(setDashboardFilters({ date: getIsoString(value) }))
                }}
                showNoFutureDates
              />
            </Form.Group>
            {/* <Form.Group className='mb-10'>
							<CustomSelectInput
								placeholder='Select Location'
								options={options}
								onChange={handleLocationChange}
								value={selectedLocationName}
								keyField='id'
								fieldsToBeDisplayed={['name']}
								showSearchBar={false}
								screeningDashboardStyles
							/>
						</Form.Group>
						<Form.Group className='mb-10'>
							<CustomSelectInput
								placeholder='Select Department/Grade'
								options={departments}
								onChange={handleDepartmentChange}
								value={selectedDepartmentName}
								keyField='id'
								fieldsToBeDisplayed={['name']}
								showSearchBar={false}
								screeningDashboardStyles
							/>
						</Form.Group>
						<div className='separator my-30'></div>
						<Button
							className='btn-warning btn-block'
							onClick={() => {
								dispatch(saveSelectedModal(SELECTED_MODAL.CERTIFY_STUDENT))
								toggleCertifyStudentModal(true)
							}}
						>
							Certify Student
						</Button> */}
          </Card.Body>
        </Card>
      </Col>
    </>
  )
}
export default CertifyStudent
