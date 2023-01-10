import { Image } from 'react-bootstrap'
import Icons from '../../../src/assets/icons'

export const NoCostBadge = () => {
  return (
    <span className='tw-w-6.25 tw-h-6.25 tw-mr-1 tw-flex'>
      <Image src={Icons.noCostBadge} alt='No Cost badge' width={25} />
    </span>
  )
}
