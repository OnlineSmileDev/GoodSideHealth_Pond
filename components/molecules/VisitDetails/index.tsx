import { useState } from 'react'
import Disclosure, { TOGGLE_PLACEMENT } from 'components/molecules/Disclosure'
import { Label } from 'components/atoms/Label'
import { Value } from 'components/atoms/Value'
import { Button, BUTTON_VARIANT } from 'components/atoms/Button'
import { convertDateToUTCWithFullMonth } from 'utils/datePicker'

type VISIT_DETAILS = {
  visitDate: string
  visitLocation: string
  reasonForVisit: string
  additionalNotes: string
  pharmacy: {
    name: string
    address: string
  }
}

export type VisitDetailsProps = {
  visitDetails: VISIT_DETAILS
}

export const VisitDetails = ({ visitDetails }: VisitDetailsProps) => {
  const {
    visitDate,
    visitLocation,
    reasonForVisit,
    additionalNotes,
    pharmacy,
  } = visitDetails
  const [activeKey, setActiveKey] = useState({ visitDetails: true })
  const header = (
    <div className='tw-w-full tw-flex tw-justify-between tw-items-center tw-text-lg tw-font-hind tw-font-bold'>
      Visit Details
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
      <Disclosure defaultActiveKey='visitDetails'>
        <Disclosure.Body
          eventKey='visitDetails'
          header={header}
          activeKey={activeKey}
          setActiveKey={setActiveKey}
          togglePlacement={TOGGLE_PLACEMENT.FOOTER}
          toggleLabel={activeKey.visitDetails ? 'Less Details' : 'View More'}
        >
          <>
            <div className='tw-grid tw-grid-cols-1 tw-my-1.25'>
              <Label>Visit Date</Label>
              <Value>{convertDateToUTCWithFullMonth(visitDate)}</Value>
            </div>
            <div className='tw-grid tw-grid-cols-1 tw-my-1.25'>
              <Label>Visit Location</Label>
              <Value>{visitLocation}</Value>
            </div>
            <div className='tw-grid tw-grid-cols-1 tw-my-1.25'>
              <Label>Reason for Visit</Label>
              <Value>{reasonForVisit}</Value>
            </div>
            <div className='tw-grid tw-grid-cols-1 tw-my-1.25'>
              <Label>Additional Notes</Label>
              <Value data-testid='additionalNotes'>{additionalNotes}</Value>
            </div>
            <hr className='tw-h-1.25 tw-rounded tw-bg-light tw-mt-5 tw-mb-5 tw-border-0' />

            <div className='tw-grid tw-grid-cols-1 tw-my-1.25'>
              <Label>Pharmacy</Label>
              <Value>{pharmacy.name}</Value>
              <Value>{pharmacy.address}</Value>
            </div>
          </>
        </Disclosure.Body>
      </Disclosure>
    </div>
  )
}
