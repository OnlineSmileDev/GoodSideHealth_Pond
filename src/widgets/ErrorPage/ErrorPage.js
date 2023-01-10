import React from 'react'
import { Card, Container, Button, Row, Col } from 'react-bootstrap'

const ErrorPage = (
  locationChanged,
  navigateTo,
  { resetError: resetSentryError }
) => {
  if (locationChanged && resetSentryError) {
    resetSentryError()
  }

  return (
    // TODO: ADD SVG
    // TODO Make this responsive
    <div
      className='div-container'
      style={{
        minHeight: 500,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container className='d-flex justify-content-center'>
        <Card
          className='d-flex align-items-center justify-content-center'
          style={{
            maxHeight: 185,
          }}
        >
          <Card.Body>
            {/* <Card.Header> */}
            <Row>
              <Col className='d-flex align-items-center justify-content-center'>
                <h4 className='font-weight-bold'>It Look Like Fowl Weather.</h4>
              </Col>
            </Row>
            {/* </Card.Header> */}
            <Row>
              <Col
                className='d-flex align-items-center justify-content-center'
                style={{
                  // TODO: Find classname for this
                  flexDirection: 'column',
                }}
              >
                <p>
                  Something went wrong. We&apos;ve notified the development
                  team.
                </p>

                <Button variant='success' onClick={() => navigateTo()}>
                  Return to Dashboard
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  )
}

export default ErrorPage
