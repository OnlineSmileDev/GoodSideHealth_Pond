import { useCallback } from 'react'
import {
  useGetOrderMedicalAssessmentQuery,
  useCompleteOrderMedicalAssessmentMutation,
  useGetPatientFormsDataQuery,
} from 'graphql/.generated'
import { SelectedOrderType } from '../types'
import {
  MedicalAssessmentForm,
  MedicalAssessmentFormType,
  MedicalAssessmentValuesType,
} from './MedicalAssessmentForm'
import { DIAGNOSIS_RESULTS } from 'components/molecules/DiagnosticInput'
import { FORM_TITLES } from 'constants/forms'
import { ORDER_STATUS } from 'constants/orders'

const checkValue = (field): string => field || DIAGNOSIS_RESULTS.NORMAL

export type MedicalAssessmentProps = {
  selectedOrder: SelectedOrderType
  handleModalAction?: () => void
  isUploading?: boolean
}

export const MedicalAssessment = ({
  selectedOrder,
  handleModalAction,
  isUploading = false,
}: MedicalAssessmentProps) => {
  const { code, visitId, patientId } = selectedOrder

  // Should have a loading state
  const { data, isLoading: isGetOrderMedicalAssessmentPreloading } =
    useGetOrderMedicalAssessmentQuery({
      visit_id: +visitId,
      code, // visit Type
    })

  const order = data?.orders?.length ? data?.orders[0] : null
  const { id: orderId, order_medical_assessment, status } = order || {}

  const {
    appearance,
    appearance_notes,
    eyes_ears_nose_throat,
    eyes_ears_nose_throat_notes,
    lymph_nodes,
    lymph_nodes_notes,
    heart_auscultation_supine_position,
    heart_auscultation_supine_position_notes,
    heart_auscultation_standing_position,
    heart_auscultation_standing_position_notes,
    heart_lower_pulses,
    heart_lower_pulses_notes,
    pulses,
    pulses_notes,
    lungs,
    lungs_notes,
    abdomen,
    abdomen_notes,
    skin,
    skin_notes,
    marfans_stigmata,
    marfans_stigmata_notes,
    is_pupils_equal,
    signature,
  } = order_medical_assessment || {}

  const orderMedicalAssessment = {
    appearance: checkValue(appearance),
    appearance_notes,
    eyes_ears_nose_throat: checkValue(eyes_ears_nose_throat),
    eyes_ears_nose_throat_notes,
    lymph_nodes: checkValue(lymph_nodes),
    lymph_nodes_notes,
    heart_auscultation_supine_position: checkValue(
      heart_auscultation_supine_position
    ),
    heart_auscultation_supine_position_notes,
    heart_auscultation_standing_position: checkValue(
      heart_auscultation_standing_position
    ),
    heart_auscultation_standing_position_notes,
    heart_lower_pulses: checkValue(heart_lower_pulses),
    heart_lower_pulses_notes,
    pulses: checkValue(pulses),
    pulses_notes,
    lungs: checkValue(lungs),
    lungs_notes,
    abdomen: checkValue(abdomen),
    abdomen_notes,
    skin: checkValue(skin),
    skin_notes,
    marfans_stigmata: checkValue(marfans_stigmata),
    marfans_stigmata_notes,
    is_pupils_equal: is_pupils_equal === null ? true : is_pupils_equal,
    signature,
  }

  // Should have a blocking state
  const {
    mutate: mutateOrder,
    isLoading: isCompleteOrderMedicalAssessmentMutationLoading,
  } = useCompleteOrderMedicalAssessmentMutation()

  const handleOrderUpdate = useCallback(
    (
      medicalAssessmentValues: MedicalAssessmentValuesType,
      shouldBeFlagged: boolean
    ) => {
      mutateOrder(
        {
          orderId,
          ...medicalAssessmentValues,
          ...(status !== ORDER_STATUS.COMPLETE && {
            orderParams: {
              status: ORDER_STATUS.COMPLETE,
              completed_at: new Date().toISOString(),
              is_flagged: shouldBeFlagged,
            },
          }),
        },
        {
          onSuccess: () => {
            console.log(`Order ${orderId} updated!`)
            handleModalAction()
          },
        }
      )
    },
    [handleModalAction, mutateOrder, orderId, status]
  )

  const { data: formsData, isLoading: isGetPatientFormsDataPreloading } =
    useGetPatientFormsDataQuery({
      patientId,
      on_registration: true,
    })

  const formImages: MedicalAssessmentFormType[] =
    formsData?.form_images?.map(({ type, url }) => ({
      id: type,
      url,
      title: FORM_TITLES[type],
    })) || []
  const electronicForms: MedicalAssessmentFormType[] =
    formsData?.forms?.map(({ data, form_type }) => ({
      id: form_type.id,
      data,
      title: FORM_TITLES[form_type.id],
      schema: form_type.schema,
      ui_schema: form_type.ui_schema,
      localizations: form_type.form_localizations,
    })) || []

  const forms = [...formImages, ...electronicForms]

  const isPreloading =
    isGetPatientFormsDataPreloading || isGetOrderMedicalAssessmentPreloading
  return (
    <MedicalAssessmentForm
      medicalAssessmentValues={orderMedicalAssessment}
      forms={forms}
      handleFormSubmission={handleOrderUpdate}
      isUploading={
        isCompleteOrderMedicalAssessmentMutationLoading || isUploading
      }
      isPreloading={isPreloading}
    />
  )
}
