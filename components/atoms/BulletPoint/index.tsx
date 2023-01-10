import { ReactNode } from 'react'
import classNames from 'classnames'

export type BulletPointProps = {
  size?: 'small' | 'medium' | 'large'
  color?: 'green' | 'orange' | 'red'
  children?: ReactNode
}

// this component was taken from Registration and put into the component library
// but the component library isn't rpoduction ready yet
export const BulletPoint = ({
  color = 'green',
  size = 'small',
  children,
}: BulletPointProps) => (
  <div
    className={classNames(
      'tw-rounded-full tw-flex tw-text-white tw-font-bold tw-justify-center tw-mr-1',
      {
        'tw-bg-orange-400': color === 'orange',
        'tw-bg-green-400': color === 'green',
        'tw-bg-red-400': color === 'red',
        'tw-w-2 tw-h-2': size === 'small',
        'tw-w-4 tw-h-4': size === 'medium',
        'tw-w-6 tw-h-6': size === 'large',
        'tw-pt-0.5': children,
      }
    )}
  >
    {children}
  </div>
)
