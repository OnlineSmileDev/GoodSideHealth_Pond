import React, { useState } from 'react'
import { Button, BUTTON_VARIANT } from 'components/atoms/Button'
import { Section } from 'components/atoms/Section'
import { InputWidget } from 'components/molecules/InputWidget'

export type FollowUpInstructionInputProps = {
  handleSaveInstructions: (value: string) => void
  value: string
}

// we have another component similar here: organisms/Orders/FollowUpInstructionsInput/FollowUpInstructionsInput
// maybe need to merge the two
export const FollowUpInstructionInput = ({
  handleSaveInstructions,
  value,
}: FollowUpInstructionInputProps) => {
  const [instructions, setInstructions] = useState(value || '')
  const [prevInstructions, setPrevInstructions] = useState(value || '')
  const hasNotChanged = prevInstructions === instructions

  const saveInstructions = (val: string) => {
    handleSaveInstructions(val)
    setPrevInstructions(val)
  }

  return (
    <Section title='Follow-up Instruction' horizontalRule={true}>
      <div className='tw-my-2 tw-font-hind tw-text-sm'>
        The following note will be appended to the UIL form:
      </div>
      <InputWidget
        as='textarea'
        placeholder='Your Note'
        className='tw-my-2'
        maxLength={2000}
        rows={4}
        onChange={(e) => setInstructions(e.target.value)}
        value={instructions}
      />
      <div className='tw-flex tw-flex-row tw-justify-end tw-my-2.5'>
        <Button
          name='saveFollowUpInstruction'
          size='none'
          className='tw-w-31.25'
          variant={BUTTON_VARIANT.WARNING}
          onClick={() => saveInstructions(instructions)}
          disabled={hasNotChanged}
          value={value}
        >
          Save
        </Button>
      </div>
    </Section>
  )
}
