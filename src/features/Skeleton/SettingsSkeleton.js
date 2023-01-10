import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { Row, Col, Card } from 'react-bootstrap'

const SettingsSkeleton = () => (
  <Row>
    <Col>
      <Card>
        <Card.Body>
          <h4>
            <Skeleton width={'100%'} />
          </h4>
          <Skeleton count={7} />
          <Skeleton width={`20%`} />
        </Card.Body>
      </Card>
    </Col>
    <Col>
      <Card>
        <Card.Body>
          <h4>
            <Skeleton width={'100%'} />
          </h4>
          <Skeleton count={4} />
          <Skeleton width={`20%`} />
        </Card.Body>
      </Card>
    </Col>
  </Row>
)

export default SettingsSkeleton
