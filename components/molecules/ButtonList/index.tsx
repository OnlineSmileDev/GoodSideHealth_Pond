import { Button } from 'components/atoms/Button'

export type ButtonListProps = {
  className?: string
  list: Array<any>
}

export const ButtonList = ({ className, list }: ButtonListProps) => {
  return list?.length ? (
    <div className={className}>
      {list.map(
        ({ variant, style, dataTest, clickHandler, buttonText, ...props }) => (
          <Button
            {...props}
            key={dataTest}
            variant={variant}
            className={style}
            data-test={dataTest}
            onClick={clickHandler}
            data-testid={dataTest}
          >
            {buttonText}
          </Button>
        )
      )}
    </div>
  ) : null
}
