import React from 'react'
import { SCHEDULE_ARCHIVE_MODAL } from './scheduleArchiveModal.constants'
import SchedulePatientsModal from './SchedulePatientsModal'
import ScheduleTestDeleteModal from './ScheduleTestDeleteModal'
import EditScheduleTestModal from './EditScheduleTestModal'
import TestResultModal from '../TestResultModal'

const getScheduleArchiveModal = (modalName) => {
  switch (modalName) {
    case SCHEDULE_ARCHIVE_MODAL.SCHEDULE_PATIENTS_MODAL:
      return <SchedulePatientsModal />
    case SCHEDULE_ARCHIVE_MODAL.SCHEDULE_TEST_DELETE_MODAL:
      return <ScheduleTestDeleteModal />
    case SCHEDULE_ARCHIVE_MODAL.EDIT_SCHEDULE_TEST_MODAL:
      return <EditScheduleTestModal />
    case SCHEDULE_ARCHIVE_MODAL.TEST_RESULT_MODAL:
      return <TestResultModal />
    default:
      return null
  }
}

export default getScheduleArchiveModal
