import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Form } from 'react-bootstrap'
import { CustomSelectInput } from 'components/molecules/CustomSelectInput'
import { PROVIDER_ORDER_TYPES } from 'constants/orders'
import { actions } from '../../widgets/Wizard/wizard.slice'
import { selectWizardFormValues } from '../../widgets/Wizard/wizard.selectors'
import { selectSelectedOrder } from '../VisitItem/visitItem.selectors'
import medicationAndTestData, {
  MEDICATION,
  MAX_DOSAGE_LENGTH,
} from './orderModal.constants'

const { setIsCurrentPageValid, setFormValues } = actions

const columnLeftSizing = {
  xl: { span: 4, order: 1 },
  lg: { span: 4, order: 1 },
  sm: { span: 4, order: 1 },
  xs: { span: 4, order: 2 },
}
const columnRightSizing = {
  xl: { span: 8, order: 1 },
  lg: { span: 8, order: 1 },
  sm: { span: 8, order: 1 },
  xs: { span: 3, order: 2 },
}

const OrderMedicationAndDosage = () => {
  const dispatch = useDispatch()

  const { selectedTestOrCategory, medication, dosage } = useSelector(
    selectWizardFormValues
  )

  const { type } = useSelector(selectSelectedOrder)

  const selectedTestData =
    medicationAndTestData.medications[selectedTestOrCategory]

  const medicationTypes = Object.keys(selectedTestData).map((medication) => ({
    label: medication,
    value: medication,
  }))

  const medicationDosages = selectedTestData?.[medication]?.dosage.map(
    (dosage) => ({ label: dosage, value: dosage })
  )

  const needPersonalizedDosage =
    selectedTestData?.[medication]?.needPersonalizedDosage

  const supportiveTextToDisplay = selectedTestData?.[medication]?.supportiveText

  useEffect(() => {
    // TODO: Determine whether to declare this above or keep two copies or do larger refactor
    const medicationDosage = medicationAndTestData.medications[
      selectedTestOrCategory
    ]?.[medication]?.dosage.map((dosage) => ({ label: dosage, value: dosage }))
    if (
      (medication && dosage) ||
      (medication && medicationDosage.length === 0 && !needPersonalizedDosage)
    )
      dispatch(setIsCurrentPageValid(true))
    else dispatch(setIsCurrentPageValid(false))
  }, [
    dispatch,
    dosage,
    medication,
    selectedTestOrCategory,
    needPersonalizedDosage,
  ])

  const handleChange = (name, value) => {
    dispatch(setIsCurrentPageValid(!!value))
    dispatch(setFormValues({ [name]: value }))
    name === MEDICATION &&
      medication !== value &&
      dispatch(setFormValues({ dosage: '' }))
  }

  return (
    <div className='p-20'>
      <p className='f-14 mb-30'>
        {type === PROVIDER_ORDER_TYPES.TEST &&
          'Please select the appropriate test for your order.'}
        {type === PROVIDER_ORDER_TYPES.MEDICATION &&
          `Please select the appropriate medication category for your order. On the next screen, we'll filter all available medications by the selected category.`}
      </p>
      <Row className='mb-50'>
        <Col className='d-flex align-items-center' {...columnLeftSizing}>
          <h6 className=''>Medication Category</h6>
        </Col>
        <Col {...columnRightSizing}>
          <h5 className='f-16 font-weight-bold'>{selectedTestOrCategory}</h5>
        </Col>
      </Row>
      <Row className='mb-50'>
        <Col className='d-flex align-items-center' {...columnLeftSizing}>
          <Form.Label className='f-12 font-weight-bold mb-0'>
            Medication
          </Form.Label>
        </Col>
        <Col {...columnRightSizing}>
          <CustomSelectInput
            placeholder='Select Medication'
            options={[...(medicationTypes || [])]}
            onChange={(order) => handleChange('medication', order.value)}
            value={medication}
            showSearchBar={false}
            fieldsToBeDisplayed={['label']}
            keyField='label'
            className='mb-10'
          />
        </Col>
      </Row>
      {supportiveTextToDisplay && (
        <Row className='mb-50'>
          <Col className='d-flex align-items-center' {...columnLeftSizing}>
            <p className='p-0'>Additional Guidelines</p>
          </Col>
          <Col {...columnRightSizing}>
            <p className='p-0 f-16 font-weight-bold'>
              {supportiveTextToDisplay}
            </p>
          </Col>
        </Row>
      )}
      <Row className='mb-50'>
        <Col className='d-flex align-items-center' {...columnLeftSizing}>
          <Form.Label className='f-12 font-weight-bold mb-0'>
            Medication Dosage
          </Form.Label>
        </Col>
        <Col {...columnRightSizing}>
          {!needPersonalizedDosage ? (
            medicationDosages?.length !== 0 ? (
              <CustomSelectInput
                placeholder='Select Dosage'
                options={[...(medicationDosages || [])]}
                onChange={(order) => handleChange('dosage', order.value)}
                value={dosage}
                showSearchBar={false}
                fieldsToBeDisplayed={['label']}
                keyField='label'
                className='mb-10'
              />
            ) : (
              <p>No Current Dosage for this Medication.</p>
            )
          ) : (
            <Form.Control
              as='textarea'
              cols='30'
              rows='6'
              className='mb-20'
              placeholder='Enter dosage for order'
              onChange={(ev) => handleChange('dosage', ev.target.value)}
              maxLength={MAX_DOSAGE_LENGTH}
              value={dosage}
            />
          )}
        </Col>
      </Row>
    </div>
  )
}
export default OrderMedicationAndDosage
