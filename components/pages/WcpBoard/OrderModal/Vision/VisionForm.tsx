import { Formik } from 'formik'
import { CustomSelectInput } from 'components/molecules/CustomSelectInput'
import { InputGroup } from 'components/molecules/InputGroup'
import { Switch } from 'components/atoms/Switch'
import { Button, BUTTON_VARIANT } from 'components/atoms/Button'

export type VisionValuesType = {
  vision_left?: number | null
  vision_right?: number | null
  is_vision_corrected?: boolean | null
}

export type VisionFormProps = {
  visionFormValues: VisionValuesType
  handleFormSubmission: (values: any, shouldBeFlagged: boolean) => void
  isUploading?: boolean
  isPreloading?: boolean
}

const visionOptions = [
  { label: '15', value: 15 },
  { label: '20', value: 20 },
  { label: '25', value: 25 },
  { label: '30', value: 30 },
  { label: '40', value: 40 },
  { label: '50', value: 50 },
  { label: '70', value: 70 },
  { label: '100', value: 100 },
  { label: '200', value: 200 },
]

export const VisionForm = ({
  visionFormValues = {},
  handleFormSubmission,
  isUploading,
  isPreloading,
}: VisionFormProps) => {
  const onVisionFormikSubmit = (values, { setSubmitting }) => {
    const shouldBeFlagged =
      values.vision_left >= 50 || values.vision_right >= 50

    // Sending Hasura mutation
    handleFormSubmission(
      {
        ...values,
        is_vision_corrected: values.is_vision_corrected || false,
      },
      shouldBeFlagged
    )
    setSubmitting(false)
  }

  return (
    <Formik
      enableReinitialize={true}
      initialValues={visionFormValues}
      onSubmit={onVisionFormikSubmit}
    >
      {({ values, handleSubmit, setFieldValue }) => {
        return (
          <form onSubmit={handleSubmit}>
            <InputGroup
              id='visualEquity'
              className='tw-items-center tw-mb-4'
              label='Vision'
            >
              <div className='tw-col-span-2 tw-flex tw-items-center'>
                <div className='tw-font-hind tw-text-center tw-align-middle tw-mr-1.5 tw-text-sm'>
                  R 20/
                </div>

                <div className='tw-mr-2.5 tw-flex-auto'>
                  <CustomSelectInput
                    placeholder='Select right vision'
                    options={visionOptions}
                    onChange={({ value }: any) =>
                      setFieldValue('vision_right', value)
                    }
                    value={values.vision_right}
                    showSearchBar={false}
                    fieldsToBeDisplayed={['label']}
                    screeningDashboardStyles
                    keyField='label'
                  />
                </div>

                <div className='tw-font-hind tw-text-center tw-align-middle tw-mr-1.5 tw-text-sm'>
                  L 20/
                </div>

                <div className='tw-mr-2.5 tw-flex-auto'>
                  <CustomSelectInput
                    placeholder='Select left vision'
                    options={visionOptions}
                    onChange={({ value }: any) =>
                      setFieldValue('vision_left', value)
                    }
                    value={values.vision_left}
                    showSearchBar={false}
                    fieldsToBeDisplayed={['label']}
                    screeningDashboardStyles
                    keyField='label'
                  />
                </div>
              </div>
            </InputGroup>

            <InputGroup
              id='glassesOrContacts'
              className='tw-item-center tw-mb-4'
              label='Glasses or Contacts?'
            >
              <Switch
                name='is_vision_corrected'
                className='tw-col-span-2'
                onChange={(ev) =>
                  setFieldValue(
                    ev.target.name,
                    ev.target.checked ? true : false
                  )
                }
                checked={values.is_vision_corrected}
              >
                {!values.is_vision_corrected ? 'No' : 'Yes'}
              </Switch>
            </InputGroup>

            <div className='tw-flex tw-justify-end tw-w-full tw-mt-10 tw-mb-5'>
              <Button
                type='submit'
                variant={BUTTON_VARIANT.PRIMARY}
                className='tw-mx-1.5 tw-text-sm tw-w-auto tw-flex-auto'
                size='lg'
                data-testid='submit-button'
                disabled={
                  !(values.vision_left && values.vision_right) || isPreloading
                }
                isLoading={isUploading}
              >
                Save
              </Button>
            </div>
          </form>
        )
      }}
    </Formik>
  )
}
