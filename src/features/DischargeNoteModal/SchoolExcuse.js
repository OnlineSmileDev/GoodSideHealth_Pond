import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch } from 'components/atoms/Switch'
import { actions } from '../../widgets/Wizard/wizard.slice'
import { selectWizardFormValues } from '../../widgets/Wizard/wizard.selectors'
import { Form, Col, Row } from 'react-bootstrap'
import { SCHOOL_EXCUSE } from './dischargeNoteModal.constants'

const { setIsCurrentPageValid, setFormValues } = actions

const columnLeftSizing = {
  xl: { span: 2, order: 1 },
  lg: { span: 2, order: 1 },
  sm: { span: 2, order: 1 },
  xs: { span: 2, order: 2 },
}
const columnRightSizing = {
  xl: { span: 10, order: 1 },
  lg: { span: 10, order: 1 },
  sm: { span: 10, order: 1 },
  xs: { span: 10, order: 2 },
}
const SchoolExcuse = () => {
  const dispatch = useDispatch()
  const wizardForm = useSelector(selectWizardFormValues)

  useEffect(() => {
    // super nasty set of if elses, i apologize to whoever has to read this code!
    if (
      wizardForm?.schoolExcuse === SCHOOL_EXCUSE.OTHER &&
      wizardForm.otherInstructions
    ) {
      dispatch(setIsCurrentPageValid(true))
    } else if (wizardForm?.schoolExcuse === SCHOOL_EXCUSE.OTHER) {
      dispatch(setIsCurrentPageValid(false))
    } else if (wizardForm?.schoolExcuse !== SCHOOL_EXCUSE.OTHER)
      dispatch(setIsCurrentPageValid(!!wizardForm?.schoolExcuse))
  }, [dispatch, wizardForm])

  const handleCustomSwitchToggle = () => {
    if (wizardForm?.providerInstructions)
      dispatch(setFormValues({ providerInstructions: '' }))
    else if (wizardForm?.otherInstructions)
      dispatch(setFormValues({ otherInstructions: '' }))
  }

  const handleChange = (field, name) => {
    if (wizardForm?.schoolExcuse === name) name = ''
    if (
      field === SCHOOL_EXCUSE.DESCRIPTION &&
      (name !== SCHOOL_EXCUSE.PROVIDER || name !== SCHOOL_EXCUSE.OTHER)
    )
      handleCustomSwitchToggle()
    dispatch(setFormValues({ [field]: name }))
  }

  return (
    <div id='school-excuse-form' className='p-20'>
      <p className='f-14 mb-30'>
        Please select the appropriate school excuse from the toggles below:
      </p>
      <Form.Group>
        <Row>
          <Col
            {...columnLeftSizing}
            className='p-0 d-flex justify-content-center'
          >
            <Form>
              <Switch
                checked={wizardForm?.schoolExcuse === SCHOOL_EXCUSE.TODAY}
                onChange={(ev) => handleChange('schoolExcuse', ev.target.name)}
                ariaLabel={SCHOOL_EXCUSE.TODAY}
                name={SCHOOL_EXCUSE.TODAY}
              />
            </Form>
          </Col>
          <Col
            className='d-flex align-items-center pl-0'
            {...columnRightSizing}
          >
            <Form.Label className='f-14 font-weight-bold mb-0'>
              Patient May Return to School Today
            </Form.Label>
          </Col>
        </Row>
      </Form.Group>

      <Form.Group>
        <Row>
          <Col
            {...columnLeftSizing}
            className='p-0 d-flex justify-content-center'
          >
            <Form>
              <Switch
                checked={wizardForm?.schoolExcuse === SCHOOL_EXCUSE.FEVER}
                onChange={(ev) => handleChange('schoolExcuse', ev.target.name)}
                ariaLabel={SCHOOL_EXCUSE.FEVER}
                name={SCHOOL_EXCUSE.FEVER}
              />
            </Form>
          </Col>
          <Col
            className='d-flex align-items-center pl-0'
            {...columnRightSizing}
          >
            <Form.Label className='f-14 font-weight-bold'>
              Patient May Return to School When Fever Free After 24 Hours
              Without the Use of a Fever Reducer
            </Form.Label>
          </Col>
        </Row>
      </Form.Group>

      <Form.Group>
        <Row>
          <Col
            {...columnLeftSizing}
            className='p-0 d-flex justify-content-center'
          >
            <Form>
              <Switch
                checked={wizardForm?.schoolExcuse === SCHOOL_EXCUSE.PROVIDER}
                onChange={(ev) => handleChange('schoolExcuse', ev.target.name)}
                ariaLabel={SCHOOL_EXCUSE.PROVIDER}
                name={SCHOOL_EXCUSE.PROVIDER}
              />
            </Form>
          </Col>
          <Col
            className='d-flex align-items-center pl-0'
            {...columnRightSizing}
          >
            <Form.Label className='f-14 font-weight-bold mb-0'>
              Refer to Primary Care Provider:
            </Form.Label>
          </Col>
        </Row>
      </Form.Group>

      <Form.Group>
        <Row>
          <Col
            {...columnLeftSizing}
            className='p-0 d-flex justify-content-center'
          />
          <Col className='pl-0' {...columnRightSizing}>
            <Form.Control
              as='textarea'
              name='providerInstructions'
              placeholder='Your Instructions...'
              rows='3'
              value={wizardForm?.providerInstructions ?? ''}
              onChange={(ev) =>
                handleChange('providerInstructions', ev.target.value)
              }
              disabled={wizardForm?.schoolExcuse !== SCHOOL_EXCUSE.PROVIDER}
            />
          </Col>
        </Row>
      </Form.Group>

      <Form.Group>
        <Row>
          <Col
            {...columnLeftSizing}
            className='p-0 d-flex justify-content-center'
          >
            <div className='test'>
              <Form>
                <Switch
                  checked={wizardForm?.schoolExcuse === SCHOOL_EXCUSE.OTHER}
                  onChange={(ev) =>
                    handleChange('schoolExcuse', ev.target.name)
                  }
                  ariaLabel={SCHOOL_EXCUSE.OTHER}
                  name={SCHOOL_EXCUSE.OTHER}
                />
              </Form>
            </div>
          </Col>
          <Col
            className='d-flex align-items-center pl-0'
            {...columnRightSizing}
          >
            <Form.Label className='f-14 font-weight-bold mb-0'>
              Other:
            </Form.Label>
          </Col>
        </Row>
      </Form.Group>

      <Form.Group>
        <Row>
          <Col
            {...columnLeftSizing}
            className='p-0 d-flex justify-content-center'
          />
          <Col className='pl-0' {...columnRightSizing}>
            <Form.Control
              as='textarea'
              name='otherInstructions'
              placeholder='Your Instructions...'
              rows='3'
              value={wizardForm?.otherInstructions ?? ''}
              onChange={(ev) =>
                handleChange('otherInstructions', ev.target.value)
              }
              disabled={wizardForm?.schoolExcuse !== SCHOOL_EXCUSE.OTHER}
            />
          </Col>
        </Row>
      </Form.Group>
    </div>
  )
}
export default SchoolExcuse
