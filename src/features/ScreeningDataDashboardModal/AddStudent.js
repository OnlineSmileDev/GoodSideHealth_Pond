import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Row, Col } from 'react-bootstrap'
import { CustomDatePicker } from 'components/atoms/DatePicker'
import { getFormattedDate } from 'utils/datePicker'
import { actions } from '../../widgets/Wizard/wizard.slice'
import { selectWizardFormValues } from '../../widgets/Wizard/wizard.selectors'
import { GRADES } from './ScreeningDataDashboardModal.constants'

const { setIsCurrentPageValid, setFormValues } = actions

const AddStudent = () => {
  const dispatch = useDispatch()
  const wizardForm = useSelector(selectWizardFormValues)
  const { firstName, lastName, dateOfBirth } = wizardForm
  const isValid = firstName && lastName && dateOfBirth

  useEffect(() => {
    if (isValid) dispatch(setIsCurrentPageValid(true))
  }, [dispatch, wizardForm, isValid])

  const handleChange = (field, value) => {
    dispatch(setFormValues({ [field]: value }))
  }
  return (
    <div className='p-20'>
      <h4 className='font-weight-bold f-18 mb-20'>Add Student</h4>
      <Form className='p-20'>
        <Row>
          <Col>
            <Form.Group controlId='firstName'>
              <Form.Label className='f-12 font-weight-bold my-2'>
                First Name
              </Form.Label>

              <Form.Control
                type='text'
                name='firstName'
                placeholder='First Name'
                onChange={(ev) => handleChange('firstName', ev.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId='lastName'>
              <Form.Label className='f-12 font-weight-bold my-2'>
                Last Name
              </Form.Label>
              <Form.Control
                type='text'
                name='lastName'
                placeholder='Last Name'
                onChange={(ev) => handleChange('lastName', ev.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId='date'>
              <Form.Label className='f-12 font-weight-bold my-2'>
                Date
              </Form.Label>
              <CustomDatePicker
                date={dateOfBirth}
                formattedDate={dateOfBirth}
                placeholder='Date'
                setDate={(value) => {
                  dispatch(
                    setFormValues({ dateOfBirth: getFormattedDate(value) })
                  )
                }}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId='schoolId'>
              <Form.Label className='f-12 font-weight-bold my-2'>
                School ID#
              </Form.Label>
              <Form.Control
                type='text'
                name='schoolId'
                placeholder='ID'
                onChange={(ev) => handleChange('schoolId', ev.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className='mb-10' controlId='campus'>
              <Form.Label className='f-12 font-weight-bold my-2'>
                Campus
              </Form.Label>
              <Form.Control
                as='select'
                onChange={(ev) => handleChange('location', ev.target.value)}
              >
                <option value=''>Campus</option>
                <option value='A Campus'>A Campus</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className='mb-10' controlId='grades'>
              <Form.Label className='f-12 font-weight-bold my-2'>
                All Grades
              </Form.Label>
              <Form.Control
                as='select'
                onChange={(ev) => handleChange('grade', ev.target.value)}
              >
                {GRADES &&
                  GRADES.map((each) => (
                    <option key={each.value} value={each.value}>
                      {each.label}
                    </option>
                  ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </div>
  )
}
export default AddStudent
