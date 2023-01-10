import Skeleton from 'react-loading-skeleton'
import { Row, Col, Container, Card, ListGroup } from 'react-bootstrap'
import React from 'react'

const VisitItemSkeleton = () => (
  <Container fluid>
    <Row className='py-30'>
      <Col
        xl={{ span: 3, order: 1 }}
        lg={{ span: 6, order: 2 }}
        xs={{ span: 12, order: 2 }}
      >
        {Array(4)
          .fill()
          .map((each, index) => (
            <div key={index}>
              <Card className='shadow-sm border-0 mb-30'>
                <Card.Body className='p-20 mb-9.9'>
                  <Card.Title>
                    <Skeleton square={true} height={30} width={'30%'} />
                  </Card.Title>

                  {Array(6)
                    .fill()
                    .map((each, index) => (
                      <div key={index}>
                        <ListGroup variant='flush' as='ul' className='mb-9.9'>
                          <ListGroup.Item className='p-0 m row no-gutters'>
                            <Col>
                              <Skeleton width={'90%'} />
                            </Col>
                            <Col>
                              <Skeleton width={'100%'} />
                            </Col>
                          </ListGroup.Item>
                        </ListGroup>
                      </div>
                    ))}
                </Card.Body>
              </Card>
            </div>
          ))}
      </Col>
      <Col xl={{ span: 6, order: 2 }} xs={{ span: 12, order: 1 }}>
        <Card className='shadow-sm border-0 mb-20'>
          <Card.Body className='p-20'>
            <h3 className='mb-10'>
              <Skeleton width={'30%'} />
            </h3>
            <p className='mb-20'>
              <Skeleton width={'50%'} />
            </p>
            {Array(3)
              .fill()
              .map((each, index) => (
                <div key={index}>
                  <h4 className='mb-2'>
                    <Skeleton width={'45%'} />
                  </h4>
                  <p className='mb-0'>
                    <Skeleton width={'100%'} />
                  </p>
                  <hr className='my-25' />
                </div>
              ))}
          </Card.Body>
        </Card>
        <h1 className='p-20'>
          <Skeleton width={'30%'} />
        </h1>
        {Array(3)
          .fill()
          .map((each, index) => (
            <div key={index}>
              <Card className='shadow-sm border-0 mb-20'>
                <Card.Body className='p-20'>
                  <Skeleton />
                </Card.Body>
              </Card>
            </div>
          ))}
      </Col>

      <Col
        xl={{ span: 3, order: 3 }}
        lg={{ span: 6, order: 2 }}
        xs={{ span: 12, order: 3 }}
      >
        {Array(3)
          .fill()
          .map((each, index) => (
            <div key={index}>
              <Card className='shadow-sm border-0 mb-20'>
                <Card.Body>
                  <Skeleton />
                </Card.Body>
              </Card>
            </div>
          ))}
      </Col>
    </Row>
  </Container>
)

export default VisitItemSkeleton
