import React, { useState } from 'react'
import {
  Row,
  Col,
  Card,
  Accordion,
  Badge,
  Image,
  Button,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { VISITS_STATUS } from 'constants/visits'
import { updateVisit } from './visitItem.asyncActions'
import Icons from '../../assets/icons'
import { selectSelectedSessionVisit } from '../VisitSession/visitSession.selectors'
import { selectVisitDetails } from './visitItem.selectors'
import { TEST_RESULT } from '../ScheduleArchive/scheduleArchive.constants'
import { DEFAULT_FIELD_VALUES } from './visitItem.constants'

const ScheduleVisitItemMiddlePanel = () => {
  const router = useRouter()
  const { id } = router.query
  const visitDetails = useSelector(selectVisitDetails)
  const dispatch = useDispatch()
  const [toggle, setToggle] = useState({})
  const [showTextArea, setShowTextArea] = useState({})
  const [providerOrdersToggle, setProviderOrdersToggle] = useState(false)
  const selectedSessionVisit = useSelector(selectSelectedSessionVisit)
  const status = selectedSessionVisit.status
  const { providerNotes, reviewOfSystems, physicalExam, testReport } =
    visitDetails.visitMetadata
  const defaultFields = [
    {
      displayName: 'Review of Systems',
      field: 'reviewOfSystems',
      value: reviewOfSystems || DEFAULT_FIELD_VALUES.reviewOfSystems,
      eventKey: 1,
    },
    {
      displayName: 'Physical Exam',
      field: 'physicalExam',
      value: physicalExam || DEFAULT_FIELD_VALUES.physicalExam,
      eventKey: 2,
    },
    {
      displayName: 'Provider Notes',
      field: 'providerNotes',
      value: providerNotes || DEFAULT_FIELD_VALUES.providerNotes,
      eventKey: 3,
    },
  ]

  const [fields, setFields] = useState(defaultFields)
  const handleClick = (field) => {
    const value = fields.find((each) => each.field === field).value
    const updatedVisit = {
      visitMetadata: { ...visitDetails.visitMetadata, [field]: value },
    }
    dispatch(
      updateVisit({
        visitId: id,
        updatedVisit,
      })
    ).then(() => {
      setShowTextArea((prev) => ({ ...prev, [field]: false }))
    })
  }
  const onChangeField = (field, value) => {
    setFields((prev) =>
      prev.map((each) => {
        if (each.field === field)
          return {
            ...each,
            value,
          }
        else return each
      })
    )
  }
  return (
    <>
      {fields.map((each) => (
        <Card key={each.id} className='border-0  mb-20 shadow-sm'>
          <Card.Body className='p-20 '>
            <Accordion>
              <Row className='align-items-center'>
                <Col md={6} className='mb-4 mb-md-0'>
                  <h4 className='f-16 font-weight-bold mb-0'>
                    {each.displayName}
                  </h4>
                </Col>
                <Col md={6}>
                  <div className='d-flex align-items-center'>
                    <Accordion.Toggle
                      className='text-nowrap p-0 f-14 lh-25 btn btn-link text-dark font-weight-bold accordion-btn-left ml-auto btn-auto'
                      variant='link'
                      eventKey={each.eventKey}
                      onClick={() =>
                        setToggle((prevToggle) => ({
                          ...prevToggle,
                          [each.field]: !toggle[each.field],
                        }))
                      }
                    >
                      {toggle[each.field] ? 'Less Details' : 'More Details'}
                      <Image
                        src={
                          toggle[each.field]
                            ? Icons.arrowUpIcon
                            : Icons.arrowDownIcon
                        }
                        alt=''
                        className='ml-2'
                        width='15'
                      ></Image>
                    </Accordion.Toggle>
                  </div>
                </Col>
                <Accordion.Collapse className='col-12' eventKey={each.eventKey}>
                  <div className='pt-0'>
                    <>
                      {!showTextArea[each.field] &&
                      visitDetails.visitMetadata[each.field] ? (
                        <>
                          <div className='mb-20 line-break'>
                            {visitDetails.visitMetadata[each.field]}
                          </div>
                          <Button
                            variant='warning'
                            onClick={() =>
                              setShowTextArea((prev) => ({
                                ...prev,
                                [each.field]: true,
                              }))
                            }
                          >
                            Edit
                          </Button>
                        </>
                      ) : (
                        <>
                          <textarea
                            className='form-control mb-20'
                            id='provider-follow-up'
                            cols='30'
                            rows='15'
                            value={each.value}
                            onChange={(e) =>
                              onChangeField(each.field, e.target.value)
                            }
                          />
                          <Button
                            variant='warning'
                            className={`pendo-session-visit-${each?.displayName}-save-button`}
                            onClick={() => handleClick(each.field)}
                          >
                            Save
                          </Button>
                        </>
                      )}
                    </>
                  </div>
                </Accordion.Collapse>
              </Row>
            </Accordion>
          </Card.Body>
        </Card>
      ))}
      <Card className='border-0  mb-20 shadow-sm'>
        <Card.Body className='p-20 '>
          <Accordion defaultActiveKey={1}>
            <Row className='align-items-center'>
              <Col md={5} className='mb-4 mb-md-0'>
                <h4 className='f-16 font-weight-bold mb-0'>
                  Rapid SARS Antigen Test (COVID-19)
                </h4>
              </Col>
              <Col md={7}>
                <div className='d-flex align-items-center'>
                  <Badge
                    variant={
                      status === VISITS_STATUS.COMPLETED &&
                      testReport === TEST_RESULT.NEGATIVE
                        ? 'outline-success'
                        : status === VISITS_STATUS.WAITING ||
                          status === VISITS_STATUS.WAITING_FOR_RESULT
                        ? 'outline-warning'
                        : 'outline-danger'
                    }
                    className='f-14 font-weight-bold btn-sm ml-md-auto mr-20'
                  >
                    {testReport || 'Incomplete'}
                  </Badge>
                  <Accordion.Toggle
                    className='text-nowrap p-0 f-14 lh-25 btn btn-link text-dark font-weight-bold accordion-btn-left btn-auto'
                    variant='link'
                    eventKey={1}
                    onClick={() =>
                      setProviderOrdersToggle(!providerOrdersToggle)
                    }
                  >
                    {providerOrdersToggle ? 'More Details' : 'Less Details'}
                    <Image
                      src={
                        providerOrdersToggle
                          ? Icons.arrowDownIcon
                          : Icons.arrowUpIcon
                      }
                      alt=''
                      className='ml-2'
                      width='15'
                    ></Image>
                  </Accordion.Toggle>
                </div>
              </Col>
              <Accordion.Collapse className='col-12' eventKey={1}>
                <div className='pt-0'>
                  <div className='d-flex flex-row justify-content-between mb-2 mt-4'>
                    <h4 className='f-14 font-weight-bold lh-25 '>
                      Provider Orders
                    </h4>
                    {/* <p className='f-14 text-light font-weight-bold'>
											Submitted at 2:05 pm
										</p> */}
                  </div>
                  <p>N/A</p>
                  <div>
                    <hr className='my-25' />
                    <div className='d-flex justify-content-between  mb-10'>
                      <h4 className='f-14 font-weight-bold lh-25'>
                        Document Administration
                      </h4>
                      <p className='f-14 text-light font-weight-bold'>N/A</p>
                    </div>
                  </div>
                </div>
              </Accordion.Collapse>
            </Row>
          </Accordion>
        </Card.Body>
      </Card>
    </>
  )
}
export default ScheduleVisitItemMiddlePanel
