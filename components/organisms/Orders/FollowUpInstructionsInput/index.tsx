import React, { useState } from 'react'
import { Button, BUTTON_VARIANT } from 'components/atoms/Button'
import { InputWidget } from 'components/molecules/InputWidget'

export type FollowUpInstructionsProps = {
  followUpInstructions: string
  saveFollowUpInstructions: (object) => void
  orderType: string
  id: string
  isVisitActive: boolean
  isProvider: boolean
}

export const FollowUpInstructionsInput = ({
  followUpInstructions,
  saveFollowUpInstructions,
  orderType,
  id,
  isProvider,
  isVisitActive,
}: FollowUpInstructionsProps) => {
  const [followUpInstructionsValue, setFollowUpInstructions] =
    useState(followUpInstructions)
  return (
    <div className='tw-w-full'>
      <InputWidget
        as='textarea'
        className='tw-mb-5'
        id='provider-follow-up'
        cols={30}
        rows={4}
        placeholder='Your Instructions…'
        value={followUpInstructionsValue || ''}
        onChange={(e) => setFollowUpInstructions(e.target.value)}
      />
      <Button
        variant={BUTTON_VARIANT.WARNING}
        onClick={() => {
          saveFollowUpInstructions({
            id,
            orderType,
            followUpInstructionsValue,
            // UNUSED_CHECK: Only provider saves follow-up instructions
            isProvider,
            isVisitActive,
          })
          setFollowUpInstructions(followUpInstructionsValue)
        }}
      >
        Save
      </Button>
    </div>
  )
}
