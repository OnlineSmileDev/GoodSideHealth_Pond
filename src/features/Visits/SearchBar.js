import React, { useState, useEffect } from 'react'
import { Row, Col, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { useFeatures } from 'flagged'
import { CustomDatePicker } from 'components/atoms/DatePicker'
import { USER_ROLES } from 'constants/users'
import { PROVIDER_VISIT_TYPE, ALL_VISIT_REASONS } from 'constants/visits'
import { getFormattedDate, getDateWithTZRanges } from 'utils/datePicker'
import { actions } from './visits.slice'
import {
  selectVisits,
  selectVisitsAndSessionFilters,
  selectSessionsFilters,
  selectProviderVisit,
} from './visits.selector'
import { selectScheduleArchiveData } from '../ScheduleArchive/scheduleArchive.selectors'
import { mockVisitReasons } from '../VisitItem/visitItem.asyncActions'
import { selectCurrentUserHasPermissions } from '../../infrastructure/userContext'

const { setVisitsFilters, setSessionsFilters, setVisitsAndSessionFilters } =
  actions
const SCHEDULED_VISIT_REASON = 'Rapid SARS Antigen Test (COVID-19)'

const SearchBar = () => {
  const today = new Date().toDateString()
  const [patientName, setPatientName] = useState('')
  const [date, setDate] = useState(new Date(today))
  const { pathname } = useRouter()
  const dispatch = useDispatch()
  const scheduledVisits = useSelector(selectScheduleArchiveData)
  const visitAndSessionFilters = useSelector(selectVisitsAndSessionFilters)
  const sessionsFilters = useSelector(selectSessionsFilters)
  const isVisitArchive = pathname === '/visits'
  const selectedVisits = useSelector(selectVisits)
  const providerVisitType = useSelector(selectProviderVisit)
  const isScheduledVisits =
    providerVisitType === PROVIDER_VISIT_TYPE.SCHEDULED_VISITS
  const { visitAndSessionArchive, visitsArchive } = useFeatures()
  const currentUserHasPermissions = useSelector(selectCurrentUserHasPermissions)
  const isProvider = currentUserHasPermissions([USER_ROLES.PROVIDER])
  const visitReasons = [
    { reason: ALL_VISIT_REASONS },
    ...mockVisitReasons,
    {
      reason: SCHEDULED_VISIT_REASON,
    },
    { reason: 'Other' },
  ]

  // PERMISSION:- Can Read sessions
  const formattedVisitReasons = isProvider
    ? visitReasons
    : visitReasons.filter(({ reason }) => reason !== SCHEDULED_VISIT_REASON)

  const getSelectOptions = (obj) => {
    return obj.map((each) => (
      <option key={each} value={each}>
        {each}
      </option>
    ))
  }

  useEffect(() => {
    date &&
      dispatch(
        !isVisitArchive && isScheduledVisits
          ? setSessionsFilters({
              date: getDateWithTZRanges(date),
            })
          : setVisitsAndSessionFilters({
              date: getDateWithTZRanges(date),
            })
      )
  }, [dispatch, isVisitArchive, isScheduledVisits, date])

  useEffect(() => {
    if (providerVisitType) {
      setPatientName('')
      setDate(new Date())
    }
  }, [providerVisitType])

  const states = selectedVisits.reduce((acc, { state }) => {
    !acc.includes(state) && acc.push(state)
    return acc
  }, [])

  const languages = selectedVisits.reduce((acc, { language }) => {
    !acc.includes(language) && acc.push(language)
    return acc
  }, [])

  const sessionStates = scheduledVisits.reduce((acc, { state }) => {
    !acc.includes(state) && acc.push(state)
    return acc
  }, [])

  const sessionLanguages = scheduledVisits.reduce((acc, { language }) => {
    !acc.includes(language) && acc.push(language)
    return acc
  }, [])

  const handlePatientFilter = (ev) => {
    const value = ev.target.value
    setPatientName(value)
    if (!value || value.length > 2)
      dispatch(
        isVisitArchive
          ? setVisitsAndSessionFilters({
              name: value,
            })
          : isScheduledVisits
          ? setSessionsFilters({ name: value })
          : setVisitsFilters({ name: value })
      )
  }

  const handleReasonsFilter = (ev) => {
    const reason = ev.target.value === ALL_VISIT_REASONS ? '' : ev.target.value
    dispatch(setVisitsAndSessionFilters({ reason: reason }))
  }

  const isMyVisits = isVisitArchive && (visitAndSessionArchive || visitsArchive)
  const searchBarId = isMyVisits ? 'my-visits-searchbar' : 'archive-searchbar'

  return (
    <Col id={searchBarId} lg={12}>
      <div className='py-30'>
        <Row>
          {isMyVisits && (
            <Col lg={4} className='mr-auto'>
              <h2 className='f-28 font-weight-bold mb-3 mb-lg-0'>My Visits</h2>
            </Col>
          )}
          <Col lg={3} xl={3}>
            <Form.Group className='mb-3 mb-lg-0'>
              <Form.Control
                className='search-control pendo-visits-sessions-archive-search e2e-visits-sessions-archive-search'
                type='text'
                value={patientName}
                placeholder={
                  isVisitArchive ? 'Search Visits by Name' : 'Search Patients'
                }
                onChange={handlePatientFilter}
              />
            </Form.Group>
          </Col>
          {/* TODO: The only way we have alternate status is if its IN PROGRESS, so we should never need to check for it, but just as a safeguard i added it, but am i being overly cautious? */}
          {!isVisitArchive && (
            <>
              <Col lg={3} xl={2}>
                <Form.Group className='mb-3 mb-lg-0 pendo-visits-sessions-archive-location-dropdown'>
                  <Form.Control
                    as='select'
                    placeholder='Search States'
                    onChange={(ev) => {
                      dispatch(
                        isScheduledVisits
                          ? setSessionsFilters({ state: ev.target.value })
                          : setVisitsFilters({ state: ev.target.value })
                      )
                    }}
                    aria-label='location'
                  >
                    <option value=''>All States</option>

                    {isScheduledVisits
                      ? getSelectOptions(sessionStates)
                      : getSelectOptions(states)}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col lg={3} xl={2}>
                <Form.Group className='mb-3 mb-lg-0 pendo-visits-sessions-archive-languages-dropdown'>
                  <Form.Control
                    as='select'
                    placeholder='Search Language'
                    onChange={(ev) =>
                      dispatch(
                        isScheduledVisits
                          ? setSessionsFilters({ language: ev.target.value })
                          : setVisitsFilters({ language: ev.target.value })
                      )
                    }
                    aria-label='language'
                  >
                    <option value=''>All Languages</option>

                    {isScheduledVisits
                      ? getSelectOptions(sessionLanguages)
                      : getSelectOptions(languages)}
                  </Form.Control>
                </Form.Group>
              </Col>
            </>
          )}
          {(isVisitArchive || isScheduledVisits) && (
            <Col
              lg={3}
              xl={3}
              className={classNames({
                'ml-auto': !isVisitArchive,
              })}
            >
              <Form.Group className='mb-3 mb-lg-0  pendo-visits-sessions-archive-date-picker'>
                <CustomDatePicker
                  date={date}
                  formattedDate={getFormattedDate(date)}
                  setDate={(value) => setDate(value)}
                  placeholderText='All Time'
                  hasAllTimeButton={true}
                  handleAllTimeButtonClick={() => {
                    if (visitAndSessionFilters.date && sessionsFilters.date) {
                      setDate(null)
                      dispatch(
                        isVisitArchive
                          ? setVisitsAndSessionFilters({ date: null })
                          : setSessionsFilters({ date: null })
                      )
                    }
                  }}
                />
              </Form.Group>
            </Col>
          )}
          {isVisitArchive && (visitAndSessionArchive || visitsArchive) && (
            <Col lg={2} xl={2}>
              <Form.Group className='mb-3 mb-lg-0 pendo-visits-sessions-archive-location-dropdown'>
                <Form.Control
                  as='select'
                  placeholder='All Visit Reasons'
                  onChange={handleReasonsFilter}
                >
                  {formattedVisitReasons.map((each) => (
                    <option key={each.reason} value={each.reason}>
                      {each.reason}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          )}
        </Row>
      </div>
    </Col>
  )
}
export default SearchBar
