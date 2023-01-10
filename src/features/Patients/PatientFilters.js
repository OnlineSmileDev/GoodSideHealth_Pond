import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
// import { Card, Form, Badge } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { CustomSelectInput } from 'components/molecules/CustomSelectInput'
import { actions } from './patients.slice'
// import { selectPatientFilters } from './patients.selectors'
// import { PROGRAMS, AGES } from './patients.constants'
import { PROGRAMS } from './patients.constants'

const { setPatientFilters } = actions
// const PROGRAM_ID = 'programId'

const PatientFilters = () => {
  const dispatch = useDispatch()
  // const { programId = [], age = [] } = useSelector(selectPatientFilters)

  // const removeElementFromArray = (arr, value) => {
  // 	return arr.filter((each) => each !== value)
  // }

  // const handleFiltersChange = (ev) => {
  // 	const isProgram = ev.target.name === PROGRAM_ID
  // 	if (ev.target.checked) {
  // 		dispatch(
  // 			setPatientFilters({
  // 				[ev.target.name]: isProgram
  // 					? [...programId, ev.target.value]
  // 					: [...age, ev.target.value],
  // 			})
  // 		)
  // 	} else {
  // 		dispatch(
  // 			setPatientFilters({
  // 				[ev.target.name]: isProgram
  // 					? removeElementFromArray(programId, ev.target.value)
  // 					: removeElementFromArray(age, ev.target.value),
  // 			})
  // 		)
  // 	}
  // }

  const [selectedProgram, setSelectedProgram] = useState(PROGRAMS)
  const selectedProgramName = selectedProgram?.label

  const handleProgramChange = (patientStatus) => {
    setSelectedProgram(patientStatus)
    dispatch(setPatientFilters({ programId: patientStatus.value, page: 1 }))
  }

  return (
    <Form.Group id='patient-programs-filter' className='mb-10'>
      <CustomSelectInput
        placeholder='All Programs'
        options={PROGRAMS}
        onChange={handleProgramChange}
        value={selectedProgramName}
        keyField='id'
        fieldsToBeDisplayed={['label']}
        showSearchBar={false}
        screeningDashboardStyles
        dataTestId='patient-programs'
      />
    </Form.Group>
    // TODO: will comment out when the functionality require in future

    // <Card className='shadow-sm border-0 mb-25'>
    // 	<Card.Body className='p-20'>
    // 		<Card.Title className='font-weight-bold gotham lh-25 d-block mb-20 f-18'>
    // 			Filter
    // 		</Card.Title>
    // 		<h6 className='f-14 font-weight-bold lh-25 mb-10'>Applications</h6>
    // 		{PROGRAMS.map((each) => (
    // 			<Form.Group className='mb-10'>
    // 				<div className='custom-checkbox'>
    // 					<label>
    // 						<input
    // 							type='checkbox'
    // 							className='d-none'
    // 							onChange={handleFiltersChange}
    // 							name='programId'
    // 							value={each.value}
    // 							checked={programId?.includes(`${each.value}`)}
    // 						/>
    // 						<span className='d-flex align-items-center'>
    // 							<Badge
    // 								className='bg-primary badge-round-sm rounded-circle border-0 text-white p-0  text-center f-10 lh-25 mx-2 font-weight-normal'
    // 								variant='primary'
    // 							>
    // 								128
    // 							</Badge>
    // 							{each.label}
    // 						</span>
    // 					</label>
    // 				</div>
    // 			</Form.Group>
    // 		))}
    // 		<h6 className='f-14 font-weight-bold lh-25 mb-10'>Student Age</h6>
    // 		{AGES.map((each) => (
    // 			<Form.Group className='mb-10'>
    // 				<div className='custom-checkbox'>
    // 					<label>
    // 						<input
    // 							type='checkbox'
    // 							className='d-none'
    // 							onChange={handleFiltersChange}
    // 							name='age'
    // 							value={each.value}
    // 							checked={age?.includes(`${each.value}`)}
    // 						/>
    // 						<span>
    // 							<Badge
    // 								className='bg-primary badge-round-sm rounded-circle border-0 text-white p-0  text-center f-10 lh-25 mx-2 font-weight-normal'
    // 								variant='primary'
    // 							>
    // 								128
    // 							</Badge>
    // 							{each.label}
    // 						</span>
    // 					</label>
    // 				</div>
    // 			</Form.Group>
    // 		))}
    // 	</Card.Body>
    // </Card>
  )
}
export default PatientFilters
