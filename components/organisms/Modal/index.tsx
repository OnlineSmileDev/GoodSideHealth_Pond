import React, { ReactNode } from 'react'
import ReactModal from 'react-modal'
import classNames from 'classnames'
import { Image } from 'react-bootstrap'
import icons from 'src/assets/icons'

export enum MODAL_SIZE {
  MD = 'medium',
  FULL = 'full',
}

export enum CONTAINER_WIDTH {
  MD = 'medium',
  FULL = 'full',
}

export type ModalProps = {
  title?: string
  subtitle?: string
  onClose: () => void
  size?: MODAL_SIZE
  contentContainerSize?: CONTAINER_WIDTH
  isBackdropOpaque?: boolean
  isOpen?: boolean
  children: ReactNode
}

const { MD, FULL } = MODAL_SIZE

export const Modal = ({
  title = '',
  subtitle = '',
  onClose,
  size = MODAL_SIZE.MD,
  contentContainerSize = CONTAINER_WIDTH.FULL,
  isBackdropOpaque,
  children,
  isOpen,
}: ModalProps) => {
  const modalName = 'modal-' + title?.replace(/\s/g, '-').toLowerCase()

  return (
    <ReactModal
      id={modalName}
      overlayClassName={classNames(
        'tw-fixed tw-inset-0',
        { 'tw-overflow-y-scroll': size === MD },
        { 'tw-bg-pondBlueBgOverlay': !isBackdropOpaque },
        { 'tw-bg-pondBlueOpaqueBgOverlay': isBackdropOpaque }
      )}
      className={classNames(
        'mx-auto tw-w-auto tw-flex tw-items-center tw-overflow-auto outline-none tw-min-h-full',
        { 'sm:tw-my-7 sm:tw-max-w-690 tw-rounded-md': size === MD },
        { 'tw-h-full': size === FULL }
      )}
      isOpen={isOpen}
      bodyOpenClassName='tw-overflow-hidden'
      ariaHideApp={false}
    >
      <div
        className={classNames(
          'tw-bg-clip-padding tw-pointer-events-auto tw-bg-white tw-relative tw-flex tw-flex-col tw-w-full tw-outline-none tw-border tw-border-gray-300',
          { 'tw-rounded-none tw-h-full': size === FULL },
          { 'tw-rounded-md': size === MD }
        )}
      >
        <div
          className={classNames(
            'tw-flex tw-items-center p-20  tw-justify-between',
            { 'tw-border-b-2 tw-border-slate-600': size === FULL }
          )}
        >
          <div className='title'>
            <div
              className={classNames({
                'tw-text-sm tw-font-hind tw-font-bold': size === MD,
                'f-16 font-weight-bold lh-30': size === FULL,
              })}
            >
              {title}
            </div>
            {subtitle && (
              <div
                className={classNames({
                  'tw-text-22 tw-text-black tw-font-bold': size === MD,
                  'f-14 font-weight-bold tw-leading-4 tw-text-gray-500':
                    size === FULL,
                })}
              >
                {subtitle}
              </div>
            )}
          </div>
          <button
            className={classNames(
              'onClose p-0 d-flex align-items-center tw-w-12',
              { 'tw-flex tw-self-start': size === MD }
            )}
            onClick={() => onClose()}
          >
            <Image src={icons.closeIcon} alt='onClose' className='tw-w-6.25' />
          </button>
        </div>
        <div className='tw-flex tw-flex-auto tw-justify-center py-20 tw-overflow-auto'>
          <div
            className={classNames('tw-flex-auto', {
              'tw-max-w-1/2': contentContainerSize === CONTAINER_WIDTH.MD,
            })}
          >
            {children}
          </div>
        </div>
      </div>
    </ReactModal>
  )
}
