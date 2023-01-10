import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Button } from 'react-bootstrap'
import moment from 'moment'
import classNames from 'classnames'
import { useFeatures } from 'flagged'
import { BUSY_INDICATOR_NAME } from 'constants/busyIndicator'
import { AT_HOME_TELEHEALTH } from 'constants/placeOfService'
import { USER_ROLES } from 'constants/users'
import { getPdfFileName } from 'utils/getPdfFileName'
import { VISITS_STATUS } from 'constants/visits'
import { actions } from './visitItem.slice'
import {
  selectSelectedVisitItemModal,
  selectSelectedDischargeNoteModal,
} from './visitItem.selectors'
import getVisitItemModals from '../visitItemModals'
import { VISIT_ITEM_MODALS } from '../visitItemModals/visitItemModal.constants'
import { selectCurrentUserHasPermissions } from '../../infrastructure/userContext'
import getDischargeNoteModal from '../DischargeNoteModal'
import { DISCHARGE_NOTE_MODAL } from '../DischargeNoteModal/dischargeNoteModal.constants'
import { createDischargePDF } from './visitItem.asyncActions'
import { getNamedBusyIndicator } from '../../widgets/busyIndicator/busyIndicator.selectors'
import ChatBox from './ChatBox'

const { setSelectedVisitItemModal, setSelectedDischargeNoteModal } = actions
const VisitItemRightPanel = ({ visit }) => {
  const selectedVisitItemModal = useSelector(selectSelectedVisitItemModal)
  const selectedDischargeNoteModal = useSelector(
    selectSelectedDischargeNoteModal
  )
  const currentUserHasPermissions = useSelector(selectCurrentUserHasPermissions)
  const { PROVIDER, NURSE } = USER_ROLES
  const isProvider = currentUserHasPermissions([PROVIDER])
  const chatTitle = 'Message the ' + (isProvider ? NURSE : PROVIDER)
  const isDischargeReportDownloading = useSelector(
    getNamedBusyIndicator(BUSY_INDICATOR_NAME.CREATE_DISCHARGE_REPORT)
  )
  const { id, status, discharge, placeOfServiceId } = visit
  const isAtHomeVisit = placeOfServiceId === AT_HOME_TELEHEALTH

  // TODO: Replace role check with extraction of role and using it to fetch role specific values like we did for session logs
  const dischargedByNurse = discharge?.facilitatorSignatureDateTime
  const dischargedByProvider = discharge?.providerSignatureDateTime

  const isVisitSessionCompleted = isProvider
    ? dischargedByProvider
    : dischargedByNurse

  const isDischargeReady = isAtHomeVisit
    ? dischargedByProvider
    : // Default: At School On-Demand Visit
      dischargedByProvider && dischargedByNurse

  const dispatch = useDispatch()

  const { visitChat } = useFeatures()

  useEffect(() => {
    if (status === VISITS_STATUS.ENDED && !isVisitSessionCompleted) {
      dispatch(
        //PERMISSION:- Can End Visit.
        setSelectedDischargeNoteModal(
          isProvider
            ? DISCHARGE_NOTE_MODAL.PROVIDER
            : DISCHARGE_NOTE_MODAL.NURSE
        )
      )
    }
  }, [status, dispatch, isProvider, isVisitSessionCompleted])

  const getVisitItemActivityButtons = () => {
    switch (status) {
      case VISITS_STATUS.IN_PROGRESS:
        return (
          // PERMISSION:- Can End Visit.
          isProvider && (
            <>
              <Button
                id='end-visit-button'
                className='mb-2 btn-block pendo-end-visit-button'
                variant='danger'
                onClick={() => {
                  dispatch(
                    setSelectedVisitItemModal(VISIT_ITEM_MODALS.END_VISIT)
                  )
                }}
              >
                End Visit
              </Button>

              <Button
                id='release-visit-button'
                className='mb-2 btn-block pendo-release-visit-button'
                variant='warning'
                onClick={() => {
                  dispatch(
                    setSelectedVisitItemModal(VISIT_ITEM_MODALS.RELEASE_VISIT)
                  )
                }}
              >
                Release Visit
              </Button>
            </>
          )
        )
      case VISITS_STATUS.ENDED:
      case VISITS_STATUS.COMPLETED:
        return (
          <>
            {isVisitSessionCompleted && (
              <Button
                id='edit-discharge-note-button'
                className='mb-2 btn-block pendo-edit-discharge-button'
                variant='warning'
                onClick={() =>
                  // PERMISSION:- Can Edit Discharge.
                  dispatch(
                    setSelectedDischargeNoteModal(
                      isProvider
                        ? DISCHARGE_NOTE_MODAL.PROVIDER
                        : DISCHARGE_NOTE_MODAL.NURSE
                    )
                  )
                }
              >
                Edit Discharge Note
              </Button>
            )}

            {isDischargeReady && (
              <div className='mb-30'>
                <Button
                  id='download-discharge-note-button'
                  className='mb-2 btn-block'
                  variant='primary'
                  onClick={() => {
                    dispatch(
                      createDischargePDF({
                        visitId: id,
                        fileName: getPdfFileName(visit),
                        // For PDF generation on the server-side, It's better to handle it as per the client-side TimeZone.
                        // As accessing pond-app from timezone other Austin, Texas can happen very frequently in future.
                        timeZoneOffset: moment().format('Z'),
                      })
                    )
                  }}
                  disabled={isDischargeReportDownloading}
                >
                  {isDischargeReportDownloading
                    ? 'Downloading...'
                    : 'Download Discharge Note'}
                </Button>
              </div>
            )}
          </>
        )
      case VISITS_STATUS.WAITING:
        return (
          <>
            <Button
              id='cancel-visit-request-button'
              className='mb-2 btn-block'
              variant='danger'
              onClick={() =>
                dispatch(
                  setSelectedVisitItemModal(VISIT_ITEM_MODALS.CANCEL_VISIT)
                )
              }
            >
              Cancel Visit Request
            </Button>
          </>
        )
      default:
        return null
    }
  }

  return (
    <>
      {getVisitItemActivityButtons()}

      {selectedVisitItemModal && getVisitItemModals(selectedVisitItemModal)}
      {selectedDischargeNoteModal &&
        getDischargeNoteModal(selectedDischargeNoteModal)}

      <Card className='border-0 shadow-sm mb-30 mt-30'>
        <Card.Body className='px-20 py-15'>
          <div className='d-flex f-14'>
            <div className='flex-fill'>
              <strong>Visit Status</strong>
            </div>

            <div className='flex-fill'>
              <span
                className={classNames(
                  'status-sign d-inline-block rounded-circle mr-2',
                  {
                    'bg-success': status === VISITS_STATUS.IN_PROGRESS,
                    'bg-primary': status === VISITS_STATUS.COMPLETED,
                    'bg-warning': status === VISITS_STATUS.WAITING,
                  }
                )}
              ></span>

              <span>{status}</span>
            </div>
          </div>
        </Card.Body>
      </Card>

      {visitChat && status === VISITS_STATUS.IN_PROGRESS && (
        <ChatBox title={chatTitle} />
      )}
    </>
  )
}
export default VisitItemRightPanel
