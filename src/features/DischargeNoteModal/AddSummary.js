import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Col, Row } from 'react-bootstrap'
import { ORDER_STATUS } from 'constants/orders'
import { USER_ROLES } from 'constants/users'
import { actions } from '../../widgets/Wizard/wizard.slice'
import { selectWizardFormValues } from '../../widgets/Wizard/wizard.selectors'
import { selectCurrentUserHasPermissions } from '../../infrastructure/userContext'
import { selectVisitDetails } from '../VisitItem/visitItem.selectors'
import { prepareResultsForViewing } from '../MiddlePanelModals/PHQModal/PHQJsonSchema'
import { NEGATIVE_PHQ_RESULT_NOTE } from './dischargeNoteModal.constants'
const { setIsCurrentPageValid, setFormValues } = actions

const AddSummary = () => {
  const dispatch = useDispatch()
  const wizardForm = useSelector(selectWizardFormValues)
  const currentUserHasPermissions = useSelector(selectCurrentUserHasPermissions)
  const isProvider = currentUserHasPermissions([USER_ROLES.PROVIDER])
  const isNurse = currentUserHasPermissions([USER_ROLES.NURSE])
  const { tests, orders, assessments } = useSelector(selectVisitDetails)
  let summarizedFollowUpInstructions
  // PERMISSION:- Can End Visit
  if (isProvider) {
    const positiveTestInstructionsArr = tests.filter(
      ({ status }) => status === ORDER_STATUS.POSITIVE.toUpperCase()
    )
    const negativeTestInstructionsArr = tests.filter(
      ({ status }) => status === ORDER_STATUS.NEGATIVE.toUpperCase()
    )
    const medicationInstructionsArr = orders.filter(
      ({ status }) => status === ORDER_STATUS.COMPLETE.toUpperCase()
    )
    summarizedFollowUpInstructions = [
      ...positiveTestInstructionsArr,
      ...negativeTestInstructionsArr,
      ...medicationInstructionsArr,
    ].map(({ followUpInstructions, testOutcome = '', type = '' }) => {
      const outcome =
        testOutcome === ORDER_STATUS.POSITIVE.toUpperCase()
          ? ORDER_STATUS.POSITIVE
          : ORDER_STATUS.NEGATIVE
      if (testOutcome && followUpInstructions) {
        return `${type} test | ${outcome}\n\n${followUpInstructions} \n\n`
      } else if (testOutcome) {
        return `${type} test | ${outcome}\n\n No Additional Notes were provided. \n\n`
      }
      if (followUpInstructions) return `${followUpInstructions} \n\n`
      // eslint-disable-next-line
      return
    })

    // get phq score and determine results
    const { results } =
      assessments.find(
        ({ type, status }) =>
          type === 'PHQ9 - Assessment' && status === 'Completed'
      ) || {}
    let assessmentInstructions = ''

    if (results) {
      const { totalScore } = prepareResultsForViewing(results)
      if (totalScore < 8) assessmentInstructions = NEGATIVE_PHQ_RESULT_NOTE
    }

    summarizedFollowUpInstructions = [
      ...summarizedFollowUpInstructions,
      assessmentInstructions,
    ].join``
  }

  // Replace role check with extraction of role and using it to fetch role specific values like we did for session logs
  const visitSummary = isProvider
    ? 'providerVisitSummary'
    : 'facilitatorVisitSummary'

  const summary = wizardForm[visitSummary]
  useEffect(() => {
    //PERMISSION:- Can End Visit
    if (!summary && isProvider) {
      dispatch(
        setFormValues({ [visitSummary]: summarizedFollowUpInstructions })
      )
    }
  }, [
    summary,
    isProvider,
    summarizedFollowUpInstructions,
    visitSummary,
    dispatch,
  ])

  useEffect(() => {
    //PERMISSION:- !Can End Visit
    if (summary || isNurse) dispatch(setIsCurrentPageValid(true))
  }, [dispatch, summary, isNurse])

  const handleChange = (field, value) => {
    dispatch(setFormValues({ [field]: value }))
    dispatch(setIsCurrentPageValid(!!value))
  }
  return (
    <div className='p-20'>
      <p className='f-14 mb-30'>Please provide your after visit summary:</p>
      <Row>
        <Col md={3}>
          <strong className='f-14 mb-30'>Visit Summary</strong>
        </Col>
        <Col md={9}>
          <Form.Control
            as='textarea'
            cols='30'
            rows='10'
            className='mb-20'
            placeholder='Your Notes...'
            onChange={(ev) => handleChange(visitSummary, ev.target.value)}
            value={summary}
          />
        </Col>
      </Row>
    </div>
  )
}
export default AddSummary
