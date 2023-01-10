import React from 'react'
import { Button, BUTTON_VARIANT } from 'components/atoms/Button'
import Banner, { BANNER_VARIANT } from 'components/molecules/Banner'
import Images from 'src/assets/images'

export type CompleteProps = {
  reset: () => void
  isUploading?: boolean
}
export const Complete = ({ reset, isUploading = false }: CompleteProps) => {
  return (
    <div>
      <Banner
        title=''
        image={Images.DuckWithWave}
        imageProps={{
          alt: 'Goodside Health Duck',
        }}
        text='Please let your facilitator know that you have completed the questionnarie so you can proceed with your physical.'
        variant={BANNER_VARIANT.LIGHTEST}
      />
      <div className='tw-flex tw-justify-center tw-mt-12'>
        <Button
          size='lg'
          className='tw-w-full'
          variant={BUTTON_VARIANT.LIGHT}
          onClick={reset}
          isLoading={isUploading}
        >
          close
        </Button>
      </div>
    </div>
  )
}
