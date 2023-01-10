import { SessionType } from 'constants/kanbanBoard'
import { SubHeader } from 'components/organisms/SubHeader'
import { ReactNode } from 'react'

export type KanbanBoardProps = {
  session: SessionType
  children: ReactNode
  handlePatientManagement?: () => void
}

export const KanbanBoard = (KanbanBoardOptions: KanbanBoardProps) => {
  const { session, children, handlePatientManagement } = KanbanBoardOptions

  return (
    <div className='tw-px-4 tw-bg-white'>
      <div>
        <br />
      </div>

      <SubHeader
        title={session?.name}
        handlePatientManagement={handlePatientManagement}
      />

      <div>
        <br />
      </div>

      <div
        className='tw-w-full tw-flex tw-h-785 tw-overflow-auto'
        data-testid='kanban-board'
      >
        {children}
      </div>
    </div>
  )
}
