import React from 'react'
import { useSelector } from 'react-redux'
import { Card } from 'react-bootstrap'
import dynamic from 'next/dynamic'
import moment from 'moment'
import { BUSY_INDICATOR_NAME } from 'constants/busyIndicator'
import { isEmpty } from 'utils/isEmpty'
import { selectScreeningThisWeekCount } from './screeningDataDashboard.selectors'
import BusyIndicator from '../../widgets/busyIndicator'
const Bar = dynamic(() => import('react-chartjs-2').then((mod) => mod.Bar))

const MixedGraph = () => {
  const screeningThisWeekCount = useSelector(selectScreeningThisWeekCount)
  const symptomCounts = []
  const exposureCounts = []
  const submissionCounts = []
  const dateRanges = []

  const formattedData = screeningThisWeekCount?.reduce(
    (acc, { date, exposureCount, symptomCount, totalSubmissions }) => {
      // TODO- May require a cleanup, this may be we need from BE.
      const formattedDay = moment(date).add(1, 'day').format('MMM DD')
      acc[date] = {
        symptomCount: !acc[date]
          ? symptomCount
          : acc[date].symptomCount + symptomCount,
        exposureCount: !acc[date]
          ? exposureCount
          : acc[date].exposureCount + exposureCount,
        totalSubmissions: !acc[date]
          ? totalSubmissions
          : acc[date].totalSubmissions + totalSubmissions,
        date: acc[date] && acc[date].date ? acc[date].date : formattedDay,
      }
      return acc
    },
    {}
  )

  !isEmpty(formattedData) &&
    Object.keys(formattedData)
      // TODO: Not sure if this line is still serving a purpose with new BE endpoint. I think api is returning one week starting at monday
      // .slice(Math.max(Object.keys(formattedData).length - 4, 1)) // Extracting last 4 weeks
      .forEach((each) => {
        symptomCounts.push(formattedData[each].symptomCount)
        exposureCounts.push(formattedData[each].exposureCount)
        submissionCounts.push(formattedData[each].totalSubmissions)
        dateRanges.push(formattedData[each].date)
      })

  const data = {
    datasets: [
      {
        type: 'line',
        label: 'Symptom Count',
        data: symptomCounts,
        fill: false,
        lineTension: 0.1,
        borderWidth: 1,
        borderColor: '#92278F',
        pointBackgroundColor: '#92278F',
        pointBorderColor: '#92278F',
        yAxisID: 'y-axis-2',
      },
      {
        type: 'line',
        label: 'Exposure Count',
        data: exposureCounts,
        lineTension: 0.1,
        borderWidth: 1,
        borderColor: '#428EC2',
        pointBackgroundColor: '#428EC2',
        pointBorderColor: '#428EC2',
        yAxisID: 'y-axis-2',
      },
      {
        type: 'bar',
        label: 'Total Submissions',
        data: submissionCounts,
        fill: false,
        barThickness: 30,
        backgroundColor: '#8DC63F',
        borderColor: '#fff',
        yAxisID: 'y-axis-1',
      },
    ],
  }
  const options = {
    responsive: true,
    labels: dateRanges,
    legend: {
      display: false,
    },
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
          labels: dateRanges,
        },
      ],
      yAxes: [
        {
          type: 'linear',
          display: true,
          position: 'left',
          id: 'y-axis-1',
          ticks: {
            min: 0,
            stepSize: 100,
          },
          gridLines: {
            zeroLineColor: '#4C4C4C',
            borderColor: '#4C4C4C',
          },
          labels: {
            show: true,
          },
        },
        {
          type: 'linear',
          display: true,
          position: 'right',
          id: 'y-axis-2',
          ticks: {
            min: 0,
            stepSize: 200,
          },
          gridLines: {
            display: false,
          },
          labels: {
            show: true,
          },
        },
      ],
    },
  }
  return (
    <>
      <Card className='border-dark h-100'>
        <Card.Body>
          <BusyIndicator
            busyIndicatorName={BUSY_INDICATOR_NAME.FETCH_SCREENING_AGGREGATE}
          >
            <h4 className='f-16 font-weight-bold lh-40'>This Week So Far</h4>

            <ul className='list-unstyled d-flex flex-wrap align-items-center'>
              <li className='f-12  font-weight-bold mr-4 mb-2 d-flex align-items-center'>
                <span className='status-sign bg-primary d-inline-block rounded-circle mr-1'></span>
                <span className='opacity-75 hind'>Symptom Count</span>
              </li>
              <li className='f-12  font-weight-bold mr-auto mb-2 d-flex align-items-center'>
                <span className='status-sign bg-purple d-inline-block rounded-circle mr-1'></span>
                <span className='opacity-75 hind'>Exposure Count</span>
              </li>
              <li className='f-12  font-weight-bold mr-4 mb-2 d-flex align-items-center'>
                <span className='status-sign bg-success d-inline-block rounded-circle mr-1'></span>
                <span className='opacity-75 hind'>Total Submissions</span>
              </li>
            </ul>
            <Bar data={data} options={options} width={5} height={3} />
          </BusyIndicator>
        </Card.Body>
      </Card>
    </>
  )
}

export default MixedGraph
