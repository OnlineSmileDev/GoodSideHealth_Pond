import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LABEL_POSITIONS } from 'constants/general'
import { VISITS_STATUS } from 'constants/visits'
import {
  formatDateForApi,
  getFormattedDayIsoString,
  isPastTime,
  isFutureDate,
} from 'utils/datePicker'
import { showModal } from '../../widgets/modal'
import SelectLocation from '../RequestVisitModal/SelectLocation'
import SelectPatient from './SelectPatient'
import SelectLanguage from '../RequestVisitModal/SelectLanguage'
import Details from './Details'
import Wizard from '../../widgets/Wizard'
import { saveTestSchedule } from '../ScheduleArchive/scheduleArchive.asyncActions'
import { selectUserDetails } from '../Users'
import { actions } from '../VisitItem/visitItem.slice'

const { saveSelectedLocation } = actions
const FREQUENCY_RECURRING = 'Recurring'

const ScheduleTestModal = ({ onClose }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(showModal())
  }, [dispatch])
  const resetModal = () => {
    dispatch(saveSelectedLocation({}))
    onClose()
  }
  const user = useSelector(selectUserDetails)
  const pages = [
    { label: 'Location', component: SelectLocation },
    { label: 'Patient', component: SelectPatient, size: 'xl' },
    { label: 'Language', component: SelectLanguage },
    { label: 'Details', component: Details },
  ]

  const onFinalize = (formValues, resetWizard) => {
    const {
      location,
      language,
      testType,
      startDate,
      time,
      groupName,
      repeatsOn,
      patients,
      endDate,
      frequencyType,
      testDate,
    } = formValues

    const visits = patients.map((patient) => ({
      status: VISITS_STATUS.WAITING,
      patientId: patient.id,
      locationId: +location.id,
      organizationId: +location.organizationId,
      visitReason: 'Rapid SARS Antigen Test (COVID-19)',
      language,
      facilitatorId: user.id,
      visitMetadata: { isScheduledVisit: true },
      allergies: patient.allergies,
      medications: patient.medications,
      conditions: patient.conditions,
      lastName: patient.lastName,
      firstName: patient.firstName,
      studentId: patient?.studentId ?? '',
      birthSex: patient.birthSex,
      dateOfBirth: formatDateForApi(patient.dateOfBirth),
    }))

    const sessionData = {
      locationId: location.id,
      status: 'New',
      language: language,
      sessionType: testType,
      sessionStartDate: startDate || testDate,
      sessionTime: time,
      name: groupName,
      repeatsOn: repeatsOn,
      visits,
      frequencyType,
      facilitatorId: user.id,
      locationName: location.name,
      sessionEndDate: endDate,
    }

    if (
      frequencyType === FREQUENCY_RECURRING ||
      isFutureDate(startDate) ||
      !isPastTime(startDate, time)
    ) {
      const status = sessionData.status.toLowerCase()
      const sessionStartDate = getFormattedDayIsoString(
        sessionData.sessionStartDate
      )

      dispatch(
        saveTestSchedule({
          session: {
            ...sessionData,
            status,
            sessionStartDate,
            sessionStartDateWeekDay: new Date(sessionStartDate).getDay(),
          },
        })
      ).then(() => {
        resetWizard()
        onClose()
      })
    }
  }

  return (
    <Wizard
      pages={pages}
      onFinalize={onFinalize}
      onCancel={resetModal}
      title='Schedule Test'
      finalButtonText='Schedule Test'
      labelPosition={LABEL_POSITIONS.TOP}
      utilityClass={
        'pendo-schedule-test-modal-submit-button-test-scheduler e2e-schedule-test-modal-submit-button-test-scheduler'
      }
    />
  )
}

export default ScheduleTestModal
