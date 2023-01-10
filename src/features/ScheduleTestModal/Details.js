import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CustomDatePicker } from 'components/atoms/DatePicker'
import { TimeInput } from 'components/molecules/TimeInput'
import {
  convertDateToTime,
  getFormattedDate,
  getFormattedIsoString,
  convertUTCtoLocale,
  isPastTime,
} from 'utils/datePicker'
import { isEmpty } from 'utils/isEmpty'
import { actions } from '../../widgets/Wizard/wizard.slice'
import { selectWizardFormValues } from '../../widgets/Wizard/wizard.selectors'
import { Form, Row, Col } from 'react-bootstrap'
import { SCHEDULE_ARCHIVE_MODAL } from '../ScheduleArchiveModal/scheduleArchiveModal.constants'

const { setIsCurrentPageValid, setFormValues } = actions
const FREQUENCY_SINGLE = 'Single'

const Details = () => {
  const dispatch = useDispatch()
  const wizardForm = useSelector(selectWizardFormValues)
  const {
    testType,
    frequencyType,
    groupName,
    startDate,
    endDate,
    repeatsOn,
    time,
  } = wizardForm
  const isValid = testType && frequencyType && groupName
  const today = new Date()
  const [testDay, setTestDay] = useState({})
  const [testTime, setTestTime] = useState(time || today)
  const [isValidTime, setIsValidTime] = useState(true)

  useEffect(() => {
    isValid && dispatch(setIsCurrentPageValid(true))
    if (isEmpty(startDate)) {
      dispatch(setFormValues({ startDate: getFormattedIsoString(new Date()) }))
    }
    if (frequencyType === FREQUENCY_SINGLE && isPastTime(startDate, time)) {
      setIsValidTime(false)
    } else {
      setIsValidTime(true)
    }
  }, [dispatch, isValid, time, startDate, frequencyType])

  useEffect(() => {
    if (testTime) dispatch(setFormValues({ time: convertDateToTime(testTime) }))
  }, [dispatch, testTime])

  const handleChange = (field, value) => {
    dispatch(setFormValues({ [field]: value }))
    dispatch(setIsCurrentPageValid(!!value))
  }

  const handleDaysChange = (ev) => {
    dispatch(
      setFormValues({
        repeatsOn: {
          ...repeatsOn,
          ...testDay,
          ...{ [ev.target.value]: ev.target.checked },
        },
      })
    )
    setTestDay({ ...testDay, ...{ [ev.target.value]: ev.target.checked } })
  }

  return (
    <div className='p-20'>
      <p className='f-14 mb-30'>
        Please use the fields below to schedule your patient&apos;s test.
      </p>
      <Form className='py-10'>
        <Form.Group controlId='selectTest'>
          <Row>
            <Col md={4}>
              <Form.Label className='f-14 hind font-weight-bold my-2'>
                Select Test
              </Form.Label>
            </Col>
            <Col md={8}>
              <Form.Control
                as='select'
                onChange={(ev) => {
                  dispatch(setFormValues({ testType: ev.target.value }))
                }}
                value={testType}
              >
                {/* TODO - Need to get dynamic from APIs */}
                <option value=''>Select Test</option>
                <option value='Rapid SARS Antigen Test (COVID-19)'>
                  Rapid SARS Antigen Test (COVID-19)
                </option>
              </Form.Control>
            </Col>
          </Row>
        </Form.Group>
        <Form.Group controlId='selectFrequencyType'>
          <Row>
            <Col md={4}>
              <Form.Label className='f-14 hind font-weight-bold my-2'>
                Select Test Frequency
              </Form.Label>
            </Col>
            <Col md={8}>
              <Form.Control
                as='select'
                onChange={(ev) => {
                  dispatch(setFormValues({ frequencyType: ev.target.value }))
                }}
                value={frequencyType}
              >
                <option value=''>Select Test Frequency</option>
                <option value='Single'>Single Test</option>
                <option value={SCHEDULE_ARCHIVE_MODAL.RECURRING_TEST}>
                  Recurring Test
                </option>
              </Form.Control>
            </Col>
          </Row>
        </Form.Group>
        <Form.Group controlId='groupName'>
          <Row>
            <Col md={4}>
              <Form.Label className='f-14 hind font-weight-bold my-2'>
                Group Name
              </Form.Label>
            </Col>
            <Col md={8}>
              <Form.Control
                type='text'
                name='groupName'
                placeholder='Group Name'
                onChange={(ev) => handleChange('groupName', ev.target.value)}
                value={groupName}
              ></Form.Control>
            </Col>
          </Row>
        </Form.Group>
      </Form>

      {frequencyType && (
        <div className='py-10'>
          <h5 className='opacity-50 mb-0 f-14 font-weight-bold lh-25'>
            Frequency Settings
          </h5>
          <Form className='py-10'>
            {frequencyType === SCHEDULE_ARCHIVE_MODAL.RECURRING_TEST ? (
              <>
                <Form.Group controlId='startDate'>
                  <Row>
                    <Col md={4}>
                      <Form.Label className='f-14 hind font-weight-bold my-2'>
                        Start Date
                      </Form.Label>
                    </Col>
                    <Col md={8}>
                      <CustomDatePicker
                        date={startDate}
                        formattedDate={getFormattedDate(startDate)}
                        placeholderText='Start Date'
                        showNoPastDates='true'
                        minDate={today}
                        setDate={(value) =>
                          dispatch(
                            setFormValues({
                              startDate: getFormattedIsoString(value),
                            })
                          )
                        }
                      />
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group controlId='endDate'>
                  <Row>
                    <Col md={4}>
                      <Form.Label className='f-14 hind font-weight-bold my-2'>
                        End Date
                      </Form.Label>
                    </Col>
                    <Col md={8}>
                      <CustomDatePicker
                        date={endDate}
                        formattedDate={getFormattedDate(endDate)}
                        placeholderText='End Date'
                        showNoPastDates='true'
                        minDate={new Date(wizardForm.startDate)}
                        setDate={(value) =>
                          dispatch(
                            setFormValues({
                              endDate: getFormattedIsoString(value),
                            })
                          )
                        }
                      />
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group controlId='testDays'>
                  <Row>
                    <Col md={4}>
                      <Form.Label className='f-14 hind font-weight-bold my-2'>
                        Select Test Days
                      </Form.Label>
                    </Col>
                    <Col md={8}>
                      <div className='custom-day-checkbox d-inline-block f-12'>
                        <label>
                          <input
                            type='checkbox'
                            className='d-none'
                            onChange={handleDaysChange}
                            value='sunday'
                            checked={
                              !isEmpty(wizardForm.repeatsOn)
                                ? repeatsOn.sunday
                                : false
                            }
                          />
                          <span className='d-flex align-items-center justify-content-center'>
                            S
                          </span>
                        </label>
                      </div>
                      <div className='custom-day-checkbox d-inline-block  f-12'>
                        <label>
                          <input
                            type='checkbox'
                            className='d-none'
                            onChange={handleDaysChange}
                            value='monday'
                            checked={
                              !isEmpty(wizardForm.repeatsOn)
                                ? repeatsOn.monday
                                : false
                            }
                          />
                          <span className='d-flex align-items-center justify-content-center'>
                            M
                          </span>
                        </label>
                      </div>
                      <div className='custom-day-checkbox d-inline-block f-12'>
                        <label>
                          <input
                            type='checkbox'
                            className='d-none'
                            onChange={handleDaysChange}
                            value='tuesday'
                            checked={
                              !isEmpty(wizardForm.repeatsOn)
                                ? repeatsOn.tuesday
                                : false
                            }
                          />
                          <span className='d-flex align-items-center justify-content-center'>
                            T
                          </span>
                        </label>
                      </div>
                      <div className='custom-day-checkbox d-inline-block f-12 '>
                        <label>
                          <input
                            type='checkbox'
                            className='d-none'
                            onChange={handleDaysChange}
                            value='wednesday'
                            checked={
                              !isEmpty(wizardForm.repeatsOn)
                                ? repeatsOn.wednesday
                                : false
                            }
                          />
                          <span className='d-flex align-items-center justify-content-center'>
                            W
                          </span>
                        </label>
                      </div>
                      <div className='custom-day-checkbox d-inline-block f-12 '>
                        <label>
                          <input
                            type='checkbox'
                            className='d-none'
                            onChange={handleDaysChange}
                            value='thursday'
                            checked={
                              !isEmpty(wizardForm.repeatsOn)
                                ? repeatsOn.thursday
                                : false
                            }
                          />
                          <span className='d-flex align-items-center justify-content-center'>
                            T
                          </span>
                        </label>
                      </div>
                      <div className='custom-day-checkbox d-inline-block f-12 '>
                        <label>
                          <input
                            type='checkbox'
                            className='d-none'
                            onChange={handleDaysChange}
                            value='friday'
                            checked={
                              !isEmpty(wizardForm.repeatsOn)
                                ? repeatsOn.friday
                                : false
                            }
                          />
                          <span className='d-flex align-items-center justify-content-center'>
                            F
                          </span>
                        </label>
                      </div>
                      <div className='custom-day-checkbox d-inline-block f-12 '>
                        <label>
                          <input
                            type='checkbox'
                            className='d-none'
                            onChange={handleDaysChange}
                            value='saturday'
                            checked={
                              !isEmpty(wizardForm.repeatsOn)
                                ? repeatsOn.saturday
                                : false
                            }
                          />
                          <span className='d-flex align-items-center justify-content-center'>
                            S
                          </span>
                        </label>
                      </div>
                    </Col>
                  </Row>
                </Form.Group>
              </>
            ) : (
              <Form.Group controlId='testDate'>
                <Row>
                  <Col md={4}>
                    <Form.Label className='f-14 hind font-weight-bold my-2'>
                      Select Test Date
                    </Form.Label>
                  </Col>
                  <Col md={8}>
                    <CustomDatePicker
                      date={startDate}
                      formattedDate={convertUTCtoLocale(startDate)}
                      placeholder='Test Date'
                      minDate={today}
                      setDate={(value) =>
                        dispatch(
                          setFormValues({
                            startDate: getFormattedIsoString(value),
                          })
                        )
                      }
                    />
                  </Col>
                </Row>
              </Form.Group>
            )}

            <Form.Group controlId='time'>
              <Row>
                <Col md={4}>
                  <Form.Label className='f-14 hind font-weight-bold my-2'>
                    Select Test Time
                  </Form.Label>
                </Col>
                <Col md={8}>
                  <div className='d-flex'>
                    <TimeInput
                      time={testTime}
                      setTime={(value) => {
                        setTestTime(value)
                      }}
                    />
                    {!isValidTime && (
                      <div className='d-flex align-items-start mt-2 '>
                        <Form.Text className='f-14 hind font-weight-bold my-2 text-danger ml-25'>
                          Past Time Detected
                        </Form.Text>
                      </div>
                    )}
                  </div>
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </div>
      )}
    </div>
  )
}
export default Details
