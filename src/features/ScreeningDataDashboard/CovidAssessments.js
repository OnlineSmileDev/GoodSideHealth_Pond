import React, { useEffect } from 'react'
import CertifyStudent from './CertifyStudent'
import SubmissionByLocation from './SubmissionByLocation'
import TotalSubmissionsTable from './TotalSubmissionsTable'
import PieChart from './PieChart'
import MixedGraph from './MixedGraph'
import { Row, Col, TabContent, TabPane } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchScreeningAggregate } from './screeningDataDashboard.asyncActions'
import { selectDashboardFilters } from './screeningDataDashboard.selectors'

export const CovidAssessments = () => {
  const dispatch = useDispatch()
  const dashboardFilters = useSelector(selectDashboardFilters)

  useEffect(() => {
    // TODO - here aggregate filters need to be added
    dispatch(fetchScreeningAggregate(dashboardFilters))
  }, [dispatch, dashboardFilters])
  return (
    <>
      <TabContent id='myTabContent'>
        <TabPane
          className='fade active show bg-white px-15 py-30'
          id='tab2'
          role='tabpanel'
        >
          <Row>
            <Col lg={4} xl={4}>
              <CertifyStudent />
            </Col>
            <Col lg={4} xl={4} className='mb-30'>
              <PieChart />
            </Col>
            <Col lg={4} xl={4} className='mb-30'>
              <MixedGraph />
            </Col>
          </Row>
          <SubmissionByLocation />
          <TotalSubmissionsTable />
        </TabPane>
      </TabContent>
    </>
  )
}
