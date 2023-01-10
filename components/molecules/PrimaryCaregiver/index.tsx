import React, { useState } from 'react'
import Disclosure, { TOGGLE_PLACEMENT } from 'components/molecules/Disclosure'
import { Button, BUTTON_VARIANT } from 'components/atoms/Button'
import { Label } from 'components/atoms/Label'
import { Value } from 'components/atoms/Value'

export type PrimaryCaregiverProps = {
  name: string
  relationship: string
  phoneNumber: string
}

export const PrimaryCaregiver = ({
  name,
  relationship,
  phoneNumber,
}: PrimaryCaregiverProps) => {
  const [activeKey, setActiveKey] = useState({ primaryCaregiver: true })
  const header = (
    <div className='tw-w-full tw-flex tw-justify-between tw-items-center tw-text-lg tw-font-hind tw-font-bold'>
      Primary Caregiver
      <Button
        variant={BUTTON_VARIANT.LIGHTEST}
        size='none'
        className='tw-text-primary'
        onClick={() => console.log('edit')}
      >
        Edit
      </Button>
    </div>
  )
  return (
    <div className='tw-mb-7'>
      <Disclosure defaultActiveKey='primaryCaregiver'>
        <Disclosure.Body
          eventKey='primaryCaregiver'
          header={header}
          activeKey={activeKey}
          setActiveKey={setActiveKey}
          togglePlacement={TOGGLE_PLACEMENT.FOOTER}
          toggleLabel={
            activeKey.primaryCaregiver ? 'Less Details' : 'View More'
          }
        >
          <>
            <div className='tw-grid tw-grid-cols-1 tw-my-1.25'>
              <Label>Name</Label>
              <Value>{name}</Value>
            </div>
            <div className='tw-grid tw-grid-cols-1 tw-my-1.25'>
              <Label>Relationship</Label>
              <Value>{relationship}</Value>
            </div>
            <div className='tw-grid tw-grid-cols-1 tw-my-1.25'>
              <Label>Phone Number</Label>
              <Value>{phoneNumber}</Value>
            </div>
          </>
        </Disclosure.Body>
      </Disclosure>
    </div>
  )
}
