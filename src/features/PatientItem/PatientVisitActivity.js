import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { Row, Form, Col, Card, Button, Image } from 'react-bootstrap'
import { CustomDatePicker } from 'components/atoms/DatePicker'
import { Pagination } from 'components/molecules/Pagination'
import { BadgeRound, BADGE_VARIANT } from 'components/atoms/BadgeRound'
import { BUSY_INDICATOR_NAME } from 'constants/busyIndicator'
import { AT_HOME_TELEHEALTH } from 'constants/placeOfService'
import { ALL_VISIT_REASONS } from 'constants/visits'
import { getFormattedDate, getDateWithTZRanges } from 'utils/datePicker'
import { capitalizeFirstLetterOfEachWord } from 'utils/capitalizeFirstLetterOfEachWord'
import { isEmpty } from 'utils/isEmpty'
import { getFormattedTime } from 'utils/getFormattedTime'
import Icons from '../../assets/icons'
import {
  selectFilters,
  selectPatientDetails,
  selectPatientVisits,
  selectVisitCount,
} from './patientItem.selectors'
import { actions } from './patientItem.slice'
import { fetchPatientVisits } from './patientItem.asyncActions'
import {
  fetchVisitDetails,
  mockVisitReasons,
} from '../VisitItem/visitItem.asyncActions'
import { ELLIPSES_AFTER } from '../Patients/patients.constants'
import { getNamedBusyIndicator } from '../../widgets/busyIndicator/busyIndicator.selectors'
import { NAV_ITEMS } from './patientItem.constants'
import { EmptyVisitDataAfterSearch } from '../../helpers/emptyDataIndicators'
import PatientVisitActivitySkeleton from '../Skeleton/PatientVisitActivitySkeleton'

const { setFilters, resetFilters, resetPatientVisits, setPagination } = actions
const SCHEDULED_TEST_VISIT_REASON = 'Rapid SARS Antigen Test (COVID-19)'
const COVID_19_TEST = 'COVID-19 Test'

const PatientVisitActivity = ({ activeNavItem }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [dateFilter, setDateFilter] = useState(null)
  const filters = useSelector(selectFilters)
  const { id } = useSelector(selectPatientDetails)
  const patientVisits = useSelector(selectPatientVisits)
  const visitCount = useSelector(selectVisitCount)
  const isVisitsBusyIndicatorActive = useSelector(
    getNamedBusyIndicator(BUSY_INDICATOR_NAME.FETCH_PATIENT_VISITS)
  )
  const { limit, page, date, reason } = filters

  const emptyDateAndReasonFilter = !date && !reason

  const visitReason = [
    ...mockVisitReasons,
    { reason: SCHEDULED_TEST_VISIT_REASON },
    { reason: 'Other' },
  ]

  useEffect(() => {
    return () => {
      dispatch(resetFilters())
      dispatch(resetPatientVisits())
    }
  }, [dispatch])

  useEffect(() => {
    dateFilter &&
      dispatch(
        setFilters({
          date: getDateWithTZRanges(dateFilter),
        })
      )
  }, [dispatch, dateFilter])

  useEffect(() => {
    dispatch(fetchPatientVisits({ ...filters, patientId: id }))
  }, [dispatch, filters, id])

  return (
    <>
      <Row className='mb-20 align-items-center'>
        <Col md={4}>
          <h4 className='hind font-weight-bold f-18 mb-0'>
            {NAV_ITEMS[activeNavItem]}
          </h4>
        </Col>
        <Col lg={4} xl={4} className='ml-auto'>
          <Form.Group
            className='mb-3 mb-lg-0'
            data-test='patient-details-date-picker'
          >
            <CustomDatePicker
              date={dateFilter}
              formattedDate={getFormattedDate(dateFilter)}
              setDate={(value) => setDateFilter(value)}
              placeholderText='All Time'
              hasAllTimeButton={true}
              handleAllTimeButtonClick={() => {
                if (date) {
                  setDateFilter(null)
                  dispatch(setFilters({ date: null }))
                }
              }}
            />
          </Form.Group>
        </Col>
        <Col lg={3} xl={3}>
          <Form.Group className='mb-3 mb-lg-0'>
            <Form.Control
              as='select'
              placeholder={ALL_VISIT_REASONS}
              value={reason}
              onChange={(ev) =>
                dispatch(setFilters({ reason: ev.target.value }))
              }
              data-test='patient-details-visit-reason-filter'
            >
              <option value=''>{ALL_VISIT_REASONS}</option>
              {visitReason.map(({ reason }, key) => (
                <option
                  value={
                    reason === COVID_19_TEST
                      ? SCHEDULED_TEST_VISIT_REASON
                      : reason
                  }
                  key={key}
                >
                  {reason === SCHEDULED_TEST_VISIT_REASON
                    ? COVID_19_TEST
                    : reason}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      {!isEmpty(patientVisits) ? (
        <>
          {patientVisits.map((visit, key) => {
            const {
              createdAt,
              locationName,
              visitReason,
              state,
              id,
              placeOfServiceId,
            } = visit

            const isAtHomeVisit = placeOfServiceId === AT_HOME_TELEHEALTH

            return (
              <Card
                className='visit-card border-0 shadow-sm rounded-lg mb-20'
                key={id}
              >
                <Card.Body className='p-20 pl-40'>
                  <Row className='align-items-center'>
                    <Col xl={2} md={3} className='mb-4 mb-lg-0 text-lg-center'>
                      <div className='tw-flex tw-flex-row tw-items-center'>
                        {isAtHomeVisit && (
                          <div className='tw-mr-2.5'>
                            <BadgeRound variant={BADGE_VARIANT.PRIMARY}>
                              <Image
                                src={Icons.homeVisitBadge}
                                alt='home visit badge'
                                className='tw-mb-0.5'
                              />
                            </BadgeRound>
                          </div>
                        )}
                        <div>
                          <h5
                            data-test={`patient-details-visit-date-${key}`}
                            className='mb-0 f-18 font-weight-bold lh-25'
                          >
                            {getFormattedDate(createdAt)}
                          </h5>
                          <span
                            className='opacity-50 mb-0 f-14 font-weight-bold lh-25 hind'
                            data-test={`patient-details-visit-time-${key}`}
                          >
                            {getFormattedTime(createdAt)}
                          </span>
                        </div>
                      </div>
                    </Col>
                    <Col xl={8} md={6} className='mb-4 mb-lg-0'>
                      <h5
                        className='mb-0 f-18 font-weight-bold lh-25 d-flex align-items-center'
                        data-test={`patient-details-visit-reason-${key}`}
                      >
                        {visitReason === SCHEDULED_TEST_VISIT_REASON
                          ? COVID_19_TEST
                          : visitReason}
                      </h5>
                      <span className='opacity-50 mb-0 f-14 font-weight-bold lh-25 hind'>
                        {`${
                          locationName &&
                          capitalizeFirstLetterOfEachWord(locationName)
                        }
								 | ${state}`}
                      </span>
                    </Col>

                    <Col xl={2} lg={3} className='ml-auto'>
                      <Button
                        variant='light'
                        className='btn-block'
                        onClick={() => {
                          dispatch(fetchVisitDetails({ visitId: id }))
                          router.push(`/visit/${id}`)
                        }}
                        data-test={`patient-details-view-visit-button-${key}`}
                      >
                        View Visit
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            )
          })}
          <Pagination
            recordsPerPage={limit}
            totalSize={visitCount}
            paginate={(pageNumber) =>
              dispatch(setPagination({ page: pageNumber }))
            }
            currentPage={page}
            ellipses={ELLIPSES_AFTER}
          />
        </>
      ) : isVisitsBusyIndicatorActive ? (
        <PatientVisitActivitySkeleton column={3} />
      ) : (
        <>
          {emptyDateAndReasonFilter ? (
            <div className='d-flex align-items-center justify-content-center min-vh-400'>
              <h3 className='mb-0 p-25 text-center'>
                This patient has not had visits through Pond.
              </h3>
            </div>
          ) : (
            <EmptyVisitDataAfterSearch />
          )}
        </>
      )}
    </>
  )
}
export default PatientVisitActivity
