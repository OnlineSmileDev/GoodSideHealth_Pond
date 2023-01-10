import React from 'react'
import { Card } from 'components/atoms/Card'
import { Indicator, INDICATOR_VARIANT } from 'components/atoms/Indicator'

export enum VISIT_STATUS_INDICATOR {
  IN_PROGRESS = 'In Progress',
  COMPLETE = 'Completed',
}

export type VisitStatusProps = {
  status: VISIT_STATUS_INDICATOR
}

export const VisitStatus = ({
  status = VISIT_STATUS_INDICATOR.IN_PROGRESS,
}: VisitStatusProps) => {
  const getVisitIndicator = (status) => {
    switch (status) {
      case VISIT_STATUS_INDICATOR.IN_PROGRESS:
        return INDICATOR_VARIANT.SUCCESS
      case VISIT_STATUS_INDICATOR.COMPLETE:
        return INDICATOR_VARIANT.PRIMARY
      default:
        null
    }
  }

  return (
    <Card className='tw-my-5 tw-p-3.5'>
      <div className='tw-grid tw-grid-cols-2 tw-items-center'>
        <div className='tw-text-sm tw-font-hind tw-font-bold tw-px-5 tw-mt-1'>
          Visit Status
        </div>
        <div className='tw-pr-5'>
          <Indicator variant={getVisitIndicator(status)} dataTestId={status}>
            {status}
          </Indicator>
        </div>
      </div>
    </Card>
  )
}
