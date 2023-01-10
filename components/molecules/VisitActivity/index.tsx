import { Button, BUTTON_VARIANT } from 'components/atoms/Button'
import { Card } from 'components/atoms/Card'

export type VisitActivityProps = {
  activities: Array<any>
  handleViewAll: (value: any) => void
}

export const VisitActivity = ({
  activities,
  handleViewAll,
}: VisitActivityProps) => {
  return (
    <Card>
      <div className='tw-flex tw-items-center tw-justify-between'>
        <div className='tw-text-base tw-font-hind tw-font-bold'>
          Visit Activity
        </div>
        <div>
          <Button
            variant={BUTTON_VARIANT.LIGHTEST}
            size='none'
            className='tw-text-primary'
            onClick={() => handleViewAll('view all')}
          >
            View All
          </Button>
        </div>
      </div>
      <div className='cards-scrollbar' data-testid='visit-activities'>
        {activities.map((item) => (
          <div
            key={`${item.time} ${item.description}`}
            className='tw-grid tw-grid-cols-3 tw-my-1.25 tw-p-0.5'
          >
            <div className='tw-text-sm tw-font-hind tw-font-bold'>
              {item.time}
            </div>
            <div className='tw-col-span-2 tw-text-sm tw-font-hind tw-px-1'>
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
