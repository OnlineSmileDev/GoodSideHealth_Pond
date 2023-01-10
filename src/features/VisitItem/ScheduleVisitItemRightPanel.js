import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Button, Row, Col } from 'react-bootstrap'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { BUSY_INDICATOR_NAME } from 'constants/busyIndicator'
import { VISITS_STATUS } from 'constants/visits'
import { getPdfFileName } from 'utils/getPdfFileName'
import { actions } from './visitItem.slice'
import {
  selectSelectedVisitItemModal,
  selectVisitDetails,
} from './visitItem.selectors'
import getVisitItemModals from '../visitItemModals'
import { VISIT_ITEM_MODALS } from '../visitItemModals/visitItemModal.constants'
import {
  updateVisit,
  createClinicalPDF,
} from '../VisitItem/visitItem.asyncActions'
import { getNamedBusyIndicator } from '../../widgets/busyIndicator/busyIndicator.selectors'

const { setSelectedVisitItemModal } = actions

const ScheduleVisitItemRightPanel = () => {
  const selectedVisitItemModal = useSelector(selectSelectedVisitItemModal)
  const visitDetails = useSelector(selectVisitDetails)
  const router = useRouter()
  const dispatch = useDispatch()
  const isClinicalReportDownloading = useSelector(
    getNamedBusyIndicator(BUSY_INDICATOR_NAME.CREATE_CLINICAL_REPORT)
  )

  const { visitMetadata, status } = visitDetails

  const handleClick = () => {
    if (status === VISITS_STATUS.IN_PROGRESS) {
      const updatedVisit = { status: VISITS_STATUS.WAITING }
      dispatch(updateVisit({ visitId: visitDetails.id, updatedVisit })).then(
        () => {
          router.push(`/sessions/${visitDetails.sessionId}`)
        }
      )
    } else {
      router.push(`/sessions/${visitDetails.sessionId}`)
    }
  }

  const onChangeField = (e, field) => {
    const updatedVisit = {
      visitMetadata: {
        ...visitMetadata,
        [field]: e.target.checked,
      },
    }
    dispatch(updateVisit({ visitId: visitDetails.id, updatedVisit }))
  }

  return (
    <>
      {selectedVisitItemModal && getVisitItemModals(selectedVisitItemModal)}
      {status === VISITS_STATUS.IN_PROGRESS && (
        <Button
          className={classNames(
            'pendo-session-visit-finalize-button e2e-session-visit-finalize-button mb-10 btn-block'
          )}
          variant='danger'
          onClick={() => {
            dispatch(setSelectedVisitItemModal(VISIT_ITEM_MODALS.END_VISIT))
          }}
          data-test='visit-finalize-button'
        >
          Finalize for Testing
        </Button>
      )}
      <Button
        className='mb-10 btn-block pendo-session-visit-return-button'
        variant='primary'
        onClick={handleClick}
      >
        Return to session
      </Button>
      {(status === VISITS_STATUS.COMPLETED ||
        (status === VISITS_STATUS.ENDED && visitMetadata.testReport)) && (
        <div className='mb-10 pendo-visit-discharge-note-button'>
          <Button
            className='btn-block btn btn-download'
            onClick={() => {
              dispatch(
                createClinicalPDF({
                  visitId: visitDetails.id,
                  fileName: getPdfFileName(visitDetails),
                })
              )
            }}
            disabled={isClinicalReportDownloading}
          >
            {isClinicalReportDownloading
              ? 'Downloading...'
              : 'Download Clinical Note'}
          </Button>
        </div>
      )}

      <Card className='border-0 shadow-sm mb-50'>
        <Card.Body className='px-20 py-15'>
          <div className='d-flex f-14'>
            <div className='flex-fill'>
              <strong>Visit Status</strong>
            </div>
            <div className='flex-fill'>
              <span
                className={classNames(
                  'status-sign d-inline-block rounded-circle mr-2 bg-success'
                )}
              ></span>
              <span>
                {status === VISITS_STATUS.ENDED && !visitMetadata.testReport
                  ? 'Waiting For Result'
                  : status}
              </span>
            </div>
          </div>
        </Card.Body>
      </Card>
      {(status === VISITS_STATUS.COMPLETED ||
        (status === VISITS_STATUS.ENDED && visitMetadata.testReport)) && (
        <>
          <Row className='mb-15'>
            <Col sm={5}>
              <h3 className='lh-45 f-18 font-weight-bold mb-4 mb-sm-0'>
                Your Task List
              </h3>
            </Col>
          </Row>
          <Card className='border-0 shadow-sm mb-10'>
            <Card.Body className='px-20 py-15'>
              <div className='custom-checkbox d-block mb-2'>
                <label>
                  <input
                    type='checkbox'
                    name='documentedEmr'
                    className='d-none'
                    checked={!!visitMetadata.documentedEmr}
                    onChange={(e) => onChangeField(e, 'documentedEmr')}
                  />
                  <span className='hind font-weight-bold f-14 ml-15'>
                    Visit Documented in EMR
                  </span>
                </label>
              </div>
            </Card.Body>
          </Card>
          <Card className='border-0 shadow-sm mb-10'>
            <Card.Body className='px-20 py-15'>
              <div className='custom-checkbox d-block mb-2'>
                <label>
                  <input
                    type='checkbox'
                    name='patientNotified'
                    className='d-none'
                    checked={!!visitMetadata.patientNotified}
                    onChange={(e) => onChangeField(e, 'patientNotified')}
                  />
                  <span className='hind font-weight-bold f-14 ml-15'>
                    Patient Has Been Notified
                  </span>
                  {/* {visitMetadata && visitMetadata.patientNotified && (
										<p className='hind f-14 ml-15'>
											Patient was automatically notified.
										</p>
									)} */}
                </label>
              </div>
            </Card.Body>
          </Card>
        </>
      )}
    </>
  )
}
export default ScheduleVisitItemRightPanel
