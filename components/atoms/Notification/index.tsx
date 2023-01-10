import { Ref } from 'react'
import classNames from 'classnames'

export enum NOTIFICATION_VARIANT {
  SUCCESS = 'success',
  DANGER = 'danger',
  WARNING = 'warning',
}

export type NotificationProps = {
  message: string
  variant: NOTIFICATION_VARIANT
  notificationRef?: Ref<HTMLDivElement>
}

export const Notification = ({
  message,
  variant = NOTIFICATION_VARIANT.WARNING,
  notificationRef,
}: NotificationProps) => {
  const { DANGER, SUCCESS, WARNING } = NOTIFICATION_VARIANT
  return (
    <div
      ref={notificationRef}
      className={classNames(
        ' tw-w-full tw-flex tw-h-12 tw-items-center tw-px-5 tw-rounded tw-py-1',
        {
          'tw-bg-danger-darker': variant === DANGER,
          'tw-bg-success': variant === SUCCESS,
          'tw-bg-warning': variant === WARNING,
        }
      )}
    >
      <span className='tw-font-hind tw-text-xs tw-font-bold tw-text-white'>
        {message}
      </span>
    </div>
  )
}
