import { Image } from 'react-bootstrap'
import Icons from 'src/assets/icons'

export enum PRINT_BADGE_VARIANT {
  PRIMARY = 'primary',
  WARNING = 'warning',
}

type PrintBadgeProps = {
  variant?: PRINT_BADGE_VARIANT
}

export const PrintBadge = ({
  variant = PRINT_BADGE_VARIANT.PRIMARY,
}: PrintBadgeProps) => {
  const iconSource =
    variant === PRINT_BADGE_VARIANT.WARNING
      ? Icons.documentRoundWarnIcon
      : Icons.documentRoundBlueIcon

  const altText =
    variant === PRINT_BADGE_VARIANT.WARNING
      ? 'documentRoundWarnIcon'
      : 'documentRoundBlueIcon'

  return (
    <span className='tw-w-6.25 tw-h-6.25 tw-mr-1'>
      <Image
        src={iconSource}
        alt={altText}
        className='tw-inline-block'
        width={25}
        data-testid={'print-badge-icon'}
      />
    </span>
  )
}
