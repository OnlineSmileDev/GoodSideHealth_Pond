import React from 'react'
import PatientDetails from './PatientDetails'
import VisitDetails from './VisitDetails'
import VisitActivity from './VisitActivity'

const VisitItemLeftPanel = ({
  patientDetails,
  visitDetails,
  visitActivities,
}) => (
  <>
    <PatientDetails patientDetails={patientDetails} />
    <VisitDetails visitDetails={visitDetails} />
    <VisitActivity visitActivities={visitActivities} />
  </>
)

export default VisitItemLeftPanel
