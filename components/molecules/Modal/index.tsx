import { ReactNode, useState } from 'react'
import Image from 'react-bootstrap/Image'
import Icons from '../../../src/assets/icons'
import classNames from 'classnames'
import { Button, BUTTON_VARIANT } from 'components/atoms/Button'

export type ModalProps = {
  reset: () => void
  title: string
  onClose?: Boolean
  children: ReactNode
  footer: ReactNode
  size?: string
  isHeader?: Boolean
  isFullHeader?: Boolean
  isClaimVisitRequestModal?: Boolean
}

export const Modal = ({
  reset,
  title,
  onClose = true,
  children,
  // backdrop,
  footer,
  size = 'sm',
  isHeader = true,
  isFullHeader = true,
  // isFullWidth = false,
  isClaimVisitRequestModal = false,
}: ModalProps) => {
  const [isOpen, setIsOpen] = useState(true)

  const handleClose = () => {
    if (reset) reset()
    setIsOpen(false)
  }

  return isOpen ? (
    <div
      className='tw-fixed tw-z-10 tw-left-0 tw-top-0 tw-flex tw-items-center tw-justify-center tw-w-screen tw-h-screen tw-bg-pondBlue tw-bg-opacity-75 tw-overflow-auto'
      // It will close modal on click outside the modal
      onClick={handleClose}
    >
      <div
        className={classNames(
          'tw-fixed tw-z-50 tw-w-11/12 tw-bg-white tw-rounded tw-shadow-lg',
          { 'tw-max-w-2xl': size === 'sm' },
          { 'tw-w-4/5 tw-h-4/5': size === 'md' }
        )}
        onClick={(e) => {
          // It will handle close functionality inside the modal
          e.stopPropagation()
        }}
      >
        {isHeader && (
          <div
            className={classNames(
              'tw-flex tw-text-base tw-leading-7 tw-font-bold tw-p-5',
              {
                'tw-pb-7 tw-font-hind': isClaimVisitRequestModal,
                'tw-p-0': isFullHeader,
              }
            )}
          >
            {title}
            {onClose && (
              <Button
                className='tw-ml-auto tw-inline-flex tw-items-center tw-justify-end tw-max-h-2.5 tw-opacity-75'
                onClick={handleClose}
                variant={BUTTON_VARIANT.LIGHTEST}
              >
                <span className='tw-text-sm tw-mr-2 tw-text-pondBlack tw-font-bold'>
                  Cancel
                </span>

                <Image src={Icons.closeIcon} alt='close' className='tw-w-4' />
              </Button>
            )}
          </div>
        )}
        <div className='tw-px-5'>{children}</div>
        <div
          className={classNames(
            'tw-flex tw-justify-start tw-items-center tw-flex-wrap tw-border-0 tw-p-5'
          )}
        >
          {footer}
        </div>
      </div>
    </div>
  ) : null
}
