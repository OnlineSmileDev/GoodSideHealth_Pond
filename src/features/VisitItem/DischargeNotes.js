import React from 'react'
import { Card } from 'react-bootstrap'

const DischargeNotes = ({ notes }) => {
  const SCHOOL_EXCUSE = {
    MAY_RETURN: 'Patient may return to school Today',
    MAY_RETURN_WHEN_FEVER_FREE:
      'Patient may return to school when fever free after 24 hours without the use of a fever reducer',
  }
  const {
    mayReturn,
    mayReturnWhenFeverFree,
    otherNote,
    pcpNote,
    facilitatorVisitSummary,
    providerVisitSummary,
  } = notes

  const getSchoolExcuse = () => {
    if (mayReturn) return SCHOOL_EXCUSE.MAY_RETURN
    else if (mayReturnWhenFeverFree)
      return SCHOOL_EXCUSE.MAY_RETURN_WHEN_FEVER_FREE
    else if (otherNote) return otherNote
    else if (pcpNote) return pcpNote
    else return 'N/A'
  }

  return (
    <Card className='shadow-sm border-0 mb-20'>
      <Card.Body className='p-20'>
        <h3 className='lh-25 f-18  font-weight-bold mb-10'>Discharge Notes</h3>
        <p className='f-12 font-semi-bold mb-20'>
          <span className='status-sign bg-success d-inline-block rounded-circle mr-2'></span>
          {getSchoolExcuse()}
        </p>

        <h4 className='f-14 font-weight-bold lh-25 mb-2'>
          Provider After Visit Summary
        </h4>
        <p className='f-14 mb-0 discharge-summary'>
          {providerVisitSummary || 'N/A'}
        </p>

        <hr className='my-25' />
        <h4 className='f-14 font-weight-bold lh-25 mb-10'>
          Nurse After Visit Summary
        </h4>
        <p className='f-14 mb-0 discharge-summary'>
          {facilitatorVisitSummary || 'N/A'}
        </p>
      </Card.Body>
    </Card>
  )
}
export default DischargeNotes
