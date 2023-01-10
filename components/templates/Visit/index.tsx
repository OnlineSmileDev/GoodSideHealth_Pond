import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { useFeatures } from 'flagged'
import { selectJwtToken } from 'src/infrastructure/userContext/userContext.selectors'
import { CheckoutVisitActions } from 'components/molecules/CheckoutVisitActions'
import { PatientDemographics } from 'components/molecules/PatientDemographics'
import { PrimaryCaregiver } from 'components/molecules/PrimaryCaregiver'
import { VisitDetails } from 'components/molecules/VisitDetails'
import {
  VisitStatus,
  VISIT_STATUS_INDICATOR,
} from 'components/molecules/VisitStatus'
import { useGetVisitQuery, useUpdateVisitMutation } from 'graphql/.generated'
import { Button } from 'components/atoms/Button'
import { CompleteVisitActions } from 'components/molecules/CompleteVisitActions'
import { OrderList } from 'components/organisms/OrderList'
import { ClearanceNoteModal } from 'components/pages/ClearanceNoteModal'
import {
  downloadWcpUilDischargeNote,
  downloadWcpProviderDocumentation,
} from 'utils/pdf/downloadReport'
import {
  getWcpProviderDocumentationFileName,
  getWcpUilDischargeNoteFileName,
} from 'utils/pdf/fileNames'

export const Visit = () => {
  const router = useRouter()
  const jwtToken = useSelector(selectJwtToken)
  const id = +router.query.id

  const [isDownloadingDischargeNote, setIsDownloadingDischargeNote] =
    useState(false)
  const [isDownloadingProviderDoc, setIsDownloadingProviderDoc] =
    useState(false)

  const [shouldShowModal, toggleModal] = useState({
    clearanceNote: false,
  })

  const { data, isFetched, isFetching, refetch } = useGetVisitQuery({
    id,
  })

  // for uil printing
  const { mutate: mutateVisit, isLoading: isMarkVisitPrintedLoading } =
    useUpdateVisitMutation()

  const handleMarkVisitPrinted = () =>
    mutateVisit({ visitId: id, objects: { has_uil_printed: true } })

  useEffect(() => {
    if (!isFetched && !isFetching) refetch()
  }, [isFetched, isFetching, refetch])

  // TODO Clean this up with handling loading state better
  if (isFetched) {
    const visit = data?.visits_by_pk
    const {
      allergies,
      firstName,
      lastName,
      dateOfBirth,
      createdAt,
      visitReason,
      additionalNotes,
      patientId,
      sessionId,
      orders,
      status,
      knownConditions,
      knownMedications,
      primaryLanguage,
      stationVisits: { stationId },
      session: { stations },
      location: { name: locationName },
    } = visit

    // TODO Is this the best way to get the enum type?  Seems inefficient when we can just pass the string.
    const indexOfStatus = Object.values(VISIT_STATUS_INDICATOR).indexOf(
      status as unknown as VISIT_STATUS_INDICATOR
    )
    const statusKey = Object.keys(VISIT_STATUS_INDICATOR)[indexOfStatus]

    // const {
    //   status,
    //   data: patient,
    //   error,
    //   isPreviousData,
    // } = useGetPatient(patientId)

    const wcpUilDischargeNoteFileName = getWcpUilDischargeNoteFileName({
      firstName,
      lastName,
    })
    const wcpProviderDocumentationFileName =
      getWcpProviderDocumentationFileName({ firstName, lastName })

    const initialFormValues = { id, sessionId, stationId, stations }
    const patientName = `${firstName} ${lastName}`

    const downloadDischargeNote = () =>
      downloadWcpUilDischargeNote({
        patientId,
        visitId: id,
        jwtToken,
        fileName: wcpUilDischargeNoteFileName,
        setIsDownloading: setIsDownloadingDischargeNote,
      })

    const downloadProviderDocumentation = () =>
      downloadWcpProviderDocumentation({
        patientId,
        visitId: id,
        jwtToken,
        fileName: wcpProviderDocumentationFileName,
        setIsDownloading: setIsDownloadingProviderDoc,
      })

    const downloadDischargeNoteHandler = () => {
      setIsDownloadingDischargeNote(true)
      downloadDischargeNote()
    }
    const downloadProviderDocHandler = () => {
      setIsDownloadingProviderDoc(true)
      downloadProviderDocumentation()
    }

    return (
      <>
        {shouldShowModal.clearanceNote && (
          <ClearanceNoteModal
            patientId={patientId}
            patientName={patientName}
            initialFormValues={initialFormValues}
            onClose={() => toggleModal({ clearanceNote: false })}
          />
        )}
        <div className='tw-grid tw-grid-cols-12 tw-pt-5'>
          <div className='tw-w-full tw-col-span-12 tw-order-2 tw-px-3.5 md:tw-col-span-6 md:tw-order-2 lg:tw-col-span-3 lg:tw-order-1 xl:tw-col-span-3 xl:tw-order-1'>
            <PatientDemographics
              {...{
                name: patientName,
                dateOfBirth,
                allergies,
                knownConditions,
                knownMedications,
                primaryLanguage,
              }}
            />
            <PrimaryCaregiver name={''} relationship={''} phoneNumber={''} />
            <VisitDetails
              visitDetails={{
                visitDate: createdAt,
                visitLocation: locationName,
                reasonForVisit: visitReason,
                additionalNotes: additionalNotes,
                pharmacy: {
                  name: '',
                  address: '',
                },
              }}
            />
          </div>
          <div className='tw-w-full tw-px-3.5 tw-col-span-12 tw-order-1 md:tw-col-span-12 md:tw-order-1 lg:tw-col-span-6 lg:tw-order-2 xl:tw-col-span-6 xl:tw-order-2'>
            <OrderList
              orders={orders}
              patientName={patientName}
              patientId={patientId}
            />
          </div>
          <div className=' tw-w-full tw-px-3.5 tw-col-span-12 tw-order-3 md:tw-col-span-6 md:tw-order-2 lg:tw-col-span-3 lg:tw-order-3 xl:tw-col-span-3 xl:tw-order-3'>
            {status === 'In Progress' ? (
              <>
                <CheckoutVisitActions
                  returnToSession={() => {
                    router.push(`/session/${sessionId}`)
                  }}
                  endVisit={() => {
                    toggleModal({
                      clearanceNote: true,
                    })
                  }}
                />
                {
                  //TODO temporarily add download button
                }
                <Button
                  className='tw-w-full tw-mt-2.5'
                  data-test='downloadDischargeNote'
                  data-testid='downloadDischargeNote'
                  onClick={downloadDischargeNoteHandler}
                  isLoading={isDownloadingDischargeNote}
                >
                  {isDownloadingDischargeNote ? (
                    <div>Downloading...</div>
                  ) : (
                    'Download Discharge Note'
                  )}
                </Button>

                <Button
                  className='tw-w-full tw-mt-2.5'
                  data-test='downloadProviderDocumentation'
                  data-testid='downloadProviderDocumentation'
                  onClick={downloadProviderDocHandler}
                  isLoading={isDownloadingProviderDoc}
                >
                  {isDownloadingProviderDoc ? (
                    <div>Downloading...</div>
                  ) : (
                    'Download Provider Documentation'
                  )}
                </Button>
                {
                  // end TODO
                }
              </>
            ) : (
              <CompleteVisitActions
                returnToSession={() => {
                  router.push(`/session/${sessionId}`)
                }}
                editClearanceNote={() => {
                  throw new Error('Function not implemented.')
                }}
                emailDischargeNote={() => {
                  throw new Error('Function not implemented.')
                }}
                downloadDischargeNote={downloadDischargeNote}
                downloadProviderDocumentation={downloadProviderDocumentation}
                isDownloadingProviderDoc={isDownloadingProviderDoc}
                setIsDownloadingProviderDoc={setIsDownloadingProviderDoc}
                isDownloadingDischargeNote={isDownloadingDischargeNote}
                setIsDownloadingDischargeNote={setIsDownloadingDischargeNote}
                handleMarkVisitPrinted={handleMarkVisitPrinted}
                isMarkVisitPrintedLoading={isMarkVisitPrintedLoading}
              />
            )}

            <VisitStatus status={VISIT_STATUS_INDICATOR[statusKey]} />
          </div>
        </div>
      </>
    )
  } else {
    return <h1>LOADING...</h1>
  }
}
