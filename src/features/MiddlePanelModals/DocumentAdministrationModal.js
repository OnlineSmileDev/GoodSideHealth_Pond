import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Form, Button } from 'react-bootstrap'
import NumberFormat from 'react-number-format'
import moment from 'moment/moment'
import { CustomSelectInput } from 'components/molecules/CustomSelectInput'
import { isPastDate } from 'utils/datePicker'
import { ORDER_STATUS, ORDER_TYPES } from 'constants/orders'
import { actions } from '../VisitItem/visitItem.slice'
import Modal, { hideModal, showModal } from '../../widgets/modal'
import { addOrUpdateOrder } from '../VisitItem/visitItem.asyncActions'
import {
  selectSelectedOrder,
  selectVisitDetails,
} from '../VisitItem/visitItem.selectors'
import medicationAndTestData from '../OrderModal/orderModal.constants'

const { setSelectedMiddlePanelModal } = actions

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
const DocumentAdministrationModal = () => {
  const [dateError, setDateError] = useState({
    isInValidDate: false,
    isPastDate: false,
  })
  const dispatch = useDispatch()
  const {
    id: orderId,
    type,
    status: orderStatusDeclined,
  } = useSelector(selectSelectedOrder)

  const visitDetails = useSelector(selectVisitDetails)

  const isOrderTypeTest = type === ORDER_TYPES.TEST
  const isOrderTypeMedication = type === ORDER_TYPES.MEDICATION
  const isOrderTypeAssessment = type === ORDER_TYPES.ASSESSMENT

  let orderToEdit
  const orderType = type === ORDER_TYPES.MEDICATION ? 'orders' : type
  if (orderId)
    orderToEdit = visitDetails[orderType].find(({ id }) => id === orderId)

  const isStatusDeclined =
    orderStatusDeclined === ORDER_STATUS.DECLINED ||
    orderToEdit?.status === ORDER_STATUS.DECLINED

  const onClose = () => dispatch(setSelectedMiddlePanelModal(null))
  const resetModal = () => dispatch(setSelectedMiddlePanelModal(null))
  const [values, setValue] = useState({
    testOutcome: orderStatusDeclined
      ? ORDER_STATUS.DECLINED
      : orderToEdit?.testOutcome || '',
    administrationNotes: orderToEdit?.administrationNotes || '',
    medicationLotNumber: orderToEdit?.medicationLotNumber || '',
    expirationDate: orderToEdit?.expirationDate || '',
    manufacturer: orderToEdit?.manufacturer || '',
  })
  const handleChange = (name, val) =>
    setValue((state) => ({ ...state, [name]: val }))

  const dateFormatter = (value) => {
    let updatedValue
    // TODO: Feels brittle, very open to suggestions for better logic
    // TODO: If the logic stays, i will move it into the datepicker utils
    const isValueISODate = value.toString().includes('T')
    if (isValueISODate) updatedValue = value.slice(0, value.indexOf('T'))
    if (!isValueISODate) updatedValue = value
    const date = updatedValue && updatedValue.split('-').reverse()
    return `${date?.[1]}/${date?.[0]}/${date?.[2]}`
  }
  const dateConverter = (val) => {
    const date = val.split('/').reverse()
    return `${date[0]}-${date[2]}-${date[1]}`
  }

  useEffect(() => {
    dispatch(showModal())
  }, [dispatch])

  const handleClose = () => {
    dispatch(hideModal())
    resetModal()
  }

  const onSave = () => {
    let status
    if (isStatusDeclined) status = ORDER_STATUS.DECLINED
    else if (isOrderTypeTest) status = values.testOutcome
    else status = ORDER_STATUS.COMPLETE
    let followUpInstructions = orderToEdit?.followUpInstructions ?? ''

    const medicationTestInstructions =
      medicationAndTestData?.tests?.[orderToEdit?.type]?.followUpInstructions

    if (
      isOrderTypeTest &&
      values.testOutcome.toLowerCase() === ORDER_STATUS.POSITIVE.toLowerCase()
    ) {
      followUpInstructions =
        medicationTestInstructions?.[ORDER_STATUS.POSITIVE.toLowerCase()]
    } else if (
      isOrderTypeTest &&
      values.testOutcome.toLowerCase() === ORDER_STATUS.NEGATIVE.toLowerCase()
    ) {
      followUpInstructions =
        medicationTestInstructions?.[ORDER_STATUS.NEGATIVE.toLowerCase()]
    }

    const order = {
      status,
      administrationNotes: values.administrationNotes,
      completedAt: orderToEdit?.completedAt || new Date().toISOString(),
    }
    let updatedOrder
    if (isStatusDeclined || isOrderTypeAssessment) {
      updatedOrder = order
    } else if (isOrderTypeTest) {
      updatedOrder = {
        ...order,
        testOutcome: values.testOutcome,
        followUpInstructions: followUpInstructions,
      }
    } else if (isOrderTypeMedication) {
      updatedOrder = {
        ...order,
        medicationLotNumber: values.medicationLotNumber,
        expirationDate: new Date(values.expirationDate).toISOString(),
        manufacturer: values.manufacturer,
      }
    }

    dispatch(addOrUpdateOrder({ updatedOrder, orderId, type }))
    onClose()
  }

  const testOptions = [{ testOutcome: 'POSITIVE' }, { testOutcome: 'NEGATIVE' }]

  let disabled = false

  if (isOrderTypeTest && values.testOutcome === '' && !isStatusDeclined)
    disabled = true

  if (
    isOrderTypeMedication &&
    !isStatusDeclined &&
    (values.medicationLotNumber === '' ||
      values.expirationDate === '' ||
      values.manufacturer === '' ||
      dateError.isInValidDate ||
      dateError.isPastDate)
  )
    disabled = true

  const handleDateErrorWarnings = (value) => {
    if (
      moment(value).isValid() &&
      (dateError.isInValidDate || dateError.isPastDate)
    ) {
      setDateError({
        isPastDate: isPastDate(value),
        isInValidDate: false,
      })
    }
  }

  const footer = (
    <>
      <Button
        className={`btn-lg pendo-document-administration-save-button-${
          isOrderTypeTest ? 'test' : 'medication'
        }`}
        variant='success'
        onClick={onSave}
        disabled={disabled}
      >
        Save
      </Button>
      <Button className='btn-small' variant='light' onClick={handleClose}>
        Cancel
      </Button>
    </>
  )

  return (
    <Modal
      title='Document Administration'
      reset={resetModal}
      footer={footer}
      size='sm'
    >
      <p className='text-light f-14 mb-20'>
        Please document the outcome or denial reason of the provider order.
        We’ll share these details with the provider, and you&apos;ll be given an
        opportunity after the visit has ended to provide any additional notes.
      </p>
      <Form>
        <Form.Group controlId='AdminNotes'>
          <Row className={isStatusDeclined ? '' : 'mb-50'}>
            <Col className='mt-3' {...columnLeftSizing}>
              <Form.Label className='f-14 font-weight-bold mb-0'>
                Administration Notes
              </Form.Label>
            </Col>
            <Col {...columnRightSizing}>
              <Form.Control
                as='textarea'
                cols='30'
                rows='6'
                className='mb-20'
                placeholder='Administration Notes'
                onChange={(ev) =>
                  handleChange('administrationNotes', ev.target.value)
                }
                value={values.administrationNotes}
              />
            </Col>
          </Row>
        </Form.Group>

        {!isStatusDeclined &&
          (isOrderTypeTest ? (
            <Form.Group controlId='testOutcome'>
              <Row className='mb-50'>
                <Col
                  className='d-flex align-items-center mb-0'
                  {...columnLeftSizing}
                >
                  <Form.Label className='f-14 font-weight-bold mb-0'>
                    Test Result
                  </Form.Label>
                </Col>
                <Col {...columnRightSizing}>
                  <CustomSelectInput
                    placeholder='Select Result'
                    options={!orderStatusDeclined ? testOptions : []}
                    onChange={(test) =>
                      handleChange('testOutcome', test.testOutcome)
                    }
                    value={values.testOutcome}
                    showSearchBar={false}
                    fieldsToBeDisplayed={['testOutcome']}
                    keyField='testOutcome'
                  />
                </Col>
              </Row>
            </Form.Group>
          ) : isOrderTypeMedication ? (
            <>
              <Form.Group controlId='medicationLotNumber'>
                <Row className='mb-10'>
                  <Col
                    className='d-flex align-items-center mb-0'
                    {...columnLeftSizing}
                  >
                    <Form.Label className='f-14 font-weight-bold mb-0'>
                      Medication Lot Number
                    </Form.Label>
                  </Col>
                  <Col {...columnRightSizing}>
                    <Form.Control
                      type='text'
                      placeholder='Lot Number'
                      onChange={(ev) =>
                        handleChange('medicationLotNumber', ev.target.value)
                      }
                      value={values.medicationLotNumber}
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId='expirationDate'>
                <Row className='mb-10'>
                  <Col
                    className='d-flex align-items-center mb-0'
                    {...columnLeftSizing}
                  >
                    <Form.Label className='f-14 font-weight-bold mb-0'>
                      Expiration Date
                    </Form.Label>
                  </Col>
                  <Col {...columnRightSizing}>
                    <NumberFormat
                      name='expirationDate'
                      className='form-control'
                      value={dateFormatter(values.expirationDate)}
                      format='##/##/####'
                      pattern='^(((0)[0-9])|((1)[0-2]))(\/)([0-2][0-9]|(3)[0-1])(\/)\d{4}$'
                      placeholder='MM/DD/YYYY'
                      mask={['M', 'M', 'D', 'D', 'Y', 'Y', 'Y', 'Y']}
                      onValueChange={(e) => {
                        const value = dateConverter(e.formattedValue)
                        handleDateErrorWarnings(value)
                        handleChange('expirationDate', value)
                      }}
                      onBlur={(e) => {
                        const value = dateConverter(e.target.value)
                        const isInvalidDate = !moment(value).isValid()
                        setDateError({
                          isInValidDate: isInvalidDate,
                          isPastDate: !isInvalidDate && isPastDate(value),
                        })
                      }}
                    />
                    {dateError.isInValidDate && (
                      <p className='error-message'>
                        Please Input a valid date.
                      </p>
                    )}
                    {dateError.isPastDate && (
                      <p className='error-message'>Past Date Detected.</p>
                    )}
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group controlId='manufacturer'>
                <Row>
                  <Col
                    className='d-flex align-items-center'
                    {...columnLeftSizing}
                  >
                    <Form.Label className='f-14 font-weight-bold'>
                      Manufacturer
                    </Form.Label>
                  </Col>
                  <Col {...columnRightSizing}>
                    <Form.Control
                      type='text'
                      onChange={(ev) =>
                        handleChange('manufacturer', ev.target.value)
                      }
                      placeholder='Manufacturer'
                      value={values.manufacturer}
                    />
                  </Col>
                </Row>
              </Form.Group>
            </>
          ) : null)}
      </Form>
    </Modal>
  )
}

export default DocumentAdministrationModal
