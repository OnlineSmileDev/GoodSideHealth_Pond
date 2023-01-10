import React from 'react'
import { Meta, Story } from '@storybook/react'
import { KanbanBoard, KanbanBoardProps } from './index'

const StoryMeta = {
  title: 'templates/KanbanBoard',
  component: KanbanBoard,
} as Meta

export default StoryMeta

const Template: Story<KanbanBoardProps> = (args) => (
  <KanbanBoard {...args}></KanbanBoard>
)

export const Primary = Template.bind({}) as Story<KanbanBoardProps>

Primary.args = {
  session: {
    id: 1,
    name: 'Kanban Board Name',
    description: 'description text',
  },
  children: <div>Hello</div>,
  // visits: [
  //   {
  //     id: 1,
  //     firstName: 'Hettie',
  //     lastName: 'Welch',
  //     dateOfBirth: '2022-01-04T18:30:00.000Z',
  //     registration: 'Complete',
  //     heightAndWeight: 'In Progress',
  //     physicalExamOrder: 'Failed',
  //     musculoskeletal: 'Complete',
  //     vision: 'Failed',
  //     screenings: 'Skipped',
  //     checkOut: 'Skipped',
  //     complete: 'Not Complete',
  //   },
  //   {
  //     id: 2,
  //     firstName: 'Dan',
  //     lastName: 'Reynolds',
  //     dateOfBirth: '2021-10-09T18:30:00.000Z',
  //     registration: 'Complete',
  //     heightAndWeight: 'In Progress',
  //     physicalExamOrder: 'Failed',
  //     musculoskeletal: 'Complete',
  //     vision: 'Failed',
  //     screenings: 'Complete',
  //     checkOut: 'Skipped',
  //     complete: 'Not Complete',
  //   },
  // ],
  // stations: STATIONS,
  // handleVisitAction: (id, station) =>
  //   console.log('handle visit action for', id, 'on station', station.label),
}
