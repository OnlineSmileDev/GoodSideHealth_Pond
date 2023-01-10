import React from 'react'
import { Image } from 'react-bootstrap'
import { Card } from 'components/atoms/Card'
import Icons from '../../../src/assets/icons'

export const EmptyOrderCard = () => {
  return (
    <Card className='tw-flex tw-items-center tw-flex-col tw-pt-12'>
      <Image
        alt='Empty Order Icon'
        width='100'
        height='100'
        src={Icons.nullIcon}
        className='tw-mb-5 tw-mt-12'
      />
      <div
        className='tw-text-lg tw-font-medium mb-5'
        data-testid='empty-order-card'
      >
        There Are Not Currently Any Orders
      </div>
    </Card>
  )
}
