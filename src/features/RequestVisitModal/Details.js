import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CustomSelectInput } from 'components/molecules/CustomSelectInput'
import { actions } from '../../widgets/Wizard/wizard.slice'
import { selectWizardFormValues } from '../../widgets/Wizard/wizard.selectors'
import { mockVisitReasons } from '../VisitItem/visitItem.asyncActions'
import Form from 'react-bootstrap/Form'
const { setIsCurrentPageValid, setFormValues } = actions

const Details = () => {
  const dispatch = useDispatch()
  const wizardForm = useSelector(selectWizardFormValues)
  const { visitReason, notes } = wizardForm

  useEffect(() => {
    visitReason && dispatch(setIsCurrentPageValid(true))
  }, [dispatch, visitReason])

  const handleChange = (field, value) => {
    dispatch(setFormValues({ [field]: value }))
    if (field === 'visitReason') {
      dispatch(setIsCurrentPageValid(!!value))
    }
  }

  return (
    <div className='p-20'>
      <p className='f-14 mb-30'>
        Please use the fields below to tell us about your patient, any special
        needs, and their condition. We&apos;ll use this information to ensure
        you receive the appropriate provider.
      </p>
      <div className='mb-10'>
        <CustomSelectInput
          placeholder='Select Reason for Visit'
          options={[...mockVisitReasons, { reason: 'Other' }]}
          onChange={(data) => handleChange('visitReason', data.reason)}
          value={visitReason}
          showSearchBar={false}
          fieldsToBeDisplayed={['reason']}
          keyField='reason'
        />
      </div>
      <Form.Control
        as='textarea'
        cols='30'
        rows='6'
        className='mb-20'
        placeholder='Additional Notes'
        onChange={(ev) => handleChange('notes', ev.target.value)}
        value={notes}
      />
    </div>
  )
}
export default Details
