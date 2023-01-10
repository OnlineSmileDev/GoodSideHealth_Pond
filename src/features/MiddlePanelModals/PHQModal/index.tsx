import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Banner from 'components/molecules/Banner'
import { USER_ROLES } from 'constants/users'
import Modal, { showModal } from '../../../widgets/modal'
import { saveAssessmentResults } from '../../VisitItem/visitItem.asyncActions'
import CancelPHQModal from './PHQCancelModal'
import PHQForm from './PHQForm'
import { getFormResults, transformResultsIntoFormData } from './PHQJsonSchema'
import { actions } from '../../VisitItem/visitItem.slice'
import { MIDDLE_PANEL_MODAL } from '../middlePanelModal.constants'
import { selectSelectedOrder } from '../../VisitItem/visitItem.selectors'
import { selectCurrentUserHasPermissions } from '../../../infrastructure/userContext'

const { setSelectedMiddlePanelModal } = actions

const PHQModal = () => {
  const { assessmentResults, ...assessmentData } =
    useSelector(selectSelectedOrder)
  const previousResults = assessmentResults
    ? transformResultsIntoFormData(assessmentResults)
    : {}
  const currentUserHasPermissions = useSelector(selectCurrentUserHasPermissions)
  const isProvider = currentUserHasPermissions([USER_ROLES.PROVIDER])
  const [shouldCancel, setState] = useState(false)
  const [formData, setFormData] = useState(previousResults)
  const formRef = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    //@ts-ignore
    dispatch(showModal())
  }, [dispatch])

  const handleSave = () => {
    if (formRef && formRef.current) {
      const { formData } = formRef.current.state
      const assessmentResults = getFormResults(
        assessmentData,
        formData,
        isProvider
      )
      // below code doesn't seem to trigger the form
      // formRef.current.submit()
      if (assessmentResults) {
        //@ts-ignore
        dispatch(saveAssessmentResults(assessmentResults)).then((res) => {
          dispatch(
            setSelectedMiddlePanelModal(
              MIDDLE_PANEL_MODAL.COMPLETED_PHQ_ASSESSMENT
            )
          )
        })
      }
    }
  }

  const handleClose = () => setState(true)
  const handleCloseCancel = () => setState(false)

  if (shouldCancel) return <CancelPHQModal handleCancel={handleCloseCancel} />

  const footer = (
    <>
      <Button className='btn-lg' variant='info' onClick={handleSave}>
        Save
      </Button>
      <Button className='btn-small' variant='light' onClick={handleClose}>
        Cancel
      </Button>
    </>
  )

  return (
    //@ts-ignore
    <Modal
      title='Patient Health Questionnaire'
      reset={handleClose}
      footer={footer}
      size='sm'
      backdrop='static'
      backdropClassName='opaque'
    >
      <h5 className='font-weight-bold'>
        Over the last 2 weeks, how often have you been bothered by any of the
        following problems?
      </h5>
      <PHQForm ref={formRef} formData={formData} setFormData={setFormData} />
      <Banner
        title='Disclaimer'
        text='Developed by Drs. Robert L. Spitzer, Janet B.W. Williams, Kurt Kroenke and colleagues, with an educational grant from Pfizer inc. No permission required to reproduce, translate, display or distribute.'
      />
    </Modal>
  )
}

export default PHQModal
