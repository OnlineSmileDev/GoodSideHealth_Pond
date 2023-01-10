import { Image } from 'react-bootstrap'
import { Button, BUTTON_VARIANT } from 'components/atoms/Button'
import { InputWidget } from 'components/molecules/InputWidget'
import { FORM_TYPES } from 'constants/forms'
import {
  useGetPatientFormsDataQuery,
  useGetPatientFormTypesQuery,
  useInsertFormImagesMutation,
} from 'graphql/.generated'
import { FormEventHandler, useState, useRef } from 'react'
import Icons from 'src/assets/icons'

export type UploadPaperworkProps = {
  patientId: string
  formType: typeof FORM_TYPES.MEDICAL_HISTORY | typeof FORM_TYPES.PHQ
  name: string
  isUploading?: boolean
  handleAction?: () => void
}

const thunk = () => {}

export const UploadPaperwork = ({
  patientId,
  formType,
  name,
  handleAction = thunk,
  isUploading = false,
}: UploadPaperworkProps) => {
  const [isFormImagesUploading, setIsFormImagesUploading] = useState(false)

  const [formFilename, setFormFilename] = useState('')
  const formRef = useRef(null)

  const { mutateAsync } = useInsertFormImagesMutation()

  const { data: formData, isLoading: isPreloading } =
    useGetPatientFormsDataQuery(
      { patientId: patientId ?? '', on_registration: true },
      {
        enabled: true,
      }
    )
  const form_images = formData?.form_images ?? []

  const handleImageUpload: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setIsFormImagesUploading(true)
    const {
      insert_form_images_one: { url },
    } = await mutateAsync({ patientId, formId: formType })
    const file = formRef.current.files[0]
    await fetch(url, { method: 'PUT', body: file })
    setIsFormImagesUploading(false)
    handleAction()
  }

  const isValidForm = () => formRef?.current?.files?.length > 0

  return (
    <>
      {form_images.length === 0 && (
        <form onSubmit={handleImageUpload}>
          <div
            key={formType}
            className='tw-w-full tw-h-22.5 tw-bg-light tw-rounded tw-flex tw-mb-15.1'
          >
            <Button
              className='tw-flex tw-justify-center tw-items-center tw-h-17.5 tw-w-16.25 tw-m-2.5'
              onClick={() => {
                formRef.current.click()
              }}
              variant={BUTTON_VARIANT.PRIMARY}
              disabled={isUploading}
            >
              <Image src={Icons.addIcon} alt='AddIcon' width={25} />
            </Button>

            <div className='tw-flex tw-flex-1 tw-flex-col tw-pr-2.5'>
              <div className='tw-text-sm tw-font-bold tw-h-full tw-mt-2'>
                {name}
              </div>

              <div className='tw-h-full'>
                <div className='tw-font-hind tw-text-sm tw-mb-1.25'>
                  {formFilename}
                  {/* TODO: It's not possible to track upload progress with the `fetch` API  */}
                  {/* Consider falling back to XMLHttpRequest or abstraction on top of it that packages nicely? */}
                  {/* {fileName && (
              <div className='tw-bg-light-lightest tw-rounded-full tw-h-1.25'>
                <div
                  className='tw-bg-success tw-h-1.25 tw-rounded-full'
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            )} */}
                </div>
              </div>
            </div>

            <div>
              <InputWidget
                id={formType}
                as='file'
                forwardedRef={formRef}
                hidden={true}
                capture='environment'
                accept={'image/*'}
                onChange={(e) => {
                  setFormFilename(e.target.files[0].name)
                }}
              />
            </div>
          </div>

          <div className='tw-flex tw-flex-col tw-w-full tw-mt-15.1 tw-mb-5'>
            <Button
              type='submit'
              disabled={!isValidForm() || isUploading || isPreloading}
              variant={BUTTON_VARIANT.PRIMARY}
              className='tw-mx-1.5 tw-text-sm tw-w-auto tw-flex-auto tw-mt-3'
              size='lg'
              isLoading={isUploading || isFormImagesUploading}
            >
              Upload &amp; Save
            </Button>
          </div>
        </form>
      )}
      {form_images.length > 0 && (
        <div className='tw-grid tw-grid-cols-1 tw-my-1.25 tw-py-2.5 tw-px-3.5'>
          <Button
            size='none'
            className='tw-w-full tw-text-sm'
            variant={BUTTON_VARIANT.PRIMARY}
            onClick={() => {
              window.open(form_images[0].url, '_blank')
            }}
          >
            View Patient Paperwork
          </Button>
        </div>
      )}
    </>
  )
}
