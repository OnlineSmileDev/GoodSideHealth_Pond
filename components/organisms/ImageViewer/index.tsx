import React, { ReactNode } from 'react'
import { Image } from 'react-bootstrap'
import { Modal } from 'components/molecules/Modal'

export type ImageViewerProps = {
  image: object
  reset: () => void
}

export const ImageViewer = ({ image, reset }) => {
  return (
    <Modal reset={reset} title={image.name} footer={<div />} size='md'>
      <div className='tw-w-full tw-h-60vh'>
        <Image
          src={image.url}
          className='tw-w-full tw-h-full tw-object-contain'
          alt={image.name}
        />
      </div>
    </Modal>
  )
}
