import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from 'utils/isEmpty'
import { actions } from '../../widgets/Wizard/wizard.slice'
import { selectWizardFormValues } from '../../widgets/Wizard/wizard.selectors'
import { selectSelectedPatient } from '../ScheduleArchive/scheduleArchive.selectors'
import { TEST_RESULT } from '../ScheduleArchive/scheduleArchive.constants'

const { setIsCurrentPageValid, setFormValues } = actions

const DocumentResult = () => {
  const dispatch = useDispatch()
  const wizardForm = useSelector(selectWizardFormValues)
  const selectedPatient = useSelector(selectSelectedPatient)

  useEffect(() => {
    dispatch(setIsCurrentPageValid(true))
    if (isEmpty(wizardForm.testResult))
      dispatch(setFormValues({ testResult: TEST_RESULT.NEGATIVE }))
  }, [dispatch, wizardForm])

  const getFormattedName = (student) =>
    `${student.firstName} ${student.lastName}`

  const handleChange = (ev) => {
    if (ev.target.checked) {
      dispatch(setFormValues({ testResult: ev.target.value }))
    }
  }

  return (
    <div className='p-20'>
      <h4 className='font-weight-bold f-18 mb-20'>
        {`Document Rapid SARS Antigen Test (COVID-19) Result of ${getFormattedName(
          selectedPatient
        )}`}
      </h4>
      <p className='f-14 mb-30'>
        Please select from the options below whether the patient was tested
        positive or negative for the respective test.
      </p>

      <div className='mb-25'>
        <Row>
          <Col md={6}>
            <div className='wizard-radio '>
              <label className='d-block'>
                <input
                  className='d-none'
                  type='radio'
                  name='symptomPositive'
                  id='symptomPositive'
                  onChange={handleChange}
                  value={TEST_RESULT.POSITIVE}
                  checked={wizardForm.testResult === TEST_RESULT.POSITIVE}
                />
                <div>
                  <span className='f-14 font-weight-bold hind'>Positive</span>
                </div>
              </label>
            </div>
          </Col>
          <Col md={6}>
            <div className='wizard-radio hind'>
              <label className='d-block'>
                <input
                  className='d-none'
                  type='radio'
                  name='symptomNegative'
                  id='symptomNegative'
                  onClick={handleChange}
                  value={TEST_RESULT.NEGATIVE}
                  checked={wizardForm.testResult === TEST_RESULT.NEGATIVE}
                />
                <div>
                  <span className='f-14 font-weight-bold hind'>Negative</span>
                </div>
              </label>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}
export default DocumentResult
