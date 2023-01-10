import { Image } from 'react-bootstrap'
import { Button, BUTTON_VARIANT } from 'components/atoms/Button'
// import { StationsIndicator } from 'components/molecules/StationsIndicator'
import { getFormattedDate } from 'utils/datePicker'
import images from 'src/assets/images'
import { getWcpUilDischargeNoteFileName } from 'utils/pdf/fileNames'
import Icons from 'src/assets/icons'
import classNames from 'classnames'

interface visitType {
  id: number
  first_name?: string
  last_name?: string
  date_of_birth?: string
  student_id?: string
  patient_id?: string
  has_uil_printed: boolean
}

// TODO: Add type Interface for a visit when schema for wcp visits will finalize.
export type VisitCardProps = {
  visit: visitType
  actionName?: string
  handleAction?: (
    visitId: number,
    patientName: string,
    patientId: string
  ) => void
  handleDownload?: (
    visitId: number,
    patientId: string,
    fileName: string
  ) => void
  handleMoveNext?: (visitId: number) => void
  handleMovePrev?: (visitId: number) => void
  isDownloadingWcpUil: boolean
  setDownloadingWcpUilForVisitId: (value: boolean | number) => void
}

export const VisitCard = ({
  actionName,
  visit,
  handleAction,
  handleDownload,
  handleMovePrev,
  handleMoveNext,
  isDownloadingWcpUil,
  setDownloadingWcpUilForVisitId,
}: VisitCardProps) => {
  const DEFAULT_ACTION_NAME = 'Complete Order'

  const downloadDischargeNoteHandler = () => {
    handleDownload(visitId, patientId, wcpUilDischargeNoteFileName)
    setDownloadingWcpUilForVisitId(visit.id)
  }

  const {
    id: visitId,
    first_name: firstName,
    last_name: lastName,
    date_of_birth: dateOfBirth,
    patient_id: patientId,
    has_uil_printed: hasUilPrinted,
  } = visit

  const patientName = `${firstName} ${lastName}`

  const wcpUilDischargeNoteFileName = getWcpUilDischargeNoteFileName({
    firstName,
    lastName,
  })

  // const stationProgress = { stations, visit }
  return (
    <div
      className={classNames(
        'wcp-card tw-bg-light-lightest tw-p-3.5 tw-mb-3.5',
        { 'tw-bg-pondBlueBgOverlay': hasUilPrinted }
      )}
    >
      <div className='tw-flex tw-items-center tw-justify-between'>
        <h6
          className={classNames(
            'tw-flex-auto tw-font-hind tw-text-sm tw-font-bold tw-mb-1',
            { 'tw-text-white': hasUilPrinted }
          )}
        >
          {patientName}
        </h6>

        <div className='tw-shrink-0 tw-grow-0 tw-flex tw-justify-end tw-items-center'>
          <Button
            className='tw-h-4 tw-w-4 tw-hover'
            size='xs'
            variant={BUTTON_VARIANT.LIGHTEST}
            onClick={downloadDischargeNoteHandler}
            disabled={isDownloadingWcpUil}
          >
            <Image
              src={isDownloadingWcpUil ? Icons.loadingIcon : images.download}
              alt={isDownloadingWcpUil ? 'loadingIcon' : 'downloadButton'}
              className='tw-w-4 tw-h-4'
            />
          </Button>

          {handleMovePrev && (
            <Button
              className='tw-h-4 tw-w-4 tw-hover'
              size='xs'
              variant={BUTTON_VARIANT.LIGHTEST}
              onClick={() => handleMovePrev(visitId)}
            >
              <Image
                src={Icons.shareIcon}
                alt='shareIcon'
                style={{ transform: 'scale(-1,1)' }}
                className='tw-h-4 tw-w-4'
              />
            </Button>
          )}

          {handleMoveNext && (
            <Button
              className='tw-h-4 tw-w-4 tw-hover'
              size='xs'
              variant={BUTTON_VARIANT.LIGHTEST}
              onClick={() => handleMoveNext(visitId)}
            >
              <Image
                src={Icons.shareIcon}
                alt='shareIcon'
                className='tw-h-4 tw-w-4'
              />
            </Button>
          )}
        </div>
      </div>

      <span
        className={classNames(
          'tw-font-hind tw-text-sm tw-mb-1 tw-opacity-50 tw-block',
          { 'tw-text-white': hasUilPrinted }
        )}
      >
        DoB {getFormattedDate(dateOfBirth)} | ID #{visitId}
      </span>

      <Button
        variant={BUTTON_VARIANT.LIGHT}
        className='tw-w-full tw-mb-4 tw-h-7.5'
        onClick={() => handleAction(visitId, patientName, patientId)}
      >
        {actionName || DEFAULT_ACTION_NAME}
      </Button>

      {/* ToDo: Use Stations Progress indicator */}
    </div>
  )
}
