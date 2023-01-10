import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from 'utils/isEmpty'
import { actions } from './wizard.slice'
import { ButtonToolbar, ButtonGroup } from 'react-bootstrap'
import {
  selectCurrentStep,
  selectWizardFormValues,
  selectIsCurrentPageValid,
  selectIsReplaceable,
} from './wizard.selectors'
import Button from 'react-bootstrap/Button'
import Modal from '../../widgets/modal'
import { Stepper } from 'components/molecules/Stepper'

const {
  resetCurrentStep,
  nextClicked,
  backClicked,
  resetFormValues,
  setIsCurrentPageValid,
  setFormValues,
  setIsReplaceable,
  setCurrentStep,
} = actions

const Wizard = ({
  title,
  onCancel,
  onFinalize,
  pages,
  finalButtonText = 'Submit',
  labelPosition,
  initialFormData = {},
  onClose,
  replaceablePage,
  backdrop = 'static',
  utilityClass = '',
  initialStep,
}) => {
  const dispatch = useDispatch()
  const currentStep = useSelector(selectCurrentStep)
  const wizardForm = useSelector(selectWizardFormValues)
  const isCurrentPageValid = useSelector(selectIsCurrentPageValid)
  const isReplaceable = useSelector(selectIsReplaceable)

  useEffect(() => {
    if (!isEmpty(initialFormData) && isEmpty(wizardForm)) {
      dispatch(setFormValues(initialFormData))
    }
  }, [initialFormData, dispatch, wizardForm])

  useEffect(() => {
    if (initialStep) {
      dispatch(setCurrentStep(initialStep))
    }
  }, [dispatch, initialStep])

  const navigateToNextPage = () => {
    dispatch(setIsReplaceable(false))
    dispatch(nextClicked())
    dispatch(setIsCurrentPageValid(false))
  }

  const navigateToPrevious = () => {
    dispatch(setIsReplaceable(false))
    dispatch(backClicked())
  }

  const resetWizard = () => {
    dispatch(resetCurrentStep())
    dispatch(resetFormValues())
    dispatch(setIsCurrentPageValid(false))
  }

  const finalize = () => {
    onFinalize(wizardForm, resetWizard)
    // resetWizard()
  }
  const resetModal = () => {
    onCancel()
    resetWizard()
  }

  const CurrentPage = isReplaceable
    ? replaceablePage.component
    : pages[currentStep].component

  const CurrentPageSize = !isEmpty(pages[currentStep].size)
    ? pages[currentStep].size
    : 'sm'

  const isFinalPage = pages.length === currentStep + 1
  const footer = (
    <>
      <ButtonToolbar>
        <ButtonGroup>
          <Button
            variant={isFinalPage ? 'success' : 'primary'}
            onClick={isFinalPage ? finalize : navigateToNextPage}
            disabled={!isCurrentPageValid}
            className={
              utilityClass && isFinalPage ? `mr-2 ${utilityClass}` : 'mr-2'
            }
          >
            {isFinalPage ? finalButtonText : 'Next'}
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          {currentStep ? (
            <Button variant='light' onClick={navigateToPrevious}>
              Back
            </Button>
          ) : (
            <Button
              className='cancel-button'
              variant='light'
              onClick={resetModal}
            >
              Cancel
            </Button>
          )}
        </ButtonGroup>
      </ButtonToolbar>
    </>
  )

  return (
    <Modal
      title={title}
      reset={resetModal}
      footer={footer}
      onClose={onClose}
      isFullWidth={true}
      size={CurrentPageSize}
      backdrop={backdrop}
    >
      <Stepper
        pages={pages}
        activeStep={currentStep + 1}
        labelPosition={labelPosition}
      />

      <div className=''>
        <CurrentPage
          wizardForm={wizardForm}
          currentStep={currentStep}
          finalize={finalize}
          cancel={resetModal}
        />
      </div>
    </Modal>
  )
}
export default Wizard
