import React from 'react'
import IMAGE from 'react-bootstrap/Image'
import { makeStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import IMAGES from 'src/assets/images'

const useStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: 'black',
  },
  circle: {
    width: '23px',
    height: '23px',
    borderRadius: '50%',
    color: '#a8a8ab',
    backgroundColor: '#F6F6FC',
    border: '2px solid white',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
export type StepperIconProps = {
  active: boolean
  completed: boolean
  icon: number
}

export const StepperIcon = ({ active, completed, icon }: StepperIconProps) => {
  const classes = useStepIconStyles()
  return (
    <div
      className={classNames(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? (
        <IMAGE src={IMAGES.logoCircle} width='23px' alt='logo' />
      ) : (
        <div className={classes.circle}>{icon} </div>
      )}
    </div>
  )
}
