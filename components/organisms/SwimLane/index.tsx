import classNames from 'classnames'
import { useState } from 'react'
import { Image } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useFeatures } from 'flagged'
import { selectJwtToken } from 'src/infrastructure/userContext/userContext.selectors'
import { STATION_CODES } from 'constants/stations'
import { StationType } from 'constants/kanbanBoard'
import Icons from 'src/assets/icons'
import { Button, BUTTON_VARIANT } from 'components/atoms/Button'
import { BadgeRound, BADGE_VARIANT } from 'components/atoms/BadgeRound'
import { VisitCard } from 'components/molecules/VisitCard'
import images from 'src/assets/images'
import {
  downloadWcpUilDischargeNote,
  downloadBulkWcpUilDischargeNotes,
  downloadBulkWcpProviderDocumentation,
} from 'utils/pdf/downloadReport'

export type SwimLaneProps = {
  station: StationType
  handleStationVisitAction: (
    visitId: number,
    patientName: string,
    patientId: string
  ) => void
  handleMovePrevStation?: (visitId: number, currentStationId: number) => void
  handleMoveNextStation?: (visitId: number, currentStationId: number) => void
  handleMarkVisitPrinted?: (visitId: number) => void
}

export const SwimLane = ({
  station,
  handleStationVisitAction,
  handleMoveNextStation,
  handleMovePrevStation,
  handleMarkVisitPrinted,
}: SwimLaneProps) => {
  const { bulkWcpDischargeDownload, bulkWcpProviderDocDownload } = useFeatures()

  const [downloadingState, setDownloadingState] = useState({
    visitsDownloading: [],
    dischargeNoteDownloading: false,
    providerNoteDownloading: false,
  })

  const downloadBulkWcpUilHandler = () => {
    setDownloadingState({
      ...downloadingState,
      dischargeNoteDownloading: true,
    })
    handleBulkDischargeNoteDownload(station.id)
  }
  const downloadBulkProviderNotesHandler = () => {
    setDownloadingState({
      ...downloadingState,
      providerNoteDownloading: true,
    })
    handleBulkProviderNoteDownload(station.id)
  }

  const handleVisitCardAction = (
    visitId: number,
    patientName: string,
    patientId: string
  ) => {
    handleStationVisitAction(visitId, patientName, patientId)
  }

  const [expand, setExpand] = useState(false)
  const visits = station?.station_visits?.map((item) => item?.visit)
  const { visit_action_name: stationVisitActionName } = station
  const jwtToken = useSelector(selectJwtToken)

  const setVisitIdDownloadState = (visitId: number, val: boolean) => {
    setDownloadingState({
      ...downloadingState,
      visitsDownloading: val
        ? Array.from(
            new Set([...downloadingState.visitsDownloading, val]).values()
          )
        : downloadingState.visitsDownloading.filter((id) => id !== visitId),
    })
    // a false value is more likely to denote a successful download attempt
    // so this is our "onSuccess"
    if (
      handleMarkVisitPrinted &&
      !val &&
      station.code === STATION_CODES.COMPLETE
    )
      handleMarkVisitPrinted(visitId)
  }

  const handlePDFDownload = (visitId, patientId, fileName) =>
    downloadWcpUilDischargeNote({
      jwtToken,
      visitId,
      patientId,
      fileName,
      setIsDownloading: setVisitIdDownloadState.bind(this, visitId),
    })

  const handleBulkDischargeNoteDownload = (stationId) =>
    downloadBulkWcpUilDischargeNotes({
      jwtToken,
      stationId,
      setIsDownloading: (val) =>
        setDownloadingState({
          ...downloadingState,
          providerNoteDownloading: val,
        }),
    })

  const handleBulkProviderNoteDownload = (stationId) =>
    downloadBulkWcpProviderDocumentation({
      jwtToken,
      stationId,
      setIsDownloading: (val) =>
        setDownloadingState({
          ...downloadingState,
          dischargeNoteDownloading: val,
        }),
    })

  return (
    <div
      className={classNames('wcp-item tw-rounded tw-shadow-sm tw-bg-light', {
        expand,
      })}
    >
      <div className='wcp-item-header tw-px-4 tw-py-4 tw-flex tw-items-center tw-justify-between'>
        <div className='tw-flex-auto tw-flex'>
          <BadgeRound variant={BADGE_VARIANT.LIGHTEST} className='tw-font-bold'>
            {station.position}
          </BadgeRound>

          <h6 className='tw-font-hind tw-text-base tw-mb-0 tw-font-bold tw-flex-auto'>
            {station.title}
          </h6>
        </div>

        <div className='tw-shrink-0 tw-grow-0 tw-flex tw-items-center tw-justify-end'>
          {bulkWcpDischargeDownload && station.code === STATION_CODES.COMPLETE && (
            <Button
              size='xs'
              variant={BUTTON_VARIANT.LIGHT}
              className='tw-rounded-full tw-px-1 tw-h-6.25 tw-w-6.25 tw-mx-1 tw-hover'
              onClick={downloadBulkWcpUilHandler}
              disabled={downloadingState.dischargeNoteDownloading}
            >
              <Image
                src={
                  downloadingState.dischargeNoteDownloading
                    ? Icons.loadingIcon
                    : images.download
                }
                alt={
                  downloadingState.dischargeNoteDownloading
                    ? 'loadingIcon'
                    : 'downloadButton'
                }
              />
            </Button>
          )}

          {bulkWcpProviderDocDownload &&
            station.code === STATION_CODES.COMPLETE && (
              <Button
                size='xs'
                variant={BUTTON_VARIANT.LIGHT}
                className='tw-rounded-full tw-px-1 tw-h-6.25 tw-w-6.25 tw-mx-1 tw-hover'
                onClick={downloadBulkProviderNotesHandler}
                disabled={downloadingState.providerNoteDownloading}
              >
                <Image
                  src={
                    downloadingState.providerNoteDownloading
                      ? Icons.loadingIcon
                      : images.download
                  }
                  alt={
                    downloadingState.providerNoteDownloading
                      ? 'loadingIcon'
                      : 'downloadButton'
                  }
                />
              </Button>
            )}

          <Button
            size='xs'
            variant={BUTTON_VARIANT.LIGHT}
            className='tw-rounded-full tw-px-1 tw-h-6.25 tw-w-6.25 tw-mx-1'
          >
            <Image src={Icons.shareIcon} alt='shareIcon' />
          </Button>

          <Button
            size='xs'
            variant={BUTTON_VARIANT.LIGHT}
            className='circle-icon tw-rounded-full tw-mx-1'
            onClick={() => setExpand(!expand)}
          >
            <div className='tw-flex tw-flex-row tw-items-center tw-justify-center'>
              <Image
                src={Icons.expand}
                alt='expand'
                className='tw-transform tw-rotate-90'
              />
            </div>
          </Button>
        </div>
      </div>

      <div className='wcp-item-body tw-p-4 custom-scroll'>
        <div className='wcp-item-body-inner' data-testid='wcp-visit-cards'>
          {visits?.map((visit) => (
            <VisitCard
              visit={visit}
              key={`visit-card-${visit.id}`}
              actionName={stationVisitActionName}
              handleAction={handleVisitCardAction}
              handleDownload={handlePDFDownload}
              handleMovePrev={
                handleMovePrevStation &&
                station.code !== STATION_CODES.REGISTRATION
                  ? (visitId) => handleMovePrevStation(visitId, station.id)
                  : undefined
              }
              handleMoveNext={
                handleMoveNextStation && station.code !== STATION_CODES.COMPLETE
                  ? (visitId) => handleMoveNextStation(visitId, station.id)
                  : undefined
              }
              isDownloadingWcpUil={downloadingState.visitsDownloading.includes(
                visit.id
              )}
              setDownloadingWcpUilForVisitId={setVisitIdDownloadState.bind(
                this,
                visit.id
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
