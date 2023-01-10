import React from 'react'
import { Stepper as MUIStepper, Step, StepLabel } from '@material-ui/core'
import StepConnector from '@material-ui/core/StepConnector'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import { StepperIcon } from './StepperIcon'

export const LABEL_POSITIONS = {
  TOP: 'top',
  INLINE: 'inline',
  BOTTOM: 'bottom',
}

export type StepperProps = {
  pages: Array<any>
  activeStep: number
  labelPosition: string
}

export const Stepper = ({ pages, activeStep, labelPosition }: StepperProps) => {
  const isTopLabel = labelPosition === LABEL_POSITIONS.TOP
  const CustomConnector = withStyles({
    alternativeLabel: {
      left: 'calc(-50% + 16px)',
      right: 'calc(50% + 16px)',
      bottom: isTopLabel ? '10px' : 'auto',
      top: isTopLabel ? 'auto' : '10px',
      display: 'none',
    },
    active: {
      '& $line': {
        borderColor: '#8DC63F',
      },
    },
    completed: {
      '& $line': {
        borderColor: '#8DC63F',
      },
    },
    line: {
      borderColor: 'transparent',
      borderTopWidth: 0,
      borderRadius: 0,
    },
  })(StepConnector)

  return (
    <MUIStepper
      alternativeLabel={labelPosition !== LABEL_POSITIONS.INLINE}
      activeStep={activeStep}
      connector={<CustomConnector />}
      className={`p-0 ${labelPosition}`}
    >
      {pages.length &&
        pages.map((each) => (
          <Step
            key={each.label}
            className={classNames('align-self-end', {
              'label-top': isTopLabel,
            })}
          >
            <StepLabel StepIconComponent={StepperIcon}>{each.label}</StepLabel>
          </Step>
        ))}
    </MUIStepper>
  )
}
