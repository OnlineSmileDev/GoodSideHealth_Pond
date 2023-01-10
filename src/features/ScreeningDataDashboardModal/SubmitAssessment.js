import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../../widgets/Wizard/wizard.slice'
import { selectWizardFormValues } from '../../widgets/Wizard/wizard.selectors'

const { setIsCurrentPageValid, setFormValues } = actions

const SubmitAssessment = () => {
  const dispatch = useDispatch()
  const wizardForm = useSelector(selectWizardFormValues)
  const { symptoms, exposure } = wizardForm

  useEffect(() => {
    dispatch(setIsCurrentPageValid(true))
    dispatch(setFormValues({ symptoms: false, exposure: false }))
  }, [dispatch])

  const handleChange = (field, value) => {
    dispatch(setFormValues({ [field]: value }))
  }

  return (
    <div className='p-20'>
      <h4 className='font-weight-bold f-18 mb-20'>
        Is the Student Experiencing COVID Symptoms?
      </h4>
      <p className='f-14 mb-30'>
        Symptoms include: feeling feverish or a measured temperature greater
        than or equal to 100.0 degrees Fahrenheit), loss of taste or smell,
        cough, difficulty breathing, shortness of breath, headache, chills, sore
        throat, shaking or exaggerated shivering, significant muscle pain or
        ache, diarrhea, or vomiting
      </p>

      <div className='mb-25'>
        <Row>
          <Col md={6}>
            <div className='wizard-radio '>
              <label className='d-block'>
                <input
                  className='d-none'
                  type='radio'
                  name='radio1'
                  id='symptomPositive'
                  onChange={() => handleChange('symptoms', true)}
                />
                <div>
                  <span className='f-14 font-weight-bold hind'>Yes</span>
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
                  name='radio1'
                  id='symptomNegative'
                  onClick={() => handleChange('symptoms', false)}
                  checked={!symptoms}
                />
                <div>
                  <span className='f-14 font-weight-bold hind'>No</span>
                </div>
              </label>
            </div>
          </Col>
        </Row>
      </div>

      <h4 className='font-weight-bold f-18 mb-20'>
        Have the students had close contact with an individual who is
        lab-confirmed with COVID-19?
      </h4>

      <Row>
        <Col md={6}>
          <div className='wizard-radio '>
            <label className='d-block'>
              <input
                className='d-none'
                type='radio'
                name='radio2'
                id='contact Positive'
                onChange={() => handleChange('exposure', true)}
              />
              <div>
                <span className='f-14 font-weight-bold hind'>Yes</span>
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
                name='radio2'
                id='contactNegative'
                onChange={() => handleChange('exposure', false)}
                checked={!exposure}
              />
              <div>
                <span className='f-14 font-weight-bold hind'>No</span>
              </div>
            </label>
          </div>
        </Col>
      </Row>
    </div>
  )
}
export default SubmitAssessment
