import { useState, useCallback } from 'react'
import { useFeatures } from 'flagged'
import { ORDERS } from 'constants/orders'
import { HeightAndWeightSummary } from 'components/molecules/HeightAndWeightSummary'
import { VisionSummary } from 'components/molecules/VisionSummary'
import { MusculoskeletalSummary } from 'components/molecules/MusculoskeletalSummary'
import { MedicalAssessmentSummary } from 'components/molecules/MedicalAssessmentSummary'
import { PHQ9Summary } from 'components/molecules/PHQ9Summary'
import { TobaccoScreenerSummary } from 'components/molecules/TobaccoScreenerSummary'
import { ProviderDocumentationSummary } from 'components/molecules/ProviderDocumentationSummary'
import { Modal, MODAL_SIZE, CONTAINER_WIDTH } from 'components/organisms/Modal'
import { HeightAndWeightForm } from 'components/pages/WcpBoard/OrderModal/HeightAndWeight/HeightAndWeightForm'
import { MusculoskeletalForm } from 'components/pages/WcpBoard/OrderModal/Musculoskeletal/MusculoskeletalForm'
import {
  MedicalAssessmentForm,
  MedicalAssessmentFormType,
} from 'components/pages/WcpBoard/OrderModal/MedicalAssessment/MedicalAssessmentForm'
import { VisionForm } from 'components/pages/WcpBoard/OrderModal/Vision/VisionForm'
import { ScreenerPhqForm } from 'components/pages/WcpBoard/OrderModal/Screeners/ScreenerPhq'
import { Tobacco } from 'components/pages/WcpBoard/OrderModal/Tobacco'
import { MedicalHistorySummary } from 'components/molecules/MedicalHistorySummary'
import { ProviderDocumentation } from 'components/pages/WcpBoard/OrderModal/ProviderDocumentation'
import { UploadPaperwork } from 'components/pages/WcpBoard/OrderModal/Registration/UploadPaperwork'
import { MedicalHistory } from 'components/organisms/MedicalHistory'
import { ORDER_STATUS } from 'constants/orders'
import {
  useGetOrderFormResultsQuery,
  useCompleteOrderHeightAndWeightMutation,
  useCompleteOrderMedicalAssessmentMutation,
  useCompleteOrderMusculoskeletalMutation,
  useCompleteOrderVisionMutation,
  useGetOrderByPkQuery,
  useCompleteOrderFormMutation,
  useUpdateOrderFollowUpInstructionsMutation,
  useGetPatientFormsDataQuery,
} from 'graphql/.generated'
import { FORM_TITLES, FORM_TYPES } from 'constants/forms'

export type OrderListProps = {
  orders: any[]
  patientId: string
  patientName: string
}

type OrderProps = {
  order: any
  patientId: string
  patientName: string
}

const FORM_ACTION = {
  EDIT: 'edit',
  VIEW: 'view',
}

const Order = ({ order, patientName, patientId }: OrderProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [selectedModal, setSelectedModal] = useState<string>(undefined)

  const closeModal = () => setIsModalOpen(false)
  const openEditModal = () => {
    setSelectedModal(FORM_ACTION.EDIT)
    setIsModalOpen(true)
  }
  const openViewModal = () => {
    setSelectedModal(FORM_ACTION.VIEW)
    setIsModalOpen(true)
  }

  const { providerDocumentationOrder } = useFeatures()

  const {
    id: orderId,
    orderType: { category, name, form_type_id },
    completed_at,
    follow_up_instructions,
  } = order

  // query for orders that have their own table
  const {
    data,
    refetch: queryOrderResults,
    isLoading: isGetOrderByPkPreloading,
  } = useGetOrderByPkQuery({ order_id: orderId }, { enabled: false })

  const {
    order_height_and_weight,
    order_medical_assessment,
    order_musculoskeletal,
    order_vision,
  } = data?.orders_by_pk || {}

  // query for orders that are built using json form schema
  // TODO: forms table only allows one form per use (primary key = patientID + form_type_id)
  // Need to revisit that implementation and this.
  const {
    data: orderFormResultsData,
    refetch: queryOrderFormResults,
    isLoading: isGetOrderFormResultsPreloading,
  } = useGetOrderFormResultsQuery(
    {
      order_id: orderId,
      patient_id: patientId,
      form_type: form_type_id,
    },
    { enabled: false }
  )

  // query for covid and med history form data if the orders are present
  const { data: formsData, isLoading: isFormLoading } =
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

  const {
    form_types = [],
    form_localizations = [],
    form,
  } = orderFormResultsData || {}
  const { schema, ui_schema } = form_types[0] || {}
  const { data: formValues, updated_at } = form || {}

  // Would prefer to simply update the cache but this seemed the quickest and least expensive route
  let status =
    orderFormResultsData?.orders_by_pk?.status ||
    data?.orders_by_pk?.status ||
    order.status

  let isFlagged =
    orderFormResultsData?.orders_by_pk?.is_flagged ||
    data?.orders_by_pk?.is_flagged ||
    order.is_flagged

  // Should have a blocking state
  const {
    mutateAsync: mutateHeightAndWeightOrder,
    isLoading: isCompleteOrderHeightAndWeightMutationLoading,
  } = useCompleteOrderHeightAndWeightMutation()
  const {
    mutateAsync: mutateMedicalAssessmentOrder,
    isLoading: isCompleteOrderMedicalAssessmentMutationLoading,
  } = useCompleteOrderMedicalAssessmentMutation()
  const {
    mutateAsync: mutateMusculoskeletalOrder,
    isLoading: isCompleteOrderMusculoskeletalMutationLoading,
  } = useCompleteOrderMusculoskeletalMutation()
  const {
    mutateAsync: mutateVisionOrder,
    isLoading: isCompleteOrderVisionMutationLoading,
  } = useCompleteOrderVisionMutation()
  const {
    mutateAsync: mutateFormOrder,
    isLoading: isInsertOrderFormMutationLoading,
  } = useCompleteOrderFormMutation()
  const { mutateAsync: mutateFollowUpInstructions } =
    useUpdateOrderFollowUpInstructionsMutation()

  const handleSaveInstructions = (instructions) => {
    mutateFollowUpInstructions(
      { id: orderId, instructions },
      {
        onSuccess: () => {
          console.log(`Order ${orderId} Follow-up Instructions updated`)
        },
      }
    )
  }

  const queryResults = () => {
    queryOrderResults()
  }

  const onMutationSuccess = useCallback(() => {
    console.log(`Order ${orderId} updated!`)
    form_type_id ? queryOrderFormResults() : queryOrderResults()
    closeModal()
  }, [form_type_id, orderId, queryOrderFormResults, queryOrderResults])

  const handleOrderUpdate = useCallback(
    (valuesToSubmit, shouldBeFlagged: boolean = false) => {
      const { id, ...submittedValues } = valuesToSubmit
      delete submittedValues.updated_at

      const baseOrderParams = {
        orderId,
        orderParams: {
          is_flagged: shouldBeFlagged,
          ...(status !== ORDER_STATUS.COMPLETE && {
            status: ORDER_STATUS.COMPLETE,
            completed_at: new Date().toISOString(),
          }),
        },
      }

      switch (category) {
        case ORDERS.HEIGHT_AND_WEIGHT:
          mutateHeightAndWeightOrder(
            { ...baseOrderParams, ...submittedValues },
            {
              onSuccess: onMutationSuccess,
            }
          )
          break
        case ORDERS.VISION:
          mutateVisionOrder(
            { ...baseOrderParams, ...submittedValues },
            {
              onSuccess: onMutationSuccess,
            }
          )
          break
        case ORDERS.MUSCULOSKELETAL:
          mutateMusculoskeletalOrder(
            { ...baseOrderParams, ...submittedValues },
            {
              onSuccess: onMutationSuccess,
            }
          )
          break
        case ORDERS.MEDICAL_ASSESSMENT:
          mutateMedicalAssessmentOrder(
            { ...baseOrderParams, ...submittedValues },
            {
              onSuccess: onMutationSuccess,
            }
          )
          break
        case ORDERS.SCREENINGS:
        case ORDERS.ASSESSMENT_TOBACCO:
        case ORDERS.PROVIDER_DOCUMENTATION:
        case ORDERS.MEDHISTORY:
        case ORDERS.COVID:
          mutateFormOrder(
            {
              ...baseOrderParams,
              ...submittedValues,
            },
            {
              onSuccess: onMutationSuccess,
            }
          )
          break
        default:
      }
    },
    [
      category,
      mutateHeightAndWeightOrder,
      orderId,
      onMutationSuccess,
      mutateVisionOrder,
      mutateMusculoskeletalOrder,
      mutateMedicalAssessmentOrder,
      mutateFormOrder,
      status,
    ]
  )

  const medhistoryForm = forms.filter(
    (form) => form.id == FORM_TYPES.MEDICAL_HISTORY
  )[0]
  const covidForm = forms.filter((form) => form.id == FORM_TYPES.COVID)[0]

  const getForm = () => {
    const isReadOnly = selectedModal !== FORM_ACTION.EDIT
    const handleFormAction = isReadOnly ? closeModal : handleOrderUpdate

    switch (category) {
      case ORDERS.HEIGHT_AND_WEIGHT:
        return (
          <HeightAndWeightForm
            heightAndWeightValues={order_height_and_weight}
            handleFormSubmission={handleOrderUpdate}
            isPreloading={isGetOrderByPkPreloading}
            isUploading={isCompleteOrderHeightAndWeightMutationLoading}
          />
        )
      case ORDERS.VISION:
        return (
          <VisionForm
            visionFormValues={order_vision}
            handleFormSubmission={handleOrderUpdate}
            isPreloading={isGetOrderByPkPreloading}
            isUploading={isCompleteOrderVisionMutationLoading}
          />
        )
      case ORDERS.MUSCULOSKELETAL:
        return (
          <MusculoskeletalForm
            musculoskeletalValues={order_musculoskeletal}
            handleFormSubmission={handleOrderUpdate}
            isPreloading={isGetOrderByPkPreloading}
            isUploading={isCompleteOrderMusculoskeletalMutationLoading}
          />
        )
      case ORDERS.MEDICAL_ASSESSMENT:
        return (
          <MedicalAssessmentForm
            patientId={patientId}
            medicalAssessmentValues={order_medical_assessment}
            handleFormSubmission={handleOrderUpdate}
            isPreloading={isGetOrderByPkPreloading}
            isUploading={isCompleteOrderMedicalAssessmentMutationLoading}
          />
        )
      case ORDERS.SCREENINGS:
        return (
          <ScreenerPhqForm
            phqFormValues={formValues}
            completed_at={completed_at}
            handleFormAction={handleFormAction}
            schema={schema}
            uiSchema={ui_schema}
            localization={form_localizations[0]?.dictionary}
            disabled={isReadOnly}
            isPreloading={isGetOrderFormResultsPreloading}
            isUploading={isInsertOrderFormMutationLoading}
          />
        )
      case ORDERS.ASSESSMENT_TOBACCO:
        return (
          <Tobacco
            tobaccoFormValues={formValues}
            handleFormAction={handleFormAction}
            handleClose={closeModal}
            schema={schema}
            uiSchema={ui_schema}
            localization={form_localizations[0]?.dictionary}
            disabled={isReadOnly}
            isPreloading={isGetOrderFormResultsPreloading}
            isUploading={isInsertOrderFormMutationLoading}
          />
        )
      case ORDERS.PROVIDER_DOCUMENTATION:
        return (
          <ProviderDocumentation
            providerDocumentationFormValues={formValues}
            handleFormAction={handleFormAction}
            handleClose={closeModal}
            schema={schema}
            uiSchema={ui_schema}
            localization={form_localizations[0]?.dictionary}
            disabled={isReadOnly}
            isPreloading={isGetOrderFormResultsPreloading}
            isUploading={isInsertOrderFormMutationLoading}
          />
        )
      case ORDERS.MEDHISTORY:
      case ORDERS.COVID:
        return form_type_id === FORM_TYPES.MEDICAL_HISTORY ? (
          medhistoryForm?.url ? (
            <MedicalHistory
              url={medhistoryForm.url}
              data={medhistoryForm.data}
              handleFormAction={handleFormAction}
              handleClose={closeModal}
              schema={medhistoryForm.schema}
              uiSchema={medhistoryForm.ui_schema}
              localization={form_localizations[0]?.dictionary}
              disabled={isReadOnly}
              isPreloading={isGetOrderFormResultsPreloading}
              isUploading={isInsertOrderFormMutationLoading}
            />
          ) : (
            <UploadPaperwork
              key={`${patientId}-${FORM_TYPES.MEDICAL_HISTORY}`}
              patientId={patientId}
              formType={FORM_TYPES.MEDICAL_HISTORY}
              name={FORM_TITLES.medhistory}
              handleAction={closeModal}
            />
          )
        ) : covidForm?.url ? (
          <MedicalHistory
            url={covidForm.url}
            data={covidForm.data}
            handleFormAction={handleFormAction}
            handleClose={closeModal}
            schema={covidForm.schema}
            uiSchema={covidForm.ui_schema}
            localization={form_localizations[0]?.dictionary}
            disabled={isReadOnly}
            isPreloading={isGetOrderFormResultsPreloading}
            isUploading={isInsertOrderFormMutationLoading}
          />
        ) : (
          <UploadPaperwork
            key={`${patientId}-${FORM_TYPES.COVID}`}
            patientId={patientId}
            formType={FORM_TYPES.COVID}
            name={FORM_TITLES.covid}
            handleAction={closeModal}
          />
        )
      default:
        break
    }
  }

  const getOrderSummary = () => {
    switch (category) {
      case ORDERS.HEIGHT_AND_WEIGHT:
        return (
          <HeightAndWeightSummary
            key={category}
            heightAndWeightValues={order_height_and_weight}
            status={status}
            handleSaveInstructions={handleSaveInstructions}
            followUpInstructions={follow_up_instructions}
            isFlagged={isFlagged}
            handleCardOpen={queryResults}
            openEditModal={openEditModal}
            isPreloading={isGetOrderByPkPreloading}
          />
        )
      case ORDERS.VISION:
        return (
          <VisionSummary
            key={category}
            visionValues={order_vision}
            status={status}
            handleSaveInstructions={handleSaveInstructions}
            followUpInstructions={follow_up_instructions}
            isFlagged={isFlagged}
            handleCardOpen={queryResults}
            openEditModal={openEditModal}
            isPreloading={isGetOrderByPkPreloading}
          />
        )
      case ORDERS.MUSCULOSKELETAL:
        return (
          <MusculoskeletalSummary
            key={category}
            musculoskeletalValues={order_musculoskeletal}
            followUpInstructions={follow_up_instructions}
            status={status}
            handleSaveInstructions={handleSaveInstructions}
            isFlagged={isFlagged}
            handleCardOpen={queryResults}
            openEditModal={openEditModal}
            isPreloading={isGetOrderByPkPreloading}
          />
        )
      case ORDERS.MEDICAL_ASSESSMENT:
        return (
          <MedicalAssessmentSummary
            key={category}
            medicalAssessmentValues={order_medical_assessment}
            followUpInstructions={follow_up_instructions}
            status={status}
            handleSaveInstructions={handleSaveInstructions}
            isFlagged={isFlagged}
            handleCardOpen={queryResults}
            openEditModal={openEditModal}
            isPreloading={isGetOrderByPkPreloading}
          />
        )
      case ORDERS.SCREENINGS:
        return (
          <PHQ9Summary
            key={category}
            completed_at={completed_at}
            updated_at={updated_at}
            status={status}
            handleSaveInstructions={handleSaveInstructions}
            followUpInstructions={follow_up_instructions}
            handleOrderAction={(type: string, action: string) => {
              throw new Error('Function not implemented.')
            }}
            handleCardOpen={queryOrderFormResults}
            openEditModal={openEditModal}
            isFlagged={isFlagged}
            openViewModal={openViewModal}
            isPreloading={isGetOrderFormResultsPreloading}
          />
        )
      case ORDERS.ASSESSMENT_TOBACCO:
        return (
          <TobaccoScreenerSummary
            key={category}
            completed_at={completed_at}
            updated_at={updated_at}
            status={status}
            handleSaveInstructions={handleSaveInstructions}
            followUpInstructions={follow_up_instructions}
            handleOrderAction={(type: string, action: string) => {
              throw new Error('Function not implemented.')
            }}
            handleCardOpen={queryOrderFormResults}
            openEditModal={openEditModal}
            isFlagged={isFlagged}
            openViewModal={openViewModal}
            isPreloading={isGetOrderFormResultsPreloading}
          />
        )
      case ORDERS.PROVIDER_DOCUMENTATION:
        return (
          providerDocumentationOrder && (
            <ProviderDocumentationSummary
              key={category}
              completed_at={completed_at}
              updated_at={updated_at}
              status={status}
              handleOrderAction={(type: string, action: string) => {
                throw new Error('Function not implemented.')
              }}
              handleCardOpen={queryOrderFormResults}
              openEditModal={openEditModal}
              openViewModal={openViewModal}
              isPreloading={isGetOrderFormResultsPreloading}
            />
          )
        )
      case ORDERS.MEDHISTORY:
      case ORDERS.COVID:
        return (
          <MedicalHistorySummary
            title={name}
            completed_at={completed_at}
            updated_at={updated_at}
            status={status}
            handleOrderAction={(type: string, action: string) => {
              throw new Error('Function not implelemnted.')
            }}
            handleCardOpen={queryOrderFormResults}
            openEditModal={openEditModal}
            openViewModal={openViewModal}
            isPreloading={isGetOrderFormResultsPreloading}
            handleSaveInstructions={handleSaveInstructions}
            followUpInstructions={follow_up_instructions}
            isFlagged={isFlagged}
            orderType={category}
          />
        )
    }
  }

  const contentContainerSize =
    category === ORDERS.MEDICAL_ASSESSMENT
      ? CONTAINER_WIDTH.FULL
      : CONTAINER_WIDTH.MD

  return (
    <>
      {getOrderSummary()}
      <Modal
        size={MODAL_SIZE.FULL}
        contentContainerSize={contentContainerSize}
        onClose={closeModal}
        title={patientName}
        subtitle={name}
        isOpen={isModalOpen}
      >
        {getForm()}
      </Modal>
    </>
  )
}

export const OrderList = ({
  orders = [],
  patientId,
  patientName,
}: OrderListProps) => (
  <>
    {orders?.map((order) => (
      <Order
        key={order.id}
        order={order}
        patientId={patientId}
        patientName={patientName}
      />
    ))}
  </>
)
