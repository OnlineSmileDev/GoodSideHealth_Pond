import React from 'react'
import { Card } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { BUSY_INDICATOR_NAME } from 'constants/busyIndicator'
import { selectScreeningCounts } from './screeningDataDashboard.selectors'
import BusyIndicator from '../../widgets/busyIndicator'
import dynamic from 'next/dynamic'
const Pie = dynamic(() => import('react-chartjs-2').then((mod) => mod.Pie))

const PieChart = () => {
  const screeningCounts = useSelector(selectScreeningCounts)
  const { covid, submissions } = screeningCounts
  const label = ['COVID Counts', 'Non-COVID Counts']
  const values = [covid, submissions]

  const data = {
    labels: label,
    datasets: [
      {
        backgroundColor: ['#428EC2', '#92278F'],
        data: values,
      },
    ],
  }

  const options = {
    responsive: true,
    legend: {
      display: false,
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
    plugins: {
      legend: 'false',
      outlabels: {
        text: '%p',
        color: '#4C4C4C',
        backgroundColor: '#FFFFFF',
        lineWidth: 1,
        lineColor: '#4C4C4C',
        stretch: 36,
        font: {
          resizable: true,
          minSize: 12,
          weight: 'bold',
        },
        textAlign: 'left',
      },
    },
  }
  return (
    <>
      <Card className='border-dark h-100'>
        <Card.Body>
          <BusyIndicator
            busyIndicatorName={BUSY_INDICATOR_NAME.FETCH_SCREENING_AGGREGATE}
          >
            <h4 className='f-16 font-weight-bold lh-40'>
              Total COVID Counts vs Total Non-COVID Counts
            </h4>
            <div className='map-label-list'>
              <ul className='list-unstyled d-flex flex-wrap align-items-center'>
                <li className='f-12  font-weight-bold mr-4 mb-2 d-flex align-items-center'>
                  <span className='status-sign bg-primary d-inline-block rounded-circle mr-1'></span>
                  <span className='opacity-75 hind'>COVID Counts</span>
                </li>
                <li className='f-12  font-weight-bold mr-auto mb-2 d-flex align-items-center'>
                  <span className='status-sign bg-purple d-inline-block rounded-circle mr-1'></span>
                  <span className='opacity-75 hind'>Non-COVID Counts</span>
                </li>
              </ul>
            </div>
            <Pie data={data} options={options} width={5} height={3} />
          </BusyIndicator>
        </Card.Body>
      </Card>
    </>
  )
}

export default PieChart
