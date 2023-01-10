import { Button, BUTTON_VARIANT } from 'components/atoms/Button'

export const EmptyPatients = () => (
  <>
    <h5
      className='tw-mt-7.5 tw-font-hind tw-text-sm tw-text-center'
      data-test='no-data'
    >
      No Patients found. Please share a registration link with the patient or
      patient&apos;s guarantor.
    </h5>

    <div className='tw-flex tw-justify-center tw-mt-5'>
      <Button
        size=''
        variant={BUTTON_VARIANT.LIGHT}
        className='tw-w-48 tw-h-7.5 tw-items-center'
      >
        Send Registration Link
      </Button>
    </div>
  </>
)
