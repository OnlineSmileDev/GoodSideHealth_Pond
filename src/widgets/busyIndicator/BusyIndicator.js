import React from 'react'
import { useSelector } from 'react-redux'
import { getNamedBusyIndicator } from './busyIndicator.selectors'
import Icons from '../../assets/icons'
import { Image } from 'react-bootstrap'

export default function BusyIndicator({ busyIndicatorName, children }) {
  const show = useSelector(getNamedBusyIndicator(busyIndicatorName))
  const hasContentToDisplay =
    !show && children && (children.length === undefined || children.length > 0)

  return (
    <React.Fragment>
      {show ? (
        <div className='d-flex justify-content-center'>
          <Image src={Icons.loadingIcon} className='size' alt='Loading...' />
        </div>
      ) : (
        <React.Fragment>
          {hasContentToDisplay ? children : <ContentNotFound />}
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

function ContentNotFound() {
  return <p>No content found</p>
}
