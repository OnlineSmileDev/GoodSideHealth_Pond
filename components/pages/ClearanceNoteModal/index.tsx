import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { MultiScreenModal } from 'components/organisms/MultiScreenModal'
import {
  useUpdateVisitStationMutation,
  useUpdateVisitMutation,
  useInsertClearanceNoteMutation,
  useGetPatientFormsDataQuery,
} from 'graphql/.generated'
import { selectUserDetails } from 'src/features/Users/users.selectors'
import { NOTIFICATION_VARIANT } from 'components/atoms/Notification'
import { CLEARANCE_STATUS } from 'constants/kanbanBoard'
import { FORM_TYPES } from 'constants/forms'
import { Clearance } from './Clearance'
import { Signature } from './Signature'
import { ERRORS } from './constants'

const pages = [
  { label: 'Clearance', component: Clearance },
  { label: 'Signature', component: Signature },
]

export const ClearanceNoteModal = ({
  patientId,
  patientName,
  initialFormValues,
  onClose,
}) => {
  const user = useSelector(selectUserDetails)
  const router = useRouter()

  // ToDo: Create a new more efficient query: we don't need data and we should filter by form_type.id
  const { data: patientFormData } = useGetPatientFormsDataQuery({
    patientId: patientId || '',
    on_registration: true,
  })

  // ToDo: get rid of that after the query optimization
  const isPaperMedHistoryFormComplete = patientFormData?.form_images?.filter(
    (item) => item.type === FORM_TYPES.MEDICAL_HISTORY
  )?.length

  const isRegistrationMedHistoryFormComplete = patientFormData?.forms?.filter(
    (item) => item.form_type.id === FORM_TYPES.MEDICAL_HISTORY
  )?.length

  const isWcpMedicalHistoryComplete =
    isPaperMedHistoryFormComplete || isRegistrationMedHistoryFormComplete

  let notifications = []

  if (!isWcpMedicalHistoryComplete)
    notifications.push({
      variant: NOTIFICATION_VARIANT.WARNING,
      message: ERRORS.PAPERWORK_INCOMPLETE,
    })

  const { id: providerId, firstName, lastName, credentials } = user

  const {
    mutate: mutateVisitStation,
    isLoading: isUpdateVisitStationMutationLoading,
  } = useUpdateVisitStationMutation()

  const { mutate: mutateVisit, isLoading: isUpdateVisitMutationLoading } =
    useUpdateVisitMutation()

  const {
    mutate: insertClearanceNote,
    isLoading: isInsertClearanceNoteMutationLoading,
  } = useInsertClearanceNoteMutation()

  const handleSubmit = useCallback(
    (formValues, resetModal) => {
      const {
        id,
        sessionId,
        stationId,
        stations,
        providerFirstName,
        providerLastName,
        providerSignature,
        providerCredentials,
        selectedClearance,
        preClearanceEvaluation,
        notClearedDetails,
        notClearedReason,
        recommendation,
        isProviderCertain,
      } = formValues

      // Probably want to be able to provide an actual error message or something for this.
      if (!isProviderCertain) return
      // // TODO Pretty hacky. Find a better solution after the WCP Release.
      const handleMutateVisitStation = () =>
        mutateVisitStation(
          {
            visitId: id,
            oldStationId: stationId,
            newStationId: stations[stations.length - 1].id,
          },
          {
            onSuccess: () => {
              resetModal()
              router.push(`/session/${sessionId}`)
            },
          }
        )

      const handleMutateVisit = () =>
        mutateVisit(
          { visitId: id, objects: { status: 'Completed' } },
          { onSuccess: () => handleMutateVisitStation() }
        )

      insertClearanceNote(
        {
          input: {
            visit_id: id,
            provider_id: providerId,
            provider_first_name: providerFirstName,
            provider_last_name: providerLastName,
            provider_signature: providerSignature,
            provider_credentials: providerCredentials,
            provider_signature_date_time: new Date().toISOString(),
            clearance_status: selectedClearance,
            provider_recommendation: recommendation,
            ...(selectedClearance === CLEARANCE_STATUS.CLEARED_AFTER_EVAL && {
              pre_clearance_evaluation: preClearanceEvaluation,
            }),
            ...(selectedClearance === CLEARANCE_STATUS.NOT_CLEARED && {
              not_cleared_details: notClearedDetails,
              not_cleared_reason: notClearedReason,
            }),
          },
        },
        { onSuccess: () => handleMutateVisit() }
      )
    },
    [insertClearanceNote, mutateVisit, mutateVisitStation, providerId, router]
  )

  const isUploading =
    isUpdateVisitStationMutationLoading ||
    isUpdateVisitMutationLoading ||
    isInsertClearanceNoteMutationLoading

  return (
    <MultiScreenModal
      title='Clearance Note'
      subtitle={patientName}
      pages={pages}
      initialFormValues={{
        ...initialFormValues,
        providerFirstName: firstName,
        providerLastName: lastName,
        providerCredentials: credentials,
      }}
      handleSubmit={handleSubmit}
      onClose={() => onClose()}
      notifications={notifications}
      isLoading={isUploading}
    />
  )
}
