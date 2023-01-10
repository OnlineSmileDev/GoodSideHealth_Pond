import React, { useState } from 'react'
import moment from 'moment'
import classNames from 'classnames'
import { Image } from 'react-bootstrap'
import { Tooltip } from 'components/atoms/Tooltip'
import { Button } from 'components/atoms/Button'
import Icons from '../../../../src/assets/icons'
import { downloadImage, getInitialsFollowedBySurname } from './utils'

export type MessageProps = {
  messageDetails: any
  setImageForView: (imageForView: {
    show: boolean
    url: string
    name: string
  }) => void
}

export const Message = ({ messageDetails, setImageForView }: MessageProps) => {
  const [imageLoading, setImageLoading] = useState(true)
  const {
    message,
    createdAt,
    messageType,
    imageUrl,
    name,
    isSent,
    type,
    _sender: { nickname },
  } = messageDetails

  const getMessageString = () => {
    if (messageType === 'file') {
      return (
        <>
          <div
            className={classNames(
              'tw-opacity-0 group-hover:tw-opacity-100 tw-flex tw-flex-row tw-absolute tw-z-5 tw-p-1',
              {
                'tw-bottom-0 tw-left-0 tw-bg-primary hover:tw-bg-primary-lighter tw-rounded':
                  isSent,
              },
              {
                'tw-bottom-0 tw-right-0 tw-bg-light hover:tw-bg-light-lighter tw-rounded':
                  !isSent,
              }
            )}
          >
            <Tooltip text='Download'>
              <Button
                size='xs'
                className='tw-p-0.5'
                onClick={() => downloadImage(imageUrl, name)}
              >
                <Image
                  src={Icons.download}
                  alt='download'
                  className='tw-w-full tw-h-full'
                />
              </Button>
            </Tooltip>
          </div>
          {type.includes('image') ? (
            <div
              className='tw-w-full tw-h-full tw-flex tw-flex-row tw-items-center tw-justify-center tw-relative'
              onClick={() =>
                setImageForView({ show: true, url: imageUrl, name })
              }
            >
              <Image
                src={imageUrl}
                alt={name}
                onLoad={() => setImageLoading(false)}
              />
              {imageLoading && (
                <div className='tw-flex tw-flex-row tw-items-center tw-justify-center tw-absolute tw-z-0'>
                  <Image src={Icons.loadingIcon} alt='Loading...' width={40} />
                </div>
              )}
            </div>
          ) : (
            <div className='tw-flex tw-items-center'>
              <div className='tw-flex-shrink-0 tw-w-10'>
                <Image
                  src={type.includes('pdf') ? Icons.pdfFile : Icons.file}
                  height='10'
                  alt='file'
                />
              </div>
              <div className='tw-ml-4'>
                <h2 className='tw-text-base tw-font-hind tw-font-bold tw-break-all'>
                  {name}
                </h2>
              </div>
            </div>
          )}
        </>
      )
    } else {
      return <p className='tw-break-all'>{message}</p>
    }
  }

  return (
    <div className='tw-mb-6 tw-flex tw-flex-col tw-relative'>
      <div
        className={classNames(
          'tw-rounded tw-px-2.5 tw-py-1.5 tw-text-sm tw-relative tw-cursor-pointer tw-flex tw-flex-row tw-items-center tw-justify-center tw-group',
          {
            'tw-bg-light chat-left tw-self-start tw-ml-4': !isSent,
            'tw-bg-primary tw-text-white tw-self-end tw-mr-4 chat-right':
              isSent,
            'tw-cursor-text': messageType === 'user',
            ' tw-min-w-5 tw-min-h-4': messageType === 'file',
          }
        )}
      >
        <div className='tw-flex tw-flex-col'>
          <div className='tw-text-xs tw-mb-0.5 tw-font-semibold tw-text-left'>
            {getInitialsFollowedBySurname(nickname)}
          </div>
          <div data-testid='message-data'>{getMessageString()}</div>
        </div>
      </div>
      <div
        data-testid='message-time'
        className={classNames('f-10 tw-mt-1 tw-font-light', {
          'tw-text-right': isSent,
        })}
      >
        {moment(createdAt).calendar()}
      </div>
    </div>
  )
}
