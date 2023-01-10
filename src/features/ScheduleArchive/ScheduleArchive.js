import React, { useState, useEffect } from 'react'
import { Row, Col, Card, Button, Image } from 'react-bootstrap'
import { CustomSelectInput } from 'components/molecules/CustomSelectInput'
import { CustomDatePicker } from 'components/atoms/DatePicker'
import { getDateWithTZRanges } from 'utils/datePicker'
import { dateFormatter } from 'utils/dateFormatter'
import ScheduleVisitSession from './ScheduleVisitSession'
import TestSummary from '../ScheduleArchive/TestSummary'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLocations } from '../ScreeningDataDashboard/screeningDataDashboard.asyncActions'
import { selectLocations } from '../ScreeningDataDashboard/screeningDataDashboard.selectors'
import { actions } from './scheduleArchive.slice'
import Icons from '../../assets/icons'
import {
  MILLI_SECONDS_IN_DAY,
  INCREMENT,
  DECREMENT,
} from './scheduleArchive.constants'
import { SCREENING_DEFAULT_VALUES } from '../ScreeningDataDashboard/screeningDataDashboard.constants'
import {
  selectScheduleArchiveFilters,
  selectSchedulePatients,
} from './scheduleArchive.selectors'
import {
  useFetchScheduleArchiveData,
  useFetchSchedulePatients,
} from './scheduleArchive.effects'
import { fetchScheduleArchiveData } from './scheduleArchive.asyncActions'

const { setScheduleArchiveFilters } = actions

const ScheduleArchive = () => {
  const today = new Date().toDateString()
  const [date, setDate] = useState(new Date(today))
  const locations = useSelector(selectLocations)
  const [selectedLocation, setSelectedLocation] = useState(locations)
  const filters = useSelector(selectScheduleArchiveFilters)
  const scheduledPatients = useSelector(selectSchedulePatients)
  const dispatch = useDispatch()

  const { scheduledDates } = scheduledPatients
  const options = [
    {
      id: 0,
      name: SCREENING_DEFAULT_VALUES.ALL_LOCATIONS,
      organizationId: 0,
    },
    ...locations,
  ]
  const scheduledHighlightDates =
    scheduledDates && scheduledDates.map((each) => new Date(each.date))

  useEffect(() => {
    if (locations.length === 0) {
      dispatch(fetchLocations())
    }
  }, [dispatch, locations])

  useEffect(() => {
    dispatch(setScheduleArchiveFilters({ date: getDateWithTZRanges(date) }))
  }, [dispatch, date])

  useEffect(() => {
    dispatch(fetchScheduleArchiveData(filters))
  }, [dispatch, filters])

  useFetchScheduleArchiveData(filters)
  useFetchSchedulePatients(filters)

  const selectedLocationName = selectedLocation?.name

  const handleLocationChange = (location) => {
    setSelectedLocation(location)
    const currentLocation =
      location?.name !== SCREENING_DEFAULT_VALUES.ALL_LOCATIONS
        ? location.name
        : ''
    dispatch(setScheduleArchiveFilters({ locationName: currentLocation }))
  }

  const handleClick = (value) => {
    const currentDayInMilliSeconds = new Date(date).getTime()
    if (value === INCREMENT) {
      const nextDayInMilliSeconds =
        currentDayInMilliSeconds + MILLI_SECONDS_IN_DAY
      setDate(new Date(nextDayInMilliSeconds))
    } else if (value === DECREMENT) {
      const previousDayInMilliSeconds =
        currentDayInMilliSeconds - MILLI_SECONDS_IN_DAY
      setDate(new Date(previousDayInMilliSeconds))
    }
  }

  return (
    <div className='px-15 py-15 pb-50'>
      <div className='mb-30'>
        <Row>
          <Col lg={3}>
            <div className='mb-30 TestSummary-dropdown'>
              <CustomSelectInput
                placeholder='All Locations'
                options={options}
                onChange={handleLocationChange}
                value={selectedLocationName}
                keyField='id'
                fieldsToBeDisplayed={['name']}
                showSearchBar={false}
                isScheduleArchive={true}
              />
            </div>
            <TestSummary />
          </Col>
          <Col lg={9}>
            <Card className='shadow-sm border-0 mb-30'>
              <Card.Body className='px-20 py-10 d-flex justify-content-between align-items-center'>
                <Button
                  className='btn-auto p-0'
                  variant='link'
                  onClick={() => handleClick(DECREMENT)}
                >
                  <Image src={Icons.leftIcon} alt='' height={25}></Image>
                </Button>
                <div className='Date-Picker-slider w-auto date-picker-cursor'>
                  <CustomDatePicker
                    date={date}
                    formattedDate={dateFormatter(date)}
                    readOnly={true}
                    highlightDates={scheduledHighlightDates}
                    setDate={(value) => setDate(value)}
                  />
                </div>
                <Button
                  className='btn-auto p-0'
                  variant='link'
                  onClick={() => handleClick(INCREMENT)}
                >
                  <Image src={Icons.rightIcon} alt='' height={25} />
                </Button>
              </Card.Body>
            </Card>
            <ScheduleVisitSession />
          </Col>
        </Row>
      </div>
    </div>
  )
}
export default ScheduleArchive
