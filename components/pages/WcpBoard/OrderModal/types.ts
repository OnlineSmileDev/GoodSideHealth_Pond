import { Dispatch, SetStateAction } from 'react'

export type FormType = {
  form_type_id: string
  id: number
  position: number
}

export type SelectedOrderType = {
  title: string
  code: string
  visitId: number | null
  patientName: string
  patientId: string
  orderTypes: FormType[]
  show: boolean
  currentStationId: number | null
  nextStationId: number | null
}

export type OrderType = {
  selectedOrder: SelectedOrderType
  setSelectedOrder: Dispatch<SetStateAction<SelectedOrderType>>
}
