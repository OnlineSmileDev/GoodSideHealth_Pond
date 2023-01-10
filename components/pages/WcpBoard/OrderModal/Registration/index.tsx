import { UploadPaperwork } from './UploadPaperwork'
import { FORM_TITLES, FORM_TYPES } from 'constants/forms'
import {
  useCompleteOrderFormMutation,
  useGetOrderFormQuery,
} from 'graphql/.generated'
import { SelectedOrderType } from '../types'
import { useState } from 'react'
import { ORDER_STATUS } from 'constants/orders'
import { Button } from 'components/atoms/Button'

export type RegistrationProps = {
  selectedOrder: SelectedOrderType
  handleModalAction?: () => void
  isUploading?: boolean
}

export const Registration = ({
  selectedOrder,
  handleModalAction,
  isUploading = false,
}: RegistrationProps) => {
  const { visitId, code, patientId, orderTypes } = selectedOrder
  const { data, isFetched } = useGetOrderFormQuery({
    code,
    visit_id: visitId,
    patient_id: patientId,
    form_type: code,
    language: 'en',
  })
  const { mutate } = useCompleteOrderFormMutation()
  const { orders = [] } = data || {}

  const formOrders = orders.map((order) => ({
    id: order?.id,
    formTypeId: order?.order_type?.form_type_id,
  }))

  const [filledOrderIds, setFilledOrderIds] = useState<number[]>(
    formOrders.map((o) => o.id)
  )

  const canExecuteModalAction = filledOrderIds.length === formOrders.length

  const handleOrderAction = (orderId: number) => {
    mutate({
      orderId,
      orderParams: {
        status: ORDER_STATUS.COMPLETE,
        completed_at: new Date().toISOString(),
      },
    })
    if (!filledOrderIds.includes(orderId)) {
      setFilledOrderIds(filledOrderIds.concat(orderId))
    }
    if (canExecuteModalAction) {
      handleModalAction()
    }
  }

  return (
    <div className='tw-text-sm tw-font-hind tw-font-bold'>
      {!isFetched && <div>Loading...</div>}

      {isFetched &&
        formOrders.map(({ id, formTypeId }) => (
          <UploadPaperwork
            key={`${patientId}-${formTypeId}`}
            patientId={patientId}
            formType={formTypeId}
            name={
              formTypeId === FORM_TYPES.COVID
                ? FORM_TITLES.covid
                : formTypeId === FORM_TYPES.MEDICAL_HISTORY
                ? FORM_TITLES.medhistory
                : 'Unknown'
            }
            handleAction={() => handleOrderAction(id)}
            isUploading={isUploading}
          />
        ))}

      <Button onClick={handleModalAction} disabled={!canExecuteModalAction}>
        Save
      </Button>
    </div>
  )
}
