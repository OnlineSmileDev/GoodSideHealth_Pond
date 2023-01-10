import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useFeatures } from 'flagged'
import { Row, Col } from 'react-bootstrap'
import PatientArchive from 'components/organisms/PatientArchive'
import { Pagination } from 'components/molecules/Pagination'
import { Button, BUTTON_VARIANT } from 'components/atoms/Button'
import { BUSY_INDICATOR_NAME } from 'constants/busyIndicator'
import { USER_ROLES } from 'constants/users'
import { isEmpty } from 'utils/isEmpty'
import { omit } from 'utils/omit'
import {
  selectPatients,
  selectPatientFilters,
  selectPatientCount,
  selectSelectedPatientModal,
} from './patients.selectors'
import { fetchPatientArchive, fetchPatientCount } from './patients.asyncActions'
import PatientSearch from './PatientSearch'
import PatientFilters from './PatientFilters'
import PatientArchiveBeforeUpdate from './PatientArchive'
import { actions } from './patients.slice'
import { SIZE_PER_PAGE, ELLIPSES_AFTER } from './patients.constants'
import { EmptyVisitDataAfterSearch } from '../../helpers/emptyDataIndicators'
import { getNamedBusyIndicator } from '../../widgets/busyIndicator'
import PatientCount from './PatientCount'
import PatientArchiveSkeletonBeforeUpdate from '../Skeleton/PatientArchiveSkeleton'
import getPatientModal from '../PatientModals'
import { PATIENT_MODALS } from '../PatientModals/patientModals.constants'
import { selectCurrentUserHasPermissions } from '../../infrastructure/userContext/userContext.selectors'
import { selectLocations } from '../ScreeningDataDashboard/screeningDataDashboard.selectors'
import RequestVisitModal from '../RequestVisitModal'

const { setPatientFilters, resetPatientFilters, setSelectedPatientModal } =
  actions

const Patients = () => {
  const patients = useSelector(selectPatients)
  const patientFilters = useSelector(selectPatientFilters)
  const selectedPatientModal = useSelector(selectSelectedPatientModal)
  const locations = useSelector(selectLocations)
  const currentUserHasPermissions = useSelector(selectCurrentUserHasPermissions)
  const isFacilitator = currentUserHasPermissions([USER_ROLES.NURSE])
  const [shouldShowRequestModal, setShouldShowRequestModal] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState({})
  const patientArchiveBusyIndicator = useSelector(
    getNamedBusyIndicator(BUSY_INDICATOR_NAME.FETCH_PATIENT_ARCHIVE)
  )

  const patientCountBusyIndicator = useSelector(
    getNamedBusyIndicator(BUSY_INDICATOR_NAME.FETCH_PATIENT_COUNT)
  )
  const dispatch = useDispatch()
  const patientCount = useSelector(selectPatientCount)
  const { shareRegistrationLink, patientSearchVisitCreation } = useFeatures()

  const {
    firstName,
    lastName,
    dateOfBirth,
    locationId,
    organizationId,
    programId,
    limit,
    page,
  } = patientFilters

  const isFilterActive =
    firstName ||
    lastName ||
    dateOfBirth ||
    locationId ||
    organizationId ||
    programId

  useEffect(() => {
    return () => dispatch(resetPatientFilters())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchPatientArchive(patientFilters))
  }, [dispatch, patientFilters])

  useEffect(() => {
    const countParam = omit(patientFilters, ['page', 'limit'])
    dispatch(fetchPatientCount(countParam))
  }, [dispatch, patientFilters])

  const paginate = (pageNumber) =>
    dispatch(setPatientFilters({ page: pageNumber, limit: SIZE_PER_PAGE }))

  return (
    <div className='px-15 py-30 pb-50 pendo-patients-search-page'>
      {shouldShowRequestModal && !isEmpty(selectedPatient) && (
        <RequestVisitModal
          onClose={() => {
            setShouldShowRequestModal(false)
            setSelectedPatient({})
          }}
          initialFormValues={selectedPatient}
        />
      )}
      {selectedPatientModal && getPatientModal(selectedPatientModal)}
      <div className='mb-30'>
        <Row>
          <Col lg={4} xl={3}>
            {shareRegistrationLink ? (
              <Button
                variant={BUTTON_VARIANT.PRIMARY}
                className='tw-my-2 tw-w-full'
                onClick={() => {
                  dispatch(
                    setSelectedPatientModal(
                      PATIENT_MODALS.SHARE_REGISTRATION_LINK
                    )
                  )
                }}
              >
                Send Registration Link
              </Button>
            ) : null}
            <PatientSearch />
            <PatientFilters />
          </Col>
          <Col lg={8} xl={9}>
            {patientArchiveBusyIndicator || patientCountBusyIndicator ? (
              patientSearchVisitCreation ? (
                <PatientArchive.Skeleton
                  columns={2}
                  // PERMISSION:- Can create visit
                  canRequestVisit={isFacilitator}
                />
              ) : (
                <PatientArchiveSkeletonBeforeUpdate columns={2} />
              )
            ) : isFilterActive && isEmpty(patients) ? (
              <EmptyVisitDataAfterSearch />
            ) : (
              <>
                {!isEmpty(patients) && (
                  <>
                    {patientCount?.count && (
                      <PatientCount count={patientCount.count} />
                    )}
                    {patientSearchVisitCreation ? (
                      <PatientArchive
                        patients={patients}
                        locations={locations}
                        // PERMISSION:- Can create visit
                        canRequestVisit={isFacilitator}
                        setSelectedPatient={(patient) => {
                          setShouldShowRequestModal(!shouldShowRequestModal)
                          setSelectedPatient(patient)
                        }}
                      />
                    ) : (
                      <PatientArchiveBeforeUpdate patients={patients} />
                    )}
                    <Pagination
                      recordsPerPage={limit}
                      totalSize={patientCount?.count}
                      paginate={paginate}
                      currentPage={page}
                      ellipses={ELLIPSES_AFTER}
                    />
                  </>
                )}
              </>
            )}
          </Col>
        </Row>
      </div>
    </div>
  )
}
export default Patients
