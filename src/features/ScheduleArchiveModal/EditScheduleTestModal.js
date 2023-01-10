import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LABEL_POSITIONS } from 'constants/general'
import { VISITS_STATUS } from 'constants/visits'
import { getFormattedDate, formatDateForApi } from 'utils/datePicker'
import { isEmpty } from 'utils/isEmpty'
import { showModal } from '../../widgets/modal'
import SelectPatient from '../ScheduleTestModal/SelectPatient'
import Details from '../ScheduleTestModal/Details'
import Wizard from '../../widgets/Wizard'
import {
  updateTestSchedule,
  fetchVisitsOfSchedule,
} from '../ScheduleArchive/scheduleArchive.asyncActions'
import { actions } from '../ScheduleArchive/scheduleArchive.slice'
import {
  selectSelectedSession,
  selectScheduledVisits,
} from '../ScheduleArchive/scheduleArchive.selectors'
import { selectUserDetails } from '../Users'
import { SCHEDULE_ARCHIVE_MODAL } from './scheduleArchiveModal.constants'

const { setScheduleArchiveModal } = actions

const EditScheduleTestModal = () => {
  const dispatch = useDispatch()
  const selectedSession = useSelector(selectSelectedSession)
  const resetModal = () => dispatch(setScheduleArchiveModal(null))

  const user = useSelector(selectUserDetails)

  const visits = useSelector(selectScheduledVisits(selectedSession.id))

  useEffect(() => {
    if (isEmpty(visits)) {
      dispatch(fetchVisitsOfSchedule(selectedSession.id))
    }
    dispatch(showModal())
  }, [dispatch, selectedSession.id, visits])

  const pages = [
    // Disabled the SelectPatient screen for now, comment out the the commented code for edit visits
    { label: 'Patient', component: SelectPatient, size: 'xl' },
    { label: 'Details', component: Details },
  ]

  const onFinalize = (formValues, resetWizard) => {
    const {
      status,
      testType,
      startDate,
      time,
      groupName,
      repeatsOn,
      patients,
      frequencyType,
      locationName,
      //	testDate,
      locationId,
      organizationId,
      id,
    } = formValues

    const visits = patients.map((patient) => ({
      status: patient.status || VISITS_STATUS.WAITING,
      patientId: patient.patientId || patient.id,
      birthSex: patient.birthSex,
      dateOfBirth: formatDateForApi(patient.dateOfBirth),
      firstName: patient.firstName,
      lastName: patient.lastName,
      studentId: patient?.studentId ?? '',
      visitReason: 'Rapid SARS Antigen Test (COVID-19)',
      locationId: patient.locationId || locationId,
      organizationId: +(patient.organizationId || organizationId),
      language: patient.language || selectedSession.language,
      facilitatorId: user.id,
      visitMetadata: patient.visitMetadata || { isScheduledVisit: true },
      allergies: patient.allergies,
      medications: patient.medications,
      conditions: patient.conditions,
      sessionId: selectedSession.id,
    }))

    const sessionData = {
      sessionId: id,
      repeatsOn: repeatsOn,
      sessionStartDateWeekDay: new Date(startDate).getDay(),
      status,
      sessionType: testType,
      sessionStartDate:
        frequencyType === SCHEDULE_ARCHIVE_MODAL.RECURRING_TEST
          ? selectedSession.sessionStartDate
          : startDate,
      sessionTime: time,
      name: groupName,
      visits,
      frequencyType,
      facilitatorId: user.id,
      locationId: locationId,
      locationName,
      language: selectedSession.language,
    }

    dispatch(
      updateTestSchedule({
        appointmentId: selectedSession.appointmentId,
        updatedSession: sessionData,
      })
    ).then(() => {
      resetModal()
      resetWizard()
    })
  }

  const getFormattedName = (patient) =>
    `${patient.firstName} ${patient.lastName}`

  const formattedPatients =
    !isEmpty(visits) &&
    visits.map((patient) => ({
      ...patient,
      name: getFormattedName(patient),
      dateOfBirth: getFormattedDate(patient.dateOfBirth),
      id: patient.patientId,
    }))

  const getInitialFormValues = () => {
    if (selectedSession && !isEmpty(visits)) {
      const {
        status,
        sessionType,
        appointmentStartDate,
        sessionTime,
        name,
        repeatsOn,
        frequencyType,
        locationName,
        sessionStartDate,
        sessionEndDate,
        locationId,
        organizationId,
        id,
      } = selectedSession
      return {
        status,
        testType: sessionType,
        startDate:
          frequencyType === SCHEDULE_ARCHIVE_MODAL.RECURRING_TEST
            ? appointmentStartDate
            : sessionStartDate,
        time: sessionTime,
        groupName: name,
        repeatsOn: repeatsOn,
        patients: formattedPatients,
        frequencyType: frequencyType,
        locationName,
        endDate: sessionEndDate,
        locationId,
        organizationId,
        id,
      }
    } else return {}
  }

  return (
    <Wizard
      pages={pages}
      onFinalize={onFinalize}
      onCancel={resetModal}
      title='Edit Schedule Test'
      finalButtonText='Save'
      labelPosition={LABEL_POSITIONS.TOP}
      initialFormData={getInitialFormValues()}
    />
  )
}

export default EditScheduleTestModal
