import React from 'react'
import { Button, BUTTON_VARIANT } from 'components/atoms/Button'

export type StationSkipperProps = {
  name: string
  handleAction: () => void
}

export const StationSkipper = ({ name, handleAction }: StationSkipperProps) => {
  return (
    <>
      <div className='tw-text-sm tw-font-hind tw-px-5 tw-pt-4'>
        Please inform the following patients to bypass the Screener station:
      </div>
      <div className='tw-text-sm tw-font-bold tw-font-hind tw-py-3.5 tw-px-5'>
        Student
      </div>
      <div className='tw-text-sm tw-font-hind tw-py-3.5 tw-bg-light tw-px-5'>
        {name}
      </div>

      <div className='tw-flex tw-justify-end tw-w-full tw-mt-12.25 tw-pr-5 tw-pb-5'>
        <Button variant={BUTTON_VARIANT.LIGHT} size='sm' onClick={handleAction}>
          Close
        </Button>
      </div>
    </>
  )
}
