import classNames from 'classnames'
import { Image } from 'react-bootstrap'
import ImageIcon from 'src/assets/images'

export const LABEL_POSITIONS = {
  TOP: 'top',
  BOTTOM: 'bottom',
}

export type CustomStepperProps = {
  steps: Array<any>
  activeStep: number
  labelPosition?: string
}

export const CustomStepper = ({
  steps,
  activeStep,
  labelPosition = LABEL_POSITIONS.TOP,
}: CustomStepperProps) => {
  return (
    <div
      className='tw-full tw-flex tw-flex-row tw-items-center tw-my-10'
      data-testid='steps'
    >
      {steps.map((item, index) => (
        <div
          className={classNames('tw-w-full tw-h-1.25 tw-relative', {
            'tw-bg-success': index <= activeStep,
            'tw-bg-light': index > activeStep,
          })}
          key={index}
          data-testid={`step-${index}`}
        >
          <div
            className={classNames(
              'tw-text-sm tw-font-hind tw-font-bold tw-text-center tw-relative',
              {
                'tw--top-9': labelPosition === LABEL_POSITIONS.TOP,
                'tw-top-7': labelPosition === LABEL_POSITIONS.BOTTOM,
              }
            )}
          >
            {item.label}
          </div>
          <div className='tw-h-6.25 tw-w-6.25 tw-rounded-full tw-bg-light tw-border-2 tw-border-white tw-absolute tw-top-1/2 tw-left-1/2 tw-transform tw--translate-x-1/2 tw--translate-y-1/2'>
            {index <= activeStep ? (
              <div className='tw-border-2 tw-border-success tw-rounded-full'>
                <Image src={ImageIcon.logoCircle} alt='logo circle' />
              </div>
            ) : (
              <div className='tw-font-bold tw-text-sm tw-text-center'>
                {index + 1}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
