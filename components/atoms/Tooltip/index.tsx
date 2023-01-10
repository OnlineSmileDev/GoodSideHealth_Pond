import { JSXElementConstructor, ReactElement, ReactNode } from 'react'
import { OverlayTrigger, Tooltip as ReactTooltip } from 'react-bootstrap'
import { OverlayTriggerRenderProps } from 'react-bootstrap/esm/OverlayTrigger'

export type TooltipProps = {
  text: string
  children:
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ((props: OverlayTriggerRenderProps) => ReactNode)
}

export const Tooltip = ({ text, children }: TooltipProps) => {
  return (
    <OverlayTrigger
      placement='top'
      overlay={<ReactTooltip id='top'>{text}</ReactTooltip>}
    >
      {children}
    </OverlayTrigger>
  )
}
