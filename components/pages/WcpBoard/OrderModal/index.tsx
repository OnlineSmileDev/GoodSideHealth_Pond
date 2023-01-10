import { useCallback, useEffect, useState } from 'react'
import { ORDERS } from 'constants/orders'
import {
  Modal as CustomModal,
  MODAL_SIZE,
  CONTAINER_WIDTH,
} from 'components/organisms/Modal'
import Modal from 'src/widgets/modal'
import { useUpdateVisitStationMutation } from 'graphql/.generated'
import { OrderType } from './types'
import { Registration } from './Registration'
import { HeightAndWeight } from './HeightAndWeight'
import { Vision } from './Vision'
import { Musculoskeletal } from './Musculoskeletal'
import { MedicalAssessment } from './MedicalAssessment'
import { Screeners } from './Screeners'
import { StationSkipper } from './StationSkipper'

const emptyOrder = {
  title: '',
  code: '',
  visitId: null,
  orderTypes: [],
  patientName: '',
  patientId: '',
  show: false,
  currentStationId: null,
  nextStationId: null,
}

export const OrderModal = ({ selectedOrder, setSelectedOrder }: OrderType) => {
  // TEMP: devtools edit variable for comparing styles
  const [showNewModal] = useState(true)
  const [showSkipScreenerModal, setShowSkipScreenerModal] = useState(false)
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
  const {
    title,
    code,
    visitId,
    patientName,
    show,
    currentStationId,
    nextStationId,
  } = selectedOrder

  useEffect(() => {
    setIsOrderModalOpen(show)
  }, [show])

  const reset = useCallback(() => {
    setIsOrderModalOpen(false)
    setSelectedOrder(emptyOrder)
    setShowSkipScreenerModal(false)
  }, [setSelectedOrder])

  const {
    mutate: mutateVisitStation,
    isLoading: isUpdateVisitStationMutationLoading,
  } = useUpdateVisitStationMutation()

  const handleVisitStationUpdate = useCallback(() => {
    mutateVisitStation(
      {
        visitId,
        oldStationId: currentStationId,
        newStationId: nextStationId,
      },
      {
        onSuccess: () => {
          console.log(
            `Visit ${visitId} Station Updated from ${currentStationId} to ${nextStationId}!`
          )
          reset()
        },
      }
    )
  }, [currentStationId, mutateVisitStation, nextStationId, reset, visitId])

  const handleScreenerStationSkip = () => setShowSkipScreenerModal(true)

  const handleStationSkipper = () => {
    setShowSkipScreenerModal(false)
    handleVisitStationUpdate()
  }

  const getSelectedOrder = (code: string) => {
    switch (code) {
      case ORDERS.REGISTRATION:
        return (
          <Registration
            selectedOrder={selectedOrder}
            handleModalAction={handleVisitStationUpdate}
            isUploading={isUpdateVisitStationMutationLoading}
          />
        )
      case ORDERS.HEIGHT_AND_WEIGHT:
        return (
          <HeightAndWeight
            selectedOrder={selectedOrder}
            handleModalAction={handleVisitStationUpdate}
            isUploading={isUpdateVisitStationMutationLoading}
          />
        )
      case ORDERS.VISION:
        return (
          <Vision
            selectedOrder={selectedOrder}
            handleModalAction={handleVisitStationUpdate}
            isUploading={isUpdateVisitStationMutationLoading}
          />
        )
      case ORDERS.MUSCULOSKELETAL:
        return (
          <Musculoskeletal
            selectedOrder={selectedOrder}
            handleModalAction={handleVisitStationUpdate}
            isUploading={isUpdateVisitStationMutationLoading}
          />
        )
      case ORDERS.MEDICAL_ASSESSMENT:
        return (
          <MedicalAssessment
            selectedOrder={selectedOrder}
            handleModalAction={handleVisitStationUpdate}
            isUploading={isUpdateVisitStationMutationLoading}
          />
        )
      case ORDERS.SCREENINGS:
        return (
          <Screeners
            selectedOrder={selectedOrder}
            handleModalAction={handleVisitStationUpdate}
            handleModalSkip={handleScreenerStationSkip}
            isUploading={isUpdateVisitStationMutationLoading}
          />
        )
      default:
        return null
    }
  }

  if (showSkipScreenerModal)
    return (
      <CustomModal
        onClose={reset}
        title='Please Note'
        isBackdropOpaque
        isOpen={isOrderModalOpen}
      >
        <StationSkipper
          name={patientName}
          handleAction={handleStationSkipper}
        />
      </CustomModal>
    )

  if (showNewModal) {
    const contentContainerSize =
      code === ORDERS.MEDICAL_ASSESSMENT
        ? CONTAINER_WIDTH.FULL
        : CONTAINER_WIDTH.MD
    return (
      <CustomModal
        size={MODAL_SIZE.FULL}
        contentContainerSize={contentContainerSize}
        onClose={reset}
        title={patientName}
        subtitle={title}
        isOpen={isOrderModalOpen}
      >
        {getSelectedOrder(code)}
      </CustomModal>
    )
  }

  return (
    //@ts-ignore
    <Modal reset={reset} title={title} isFooter={false}>
      {getSelectedOrder(code)}
    </Modal>
  )
}
