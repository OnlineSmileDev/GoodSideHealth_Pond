import React, { useEffect, useState } from 'react'
import { Modal } from 'components/organisms/Modal'
import { CustomStepper, LABEL_POSITIONS } from 'components/atoms/CustomStepper'
import { NOTIFICATION_VARIANT } from 'components/atoms/Notification'

export type NotificationType = {
  variant: NOTIFICATION_VARIANT
  message: string
}

export type MultiScreenModalProps = {
  title: string
  subtitle: string
  pages: Array<any>
  initialStep?: number
  initialFormValues?: {}
  labelPosition?: string
  handleSubmit: (formValues: any, resetModal: () => void) => void
  onClose: () => void
  notifications?: Array<NotificationType>
  isLoading: boolean
}

export const MultiScreenModal = ({
  title,
  subtitle,
  pages,
  initialStep = 0,
  initialFormValues = {},
  labelPosition = LABEL_POSITIONS.TOP,
  handleSubmit,
  onClose,
  notifications = [],
  isLoading = false,
}: MultiScreenModalProps) => {
  const [currentStep, setCurrentStep] = useState(initialStep)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => setIsOpen(true), [])

  const resetModal = () => {
    onClose()
    setIsOpen(false)
  }

  const handleMultiScreenSubmission = (submittedFormValues) => {
    handleSubmit(submittedFormValues, resetModal)
  }

  const CurrentPage = pages[currentStep].component

  return (
    <Modal
      onClose={resetModal}
      title={title}
      subtitle={subtitle}
      isOpen={isOpen}
    >
      <CustomStepper
        steps={pages}
        activeStep={currentStep}
        labelPosition={labelPosition}
      />
      <CurrentPage
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        formValues={formValues}
        setFormValues={setFormValues}
        resetWizard={resetModal}
        handleSubmit={handleMultiScreenSubmission}
        notifications={notifications}
        isLoading={isLoading}
      />
    </Modal>
  )
}
