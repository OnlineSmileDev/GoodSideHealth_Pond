import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CustomSelectInput } from 'components/molecules/CustomSelectInput'
import { actions } from '../../widgets/Wizard/wizard.slice'
import { selectWizardFormValues } from '../../widgets/Wizard/wizard.selectors'
import { LANGUAGES } from './requestVisitModal.constants'

const { setIsCurrentPageValid, setFormValues } = actions
const defaultLanguage = 'English'

const SelectLanguage = () => {
  const dispatch = useDispatch()
  const wizardForm = useSelector(selectWizardFormValues)

  useEffect(() => {
    if (wizardForm.language) dispatch(setIsCurrentPageValid(true))
  }, [dispatch, wizardForm, wizardForm.language])

  useEffect(() => {
    if (!wizardForm.language)
      dispatch(setFormValues({ language: defaultLanguage }))
  }, [dispatch, wizardForm.language])

  const handleChange = (data) => {
    const value = data.value
    dispatch(setIsCurrentPageValid(!!value))
    dispatch(setFormValues({ language: value }))
  }
  return (
    <div className='p-20'>
      <p className='f-14 mb-30'>
        Please confirm the primary language of the selected patient using the
        dropdown below. We&apos;ll use this information to ensure you receive
        the appropriate provider.
      </p>
      <div className='mb-30'>
        <CustomSelectInput
          placeholder='Select Language'
          options={LANGUAGES}
          onChange={handleChange}
          value={wizardForm.language}
          showSearchBar={false}
          fieldsToBeDisplayed={['value']}
          keyField='value'
        />
      </div>
    </div>
  )
}
export default SelectLanguage
