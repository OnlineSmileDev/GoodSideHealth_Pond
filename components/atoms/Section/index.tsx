import classNames from 'classnames'
import { ReactNode } from 'react'

export type SectionProps = {
  title: string
  className?: string
  meta?: string
  children?: ReactNode
  horizontalRule?: boolean
}

export const Section = ({
  title,
  className,
  meta,
  children,
  horizontalRule,
}: SectionProps) => {
  return (
    <div className='tw-w-full'>
      {horizontalRule && <hr className='tw-my-6' />}
      <div className='tw-flex tw-justify-between tw-mb-2.5 tw-mt-6'>
        <h4
          className={classNames(
            'tw-text-sm tw-font-bold tw-leading-6',
            className
          )}
        >
          {title}
        </h4>
        {meta && (
          <p className='tw-text-sm tw-opacity-50 tw-font-bold'>{meta}</p>
        )}
      </div>
      {children && (
        <div className='tw-text-sm tw-mb-5 tw-whitespace-pre-wrap'>
          {children}
        </div>
      )}
    </div>
  )
}
