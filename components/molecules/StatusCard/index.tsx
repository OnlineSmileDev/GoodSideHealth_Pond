import React, { ReactNode } from 'react'
import { Row, Col, Image, Accordion } from 'react-bootstrap'
import { BulletPoint } from 'components/atoms/BulletPoint'
import { Card } from 'components/atoms/Card'
import { Indicator } from 'components/atoms/Indicator'
import { PrintBadge, PRINT_BADGE_VARIANT } from 'components/atoms/PrintBadge'
import { Badge, BADGE_OUTLINE_VARIANT } from 'components/atoms/Badge'
import { STATUS } from './constants'
import Icons from 'src/assets/icons'

export enum TOGGLE_VARIANT {
  PRIMARY = 'primary',
  DARK = 'dark',
}

export type StatusCardProps = {
  title: string
  status?: string
  eventKey: string | number
  onToggle: () => void
  unreadIndicator: boolean
  alertIndicator?: boolean
  printIndicatorPrimary?: boolean
  printIndicatorWarning?: boolean
  isOpen: boolean
  children: ReactNode
  id?: number
  shouldShowToggleLabel?: boolean
  toggleVariant?: TOGGLE_VARIANT
  isLoading?: boolean
}

export const StatusCard = ({
  unreadIndicator,
  alertIndicator,
  printIndicatorPrimary = false,
  printIndicatorWarning = false,
  title,
  status,
  eventKey,
  onToggle,
  isOpen,
  children,
  shouldShowToggleLabel = true,
  toggleVariant = TOGGLE_VARIANT.PRIMARY,
  isLoading = false,
  ...props
}: StatusCardProps) => {
  const getBadgeVariant = (status) => {
    switch (status) {
      case STATUS.NEGATIVE:
      case STATUS.DECLINED:
        return BADGE_OUTLINE_VARIANT.OUTLINE_DANGER
      case STATUS.POSITIVE:
      case STATUS.COMPLETE:
        return BADGE_OUTLINE_VARIANT.OUTLINE_SUCCESS
      default:
        return BADGE_OUTLINE_VARIANT.OUTLINE_WARNING
    }
  }

  const getToggleIcons = (variant) => {
    switch (variant) {
      case TOGGLE_VARIANT.PRIMARY:
        return {
          activeState: Icons.arrowUpIcon,
          inActiveState: Icons.arrowDownIcon,
        }
      case TOGGLE_VARIANT.DARK:
        return {
          activeState: Icons.blackUpArrow,
          inActiveState: Icons.blackDownArrow,
        }
    }
  }

  const toggleIcon = getToggleIcons(toggleVariant)

  return (
    <Card className='tw-p-5 tw-mb-5'>
      {/* TODO - Convert Accordian and it's sub components to tailwind css */}
      <Accordion>
        <Row className='align-items-center'>
          <Col md={5} className='mb-4 mb-md-0'>
            <h4 className='tw-flex tw-text-base tw-font-bold tw-mb-0'>
              {unreadIndicator && <Indicator />}
              {alertIndicator && (
                <BulletPoint color='red' size='large'>
                  !
                </BulletPoint>
              )}
              {printIndicatorPrimary && (
                <PrintBadge variant={PRINT_BADGE_VARIANT.PRIMARY} />
              )}
              {printIndicatorWarning && (
                <PrintBadge variant={PRINT_BADGE_VARIANT.WARNING} />
              )}
              {title}
            </h4>
          </Col>
          <Col md={7}>
            <div className='tw-flex tw-items-center tw-justify-end'>
              {status && (
                <Badge
                  variant={getBadgeVariant(status)}
                  className='tw-mr-5 md:tw-ml-auto'
                  data-testid='status'
                >
                  {status}
                </Badge>
              )}
              <Accordion.Toggle
                className='btn-expand f-14 btn tw-no-underline hover:tw-underline btn-auto tw-p-0 font-weight-bold tw-flex align-items-center text-light'
                variant='link'
                {...props}
                // @ts-ignore
                eventKey={eventKey}
                onClick={onToggle}
              >
                {shouldShowToggleLabel &&
                  (isOpen ? 'Less Details' : 'More Details')}
                <Image
                  src={
                    isOpen ? toggleIcon.activeState : toggleIcon.inActiveState
                  }
                  alt=''
                  className='ml-2'
                  width='15'
                ></Image>
              </Accordion.Toggle>
            </div>
          </Col>
          {/* @ts-ignore */}
          <Accordion.Collapse className='col-12' eventKey={eventKey}>
            {/* @ts-ignore */}
            {isLoading ? (
              <Image
                src={Icons.loadingIcon}
                alt='loadingIcon'
                className='tw-w-6 tw-mr-2 tw-ml-50% tw-mt-2'
              />
            ) : (
              children
            )}
          </Accordion.Collapse>
        </Row>
      </Accordion>
    </Card>
  )
}
