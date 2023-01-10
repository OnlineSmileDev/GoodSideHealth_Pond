import { useSelect } from 'downshift'
import classNames from 'classnames'

export type OptionAsObject = {
  label: string
  value: string
  className?: string
}

type DropdownProps = {
  title: string
  items: Array<OptionAsObject>
  onItemChange?: (item: OptionAsObject) => void
}

const Dropdown = ({ onItemChange, title, items }: DropdownProps) => {
  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items,
    onSelectedItemChange: ({ selectedItem }) => onItemChange(selectedItem),
  })
  return (
    <div className='tw-inline-block tw-text-left tw-w-full tw-text-white tw-text-xs'>
      <button
        type='button'
        className='tw-inline-flex tw-items-center tw-bg-pondBlue tw-rounded tw-w-full tw-px-5 tw-py-2 tw-h-11 tw-bg-arrowDownWhite tw-bg-20 tw-bg-center-right-15 tw-bg-no-repeat'
        {...getToggleButtonProps()}
      >
        {title}
      </button>
      <div
        className='tw-absolute tw-z-10 tw-right-0 tw-w-full tw-px-15 tw-outline-none'
        {...getMenuProps()}
      >
        {isOpen ? (
          <ul className='tw-py-1 tw-px-4 tw-bg-pondBlue tw-rounded tw--mt-1'>
            {items.map((item, index) => (
              <li
                key={`${item.value}-${index}`}
                className={classNames(
                  'tw-block tw-py-2.5 tw-bg-rightBlueArrow tw-bg-20 tw-bg-right tw-bg-no-repeat tw-cursor-pointer',
                  {
                    'tw-border-t tw-border-white': index !== 0,
                    'tw-text-sm': index === highlightedIndex,
                  },
                  item.className
                )}
                {...getItemProps({ item: item, index })}
              >
                {item.label}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  )
}
export default Dropdown
