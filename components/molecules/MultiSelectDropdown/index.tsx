import React, { useState } from 'react'
import classNames from 'classnames'
import { useCombobox, useMultipleSelection } from 'downshift'

export type MultiSelectDropdownPropTypes = {
  options: Array<any>
  placeholder: string
  selectedValues: Array<any>
  setSelectedValues: (value: any) => void
}

const BACKSPACE = 8

export const MultiSelectDropdown = ({
  options,
  placeholder,
  selectedValues,
  setSelectedValues,
}: MultiSelectDropdownPropTypes) => {
  const [inputValue, setInputValue] = useState('')

  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
    setSelectedItems,
  } = useMultipleSelection()

  const getFilteredItems = () =>
    options.filter(
      (option) =>
        selectedItems.indexOf(option) < 0 &&
        option.name.toLowerCase().startsWith(inputValue.toLowerCase())
    )

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    inputValue,
    defaultHighlightedIndex: 0, // after selection, highlight the first item.
    selectedItem: null,
    items: getFilteredItems(),
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          return {
            ...changes,
            isOpen: true, // keep the menu open after selection.
          }
      }
      return changes
    },
    onStateChange: ({ inputValue, type, selectedItem }) => {
      switch (type) {
        case useCombobox.stateChangeTypes.InputChange:
          setInputValue(inputValue)
          break
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          if (selectedItem) {
            setInputValue('')
            addSelectedItem(selectedItem)
            setSelectedValues([...selectedValues, selectedItem])
          }
          break
        default:
          break
      }
    },
  })

  return (
    <div
      className={classNames(
        'tw-border tw-mt-3 tw-rounded tw-border-black tw-w-full tw-py-1 tw-px-2 tw-relative',
        { 'tw-h-10': selectedItems.length === 0 }
      )}
    >
      <div>
        {selectedItems.map((selectedItem: any, index) => (
          <div
            className='tw-group tw-inline-block tw-bg-light tw-mx-1 tw-my-0.5 tw-pl-4 tw-pr-1.5 tw-py-1 tw-text-xs'
            key={`selected-item-${index}`}
            {...getSelectedItemProps({ selectedItem, index })}
          >
            {selectedItem.name}
            <span
              className='tw-ml-1 tw-cursor-pointer tw-opacity-0 group-hover:tw-opacity-100'
              onClick={(e) => {
                e.stopPropagation()
                removeSelectedItem(selectedItem)
                setSelectedValues(
                  selectedValues.filter((each) => each.id !== selectedItem.id)
                )
              }}
            >
              &#10005;
            </span>
          </div>
        ))}
        <div {...getComboboxProps()} className='tw-inline-block'>
          <input
            {...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))}
            placeholder={placeholder}
            className='tw-font-hind tw-text-xs tw-h-6 tw-pl-1.5 tw-outline-none tw-w-28'
            onKeyDown={(e) => {
              if (e.keyCode === BACKSPACE && inputValue.length === 0) {
                setSelectedItems(
                  selectedItems.slice(0, selectedItems.length - 1)
                )
              }
            }}
            data-testid='multi-select-input'
          />
        </div>
      </div>
      <div {...getMenuProps()}>
        {isOpen && (
          <div className='tw-z-10 tw-w-full tw--ml-2 tw-mt-2 tw-absolute tw-border tw-border-black tw-bg-light-lightest tw-rounded '>
            {getFilteredItems().map((item, index) => (
              <div
                style={
                  highlightedIndex === index
                    ? { backgroundColor: '#f6f6fc', borderRadius: '4px' }
                    : {}
                }
                key={`${item}${index}`}
                {...getItemProps({ item, index })}
                className='tw-pl-1.5 tw-text-xs'
                data-testid={`downshift-listItem-${index}`}
              >
                {item.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
