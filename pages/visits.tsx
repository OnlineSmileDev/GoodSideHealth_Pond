import { VISITS_STATUS } from 'constants/visits'
import Visits from '../src/features/Visits'
import { Page } from 'components/templates/Page'

export default function VisitItemPage() {
  return (
    <Page>
      <Visits
        status={[
          VISITS_STATUS.COMPLETED,
          VISITS_STATUS.ENDED,
          VISITS_STATUS.IN_PROGRESS,
          VISITS_STATUS.WAITING,
        ]}
      />
    </Page>
  )
}
