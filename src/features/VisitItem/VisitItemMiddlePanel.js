import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { useFeatures } from 'flagged'
import { Orders } from 'components/organisms/Orders'
import Dropdown from 'components/molecules/Dropdown'
import { EmptyOrderCard } from 'components/molecules/EmptyOrderCard'
import { ORDER_ACTIONS, ORDER_TYPES } from 'constants/orders'
import { USER_ROLES } from 'constants/users'
import { VISITS_STATUS } from 'constants/visits'
import { selectSelectedMiddlePanelModal } from './visitItem.selectors'
import { actions } from './visitItem.slice'
import { addOrUpdateOrder } from './visitItem.asyncActions'
import { MIDDLE_PANEL_MODAL } from '../MiddlePanelModals/middlePanelModal.constants'
import getMiddlePanelModal from '../MiddlePanelModals'
import { selectCurrentUserHasPermissions } from '../../infrastructure/userContext'
import DischargeNotes from './DischargeNotes'

const { setSelectedOrder, setSelectedMiddlePanelModal } = actions

const VisitItemMiddlePanel = ({ visit }) => {
  const dispatch = useDispatch()
  const { status, discharge, tests, orders, assessments } = visit
  const shouldShowMiddlePanelModal = useSelector(selectSelectedMiddlePanelModal)
  const currentUserHasPermissions = useSelector(selectCurrentUserHasPermissions)
  const isProvider = currentUserHasPermissions([USER_ROLES.PROVIDER])
  const [followUpInstructionsValue, setFollowUpInstructions] = useState('')
  const isVisitActive =
    status == VISITS_STATUS.WAITING || status == VISITS_STATUS.IN_PROGRESS

  const openOrderEditModal = ({ id, type }) => {
    dispatch(setSelectedOrder({ id, type }))
    dispatch(setSelectedMiddlePanelModal(MIDDLE_PANEL_MODAL.ORDER_MODAL))
  }
  const openPHQModal = ({ id, name }) => {
    const { results, completedAt } =
      assessments.find((assessment) => assessment.id == id) || {}
    dispatch(
      setSelectedOrder({
        id,
        type: ORDER_TYPES.ASSESSMENT,
        action: name,
        assessmentResults: results,
        completedAt,
      })
    )
    if (name === ORDER_ACTIONS.EDIT || name === ORDER_ACTIONS.COMPLETE) {
      dispatch(setSelectedMiddlePanelModal(MIDDLE_PANEL_MODAL.PHQ_ASSESSMENT))
    } else {
      dispatch(
        setSelectedMiddlePanelModal(MIDDLE_PANEL_MODAL.PHQ_ASSESSMENT_RESULTS)
      )
    }
  }
  const { assessmentOrder, standingMedicationOrder } = useFeatures()

  const orderTypes = [
    { label: 'Add Medication', value: ORDER_TYPES.MEDICATION },
    { label: 'Add Test', value: ORDER_TYPES.TEST },
  ]

  const assessmentOrderType = {
    label: 'Add Assessment',
    value: ORDER_TYPES.ASSESSMENT,
  }

  const standingOrderType = {
    label: 'Add Standing Orders',
    value: ORDER_TYPES.STANDING_MEDICATION,
  }

  if (assessmentOrder) orderTypes.push(assessmentOrderType)
  if (standingMedicationOrder) orderTypes.push(standingOrderType)

  const handleOptionChange = ({ value }) => {
    switch (value) {
      case ORDER_TYPES.MEDICATION:
        dispatch(setSelectedOrder({ id: null, type: ORDER_TYPES.MEDICATION }))
        dispatch(setSelectedMiddlePanelModal(MIDDLE_PANEL_MODAL.ORDER_MODAL))
        break
      case ORDER_TYPES.TEST:
        dispatch(setSelectedOrder({ id: null, type: ORDER_TYPES.TEST }))
        dispatch(setSelectedMiddlePanelModal(MIDDLE_PANEL_MODAL.ORDER_MODAL))
        break
      case ORDER_TYPES.STANDING_MEDICATION:
        dispatch(
          setSelectedOrder({
            id: null,
            type: ORDER_TYPES.MEDICATION,
            isStandingOrder: true,
          })
        )
        dispatch(setSelectedMiddlePanelModal(MIDDLE_PANEL_MODAL.ORDER_MODAL))
        break
      case ORDER_TYPES.ASSESSMENT:
        dispatch(setSelectedOrder({ id: null, type: ORDER_TYPES.ASSESSMENT }))
        dispatch(
          setSelectedMiddlePanelModal(MIDDLE_PANEL_MODAL.ASSESSMENT_ORDER_MODAL)
        )
        break
      default:
        return null
    }
  }

  const removeOrderFromList = ({ id, type }) => {
    dispatch(setSelectedOrder({ id, type }))
    dispatch(setSelectedMiddlePanelModal(MIDDLE_PANEL_MODAL.REMOVE_ORDER_MODAL))
  }
  const openDocumentAdministrationModal = ({ id, type, status }) => {
    dispatch(setSelectedOrder({ id, type, status }))
    dispatch(
      setSelectedMiddlePanelModal(
        MIDDLE_PANEL_MODAL.DOCUMENT_ADMINISTRATION_MODAL
      )
    )
  }
  const setReadStatusToRead = ({ orderId, orderType }) => {
    const updatedOrder = {
      unread: false,
    }
    dispatch(setSelectedOrder({ id: orderId, type: orderType }))
    dispatch(addOrUpdateOrder({ updatedOrder, orderId, type: orderType }))
  }

  const saveFollowUpInstructions = ({
    id,
    orderType,
    followUpInstructionsValue,
    isProvider,
    isVisitActive,
  }) => {
    const updatedOrder = {
      followUpInstructions: followUpInstructionsValue,
    }
    // PERMISSION:- Can Create orders && Can Delete orders
    if (isProvider && isVisitActive) {
      dispatch(setSelectedOrder({ id, type: orderType }))
      dispatch(addOrUpdateOrder({ updatedOrder, orderId: id, type: orderType }))
    }
  }
  const providerOrders = [
    {
      orderType: ORDER_TYPES.MEDICATION,
      orders: orders,
    },
    {
      orderType: ORDER_TYPES.TEST,
      orders: tests,
    },
    {
      orderType: ORDER_TYPES.ASSESSMENT,
      orders: assessments,
    },
  ]

  const hasProviderOrders = tests.length || orders.length || assessments.length

  if (!hasProviderOrders && status === VISITS_STATUS.WAITING) return null

  return (
    <>
      {shouldShowMiddlePanelModal &&
        getMiddlePanelModal(shouldShowMiddlePanelModal)}
      {discharge && <DischargeNotes notes={discharge} />}
      <Row className='mb-20'>
        <Col sm={5}>
          <h3 className='lh-45 f-18 font-weight-bold mb-4 mb-sm-0'>
            Provider Orders
          </h3>
        </Col>
        {/* PERMISSION:- Can Create orders && Can Delete orders  */}
        {isProvider && isVisitActive && (
          <Col sm={5} className='ml-auto'>
            <Dropdown
              title='Add Order'
              items={orderTypes}
              onItemChange={handleOptionChange}
            />
          </Col>
        )}
      </Row>
      {hasProviderOrders ? (
        providerOrders.map(({ orderType, orders }) => (
          <Orders
            key={orderType}
            orderType={orderType}
            isVisitActive={isVisitActive}
            isProvider={isProvider}
            orders={orders}
            openOrderEditModal={openOrderEditModal}
            removeOrderFromList={removeOrderFromList}
            openDocumentAdministrationModal={openDocumentAdministrationModal}
            openPHQModal={openPHQModal}
            setReadStatusToRead={setReadStatusToRead}
            saveFollowUpInstructions={saveFollowUpInstructions}
            followUpInstructionsValue={followUpInstructionsValue}
            setFollowUpInstructions={setFollowUpInstructions}
          />
        ))
      ) : (
        <EmptyOrderCard />
      )}
    </>
  )
}

export default VisitItemMiddlePanel
