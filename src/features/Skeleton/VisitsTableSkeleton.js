import Skeleton from 'react-loading-skeleton'
import React from 'react'
import { Card, Container } from 'react-bootstrap'

const VisitsTableSkeleton = ({ columns }) => (
  <Container fluid>
    <Card>
      <div className='skeleton-columns'>
        <Skeleton duration={1} square={true} height={35} />
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
    </Card>
  </Container>
)
export default VisitsTableSkeleton
