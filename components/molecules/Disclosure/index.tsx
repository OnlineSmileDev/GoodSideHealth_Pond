import React, { ReactNode } from 'react'
import { Accordion, Image } from 'react-bootstrap'
import { Card, CARD_VARIANT } from 'components/atoms/Card'
import Icons from '../../../src/assets/icons'

export type DisclosureProps = {
  children: ReactNode
  defaultActiveKey?: string
}

const Disclosure = ({ children, defaultActiveKey }: DisclosureProps) => (
  <Accordion defaultActiveKey={defaultActiveKey}>{children}</Accordion>
)

type DisclosureToggleProps = {
  eventKey: string
  children?: ReactNode
  activeKey: object
  setActiveKey: (value: object) => void
}

const DisclosureToggle = ({
  eventKey,
  children,
  activeKey,
  setActiveKey,
}: DisclosureToggleProps) => {
  const isOpen = activeKey[eventKey]
  return (
    <div className='tw-flex tw-justify-end'>
      <Accordion.Toggle
        //@ts-ignore
        variant='link'
        eventKey={eventKey}
        onClick={() => setActiveKey({ [eventKey]: !isOpen })}
      >
        <div className='tw-flex tw-flex-row tw-gap-1 tw-items-center'>
          {children && (
            <div className='tw-text-sm tw-font-hind tw-font-bold'>
              {children}
            </div>
          )}
          <Image
            src={isOpen ? Icons.blackUpArrow : Icons.blackDownArrow}
            alt='arrowIcon'
          />
        </div>
      </Accordion.Toggle>
    </div>
  )
}

export enum TOGGLE_PLACEMENT {
  HEADER = 'header',
  FOOTER = 'footer',
}

export type DisclosureBodyProps = {
  variant?: CARD_VARIANT
  eventKey: string
  header: ReactNode
  children: ReactNode
  activeKey: object
  togglePlacement?: TOGGLE_PLACEMENT
  toggleLabel?: string
  setActiveKey: (value: object) => void
}

const DisclosureBody = ({
  variant,
  eventKey,
  header,
  children,
  activeKey,
  togglePlacement = TOGGLE_PLACEMENT.HEADER,
  toggleLabel,
  setActiveKey,
}: DisclosureBodyProps) => {
  const toggle = (
    <DisclosureToggle
      eventKey={eventKey}
      activeKey={activeKey}
      setActiveKey={setActiveKey}
    >
      {toggleLabel}
    </DisclosureToggle>
  )

  return (
    <Card className='tw-py-2.5' variant={variant}>
      <div
        className='tw-flex tw-justify-between tw-items-start lg:tw-flex-row md:tw-flex-row sm:tw-flex-col tw-flex-col md:tw-items-center'
        data-testid='disclosure-body'
      >
        {header}
        {togglePlacement === TOGGLE_PLACEMENT.HEADER && toggle}
      </div>
      <Accordion.Collapse eventKey={eventKey} data-testid='disclosure-collapse'>
        {/* @ts-ignore */}
        {children}
      </Accordion.Collapse>
      {togglePlacement === TOGGLE_PLACEMENT.FOOTER && toggle}
    </Card>
  )
}
Disclosure.Body = DisclosureBody
export default Disclosure

export { CARD_VARIANT as DISCLOSURE_VARIANT }
