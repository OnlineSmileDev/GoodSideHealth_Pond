import React from 'react'
import { useSelector } from 'react-redux'
import { Card, Col } from 'react-bootstrap'
import dynamic from 'next/dynamic'
import { BUSY_INDICATOR_NAME } from 'constants/busyIndicator'
import { isEmpty } from 'utils/isEmpty'
import { selectScreeningCountsByGrade } from './screeningDataDashboard.selectors'
import BusyIndicator from '../../widgets/busyIndicator'
const Bar = dynamic(() => import('react-chartjs-2').then((mod) => mod.Bar))

//	TODO: Should we keep this component for future usage?
const StackedGraph = () => {
  const screeningCountsByGrade = useSelector(selectScreeningCountsByGrade)
  const symptomCounts = []
  const exposureCounts = []
  const submissionCounts = []
  const grades = []

  !isEmpty(screeningCountsByGrade) &&
    screeningCountsByGrade.forEach((each) => {
      symptomCounts.push(each.symptomCount)
      exposureCounts.push(each.exposureCount)
      exposureCounts.push(each.totalSubmissions)
      grades.push(each.grade)
    })

  const data = {
    datasets: [
      {
        type: 'bar',
        label: 'Symptom Count',
        data: symptomCounts,
        barThickness: 30,
        backgroundColor: '#428EC2',
        borderColor: '#428EC2',
      },
      {
        type: 'bar',
        label: 'Exposure Count',
        data: exposureCounts,
        barThickness: 30,
        backgroundColor: '#92278F',
      },
      {
        type: 'bar',
        label: 'Total Submissions',
        data: submissionCounts,
        barThickness: 30,
        backgroundColor: '#8DC63F',
      },
    ],
  }
  const options = {
    responsive: true,
    legend: {
      display: false,
    },
    labels: grades,
    elements: {
      line: {
        fill: false,
      },
    },
    scales: {
      xAxes: [
        {
          display: true,
          gridLines: {
            zeroLineColor: '#4C4C4C',
          },
          labels: grades,
          stacked: true,
        },
      ],
      yAxes: [
        {
          type: 'linear',
          display: true,
          position: 'left',
          ticks: {
            min: 0,
            max: 100,
            stepSize: 25,
            beginAtZero: true,
          },
          gridLines: {
            zeroLineColor: '#4C4C4C',
          },
          labels: {
            show: true,
          },
          stacked: false,
        },
      ],
    },
  }
  return (
    <>
      <Col md={4} className='mb-30'>
        <Card className='border-dark h-100'>
          <Card.Body>
            <BusyIndicator
              busyIndicatorName={BUSY_INDICATOR_NAME.FETCH_SCREENING_AGGREGATE}
            >
              <h4 className='f-16 font-weight-bold lh-40'>
                Counts by Grades/Depts
              </h4>
              <ul className='list-unstyled d-flex flex-wrap align-items-center'>
                <li className='f-12  font-weight-bold mr-4 mb-2 d-flex align-items-center'>
                  <span className='status-sign bg-primary d-inline-block rounded-circle mr-1'></span>
                  <span className='opacity-75 hind'>Symptom Count</span>
                </li>
                <li className='f-12  font-weight-bold mr-auto mb-2 d-flex align-items-center'>
                  <span className='status-sign bg-purple d-inline-block rounded-circle mr-1'></span>
                  <span className='opacity-75 hind'>Exposure Count</span>
                </li>
              </ul>
              <Bar data={data} options={options} width={5} height={3} />
            </BusyIndicator>
          </Card.Body>
        </Card>
      </Col>
    </>
  )
}

export default StackedGraph
