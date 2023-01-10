import classNames from 'classnames'
import React from 'react'
import { Image, ImageProps } from 'react-bootstrap'

export enum BANNER_VARIANT {
  LIGHT = 'light',
  LIGHTEST = 'lightest',
}

export type BannerProps = {
  title: string
  text?: string
  image?: any
  variant?: BANNER_VARIANT
  imageProps?: ImageProps
  children?: React.ReactNode
}

const Banner = ({
  title,
  text,
  image,
  imageProps = {},
  children,
  variant = BANNER_VARIANT.LIGHT,
}: BannerProps) => (
  <div
    className={classNames('tw-mt-2 tw-py-3 tw-containter tw-w-full tw-flex', {
      'tw-bg-light': variant === BANNER_VARIANT.LIGHT,
      'tw-bg-light-lightest': variant === BANNER_VARIANT.LIGHTEST,
    })}
  >
    {image && (
      <div className='tw-px-4'>
        <Image src={image} alt={imageProps.alt || ''} {...imageProps} />
      </div>
    )}
    <div className='tw-flex-col tw-self-center'>
      {title && <h5 className='tw-font-bold'>{title}</h5>}
      {children ? children : <p className='tw-mb-0'>{text}</p>}
    </div>
  </div>
)

export default Banner
