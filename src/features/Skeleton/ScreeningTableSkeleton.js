import Skeleton from 'react-loading-skeleton'
import React from 'react'

const ScreeningTableSkeleton = ({ columns }) => {
  return (
    <div className='skeleton-columns'>
      <div className='d-flex'>
        {Array(columns)
          .fill()
          .map((each, index) => (
            <Skeleton
              duration={1}
              square={true}
              height={35}
              key={`col-${index}`}
            />
          ))}
      </div>
    </div>
  )
}
export default ScreeningTableSkeleton
