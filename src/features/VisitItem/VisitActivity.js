import React from 'react'
import { Col, Card, ListGroup, Button } from 'react-bootstrap'
import { getLocaleFormattedDate } from 'utils/getLocaleFormattedDate'
import { getFormattedTime } from 'utils/getFormattedTime'
import { actions } from './visitItem.slice'
import { VISIT_ITEM_MODALS } from '../visitItemModals/visitItemModal.constants'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { useFetchVisitActivity } from './visitItem.effects'

const { setSelectedVisitItemModal } = actions

const VisitActivity = ({ visitActivities }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { id: visitId } = router.query

  useFetchVisitActivity(visitId)

  const formattedVisitActivities =
    visitActivities &&
    visitActivities.map((each) => {
      const { id, createdAt, description } = each
      const time = getFormattedTime(createdAt)
      return { id, time, description, createdAt }
    })

  const getSortedVisitActivities = (visits) => {
    return visits.sort(
      (firstVisit, secondVisit) =>
        new Date(firstVisit.createdAt) - new Date(secondVisit.createdAt)
    )
  }

  return (
    <Card className='shadow-sm border-0 mb-30'>
      <Card.Body className='p-20'>
        <div className='d-flex align-items-center mb-10'>
          <Card.Title className='font-weight-bold gotham lh-25 d-block mb-10 f-16'>
            Visit Activity
          </Card.Title>
          <Button
            className='font-weight-bold ml-auto btn-auto p-0'
            variant='link'
            onClick={() =>
              dispatch(
                setSelectedVisitItemModal(VISIT_ITEM_MODALS.VISIT_ACTIVITY)
              )
            }
          >
            View All
          </Button>
        </div>

        <ListGroup variant='flush' as='ul' className='cards-scrollbar d-block'>
          {getSortedVisitActivities(formattedVisitActivities).map((each, i) => (
            <ListGroup.Item
              key={i}
              as='li'
              className='border-0 p-0 row no-gutters f-14 lh-25 mb-1'
            >
              <Col md={3}>
                <strong>{getLocaleFormattedDate(each.time)}</strong>
              </Col>
              <Col md={9}>
                <span> {each.description}</span>
              </Col>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  )
}

export default VisitActivity
