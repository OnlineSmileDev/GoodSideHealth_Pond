import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { Container, Card, Row, Col, Image } from 'react-bootstrap'
import IMAGES from '../../assets/images'
import Icon from '../../assets/icons'
import { approveUser } from './users.asyncActions'

export default function UserApproval() {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(approveUser({ id }))
  }, [dispatch, id])

  return (
    <div className='container-div'>
      <Container className='onboarding-container'>
        <Row
          style={{
            maxHeight: 500,
          }}
        >
          <Col className='p-0' sm={4}>
            <Image
              src={IMAGES.labImage}
              alt='lab-image'
              height='100%'
              width='100%'
              style={{
                maxHeight: 500,
              }}
            />
          </Col>
          <Col className='p-0' sm={8}>
            <Card
              style={{
                height: '100%',
              }}
            >
              <Card.Body className='pl-5'>
                <Row
                  style={{
                    margin: '50px 0 30px 0',
                  }}
                >
                  <Col className='d-flex align-items-center justify-content-center'>
                    <Image
                      src={IMAGES.logo}
                      alt='lab-image'
                      width='100%'
                      style={{
                        maxWidth: 300,
                      }}
                    />
                  </Col>
                </Row>
                <Row className='mb-5'>
                  <Col className='d-flex justify-content-center'>
                    <Image
                      src={Icon.blackCheckIcon}
                      alt='check-icon'
                      height='50'
                      width='100%'
                    />
                  </Col>
                </Row>
                <Row
                  style={{
                    marginBottom: 30,
                  }}
                >
                  <Col>
                    <h3 className='f-16 font-weight-bold text-align-center align-center'>
                      You have approved user access to Pond.md. They will
                      receive an email notifying their approval.
                    </h3>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <footer className='f-10'>
        ©{new Date().getFullYear()} Urgent Care For Families
      </footer>
    </div>
  )
}
