import React from 'react'
import { Image, Col, Card } from 'react-bootstrap'
import Icons from '../assets/icons'

export const EmptyVisitDataAfterSearch = () => (
  <div className='bg-light p-1'>
    <div className='text-center empty-data-indicator mx-auto d-flex flex-column align-items-center'>
      <div className='my-50'>
        <Image
          src={Icons.searchIcon}
          alt='search-icon'
          width='95px'
          height='95px'
        />
      </div>
      <div className='mb-50'>
        <span className='f-18 font-weight-bold lh-45'>
          <h4>There are no results that meet your criteria.</h4>
        </span>
        <span className='f-18 hind lh-25'>
          Please try again with another filter.
        </span>
      </div>
      <div className='mb-50'>
        <Image
          src={Icons.healthBoxIcon}
          alt='healthbox-icon'
          width='97px'
          height='77px'
        />
      </div>
    </div>
  </div>
)

export const EmptyVisitData = () => (
  <div className='text-center my-50 empty-data'>
    <div className='mb-4'>
      <Image
        src={Icons.logoIcon}
        alt='logo-icon'
        width='249px'
        height='258px'
      />
    </div>
    <h4 className='f-18 font-weight-bold mb-3'>You&apos;re All Done!</h4>
    <span className='f-18 hind lh-25'>
      There are no visits in your queue. Check back soon.
    </span>
  </div>
)

export const EmptyVisitDataCard = () => (
  <Col md={12}>
    <Card className='patient-card border-0'>
      <Card.Body className='py-20 px-40'>
        <div
          className='d-flex align-items-center'
          data-test='empty-visit-data-card'
        >
          <div className='icon mr-4'>
            <Image
              src={Icons.emptyVisit}
              alt='logo-icon'
              width='70px'
              height='70px'
            />
          </div>
          <div>
            <h4 className='f-22 lh-40 mb-1 font-weight-bold'>
              There Are No Visits Available
            </h4>
            <p className='lh-25 f-14 mb-0'>
              There are no visits that meet the currently-selected criteria.
              Please check back later.
            </p>
          </div>
        </div>
      </Card.Body>
    </Card>
  </Col>
)
