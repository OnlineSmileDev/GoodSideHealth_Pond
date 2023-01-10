import React, { useState, useEffect, useRef } from 'react'
import { Image } from 'react-bootstrap'
import classNames from 'classnames'
import { useCombobox } from 'downshift'
import Icons from 'src/assets/icons'
import { TAB_KEY } from 'constants/keyCodes'
import { DEBOUNCE_TIMEOUT, REG_DATE_INPUT } from 'constants/general'
import { isEmpty } from 'utils/isEmpty'
import { isObject } from 'utils/isObject'
import { getBackendFormattedDate } from 'utils/datePicker'
import { useDebounce } from 'src/hooks'

export type CustomSelectInputProps = {
  placeholder: string
  options: Array<any>
  value: string | number
  onChange: (value: {}) => void
  searchBoxPlaceholder?: string
  keyField: string
  showSearchBar?: boolean
  onSearchChange?: (value: any) => Promise<any>
  fieldsToBeDisplayed: Array<any>
  screeningDashboardStyles?: boolean
  isScheduleArchive?: boolean
  onEmptySearchRes?: string
  onClearSearchText?: () => void
  readOnly?: boolean
  dataTestId?: string
}

export const CustomSelectInput = ({
  placeholder,
  options = [],
  value,
  onChange,
  searchBoxPlaceholder,
  keyField,
  showSearchBar = true,
  onSearchChange,
  fieldsToBeDisplayed = [],
  screeningDashboardStyles = false,
  isScheduleArchive,
  onEmptySearchRes,
  onClearSearchText,
  readOnly = false,
  dataTestId = '',
}: CustomSelectInputProps) => {
  const searchBarRef = useRef(null)
  const buttonRef = useRef(null)
  const customSelectRef = useRef(null)
  const [filteredOptions, setFilteredOptions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isEmptyRes, setIsEmptyRes] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const debounce = useDebounce()

  useEffect(() => {
    setFilteredOptions(options)
  }, [options])

  useEffect(() => {
    if (showDropdown) {
      searchBarRef.current.focus()
    }
  }, [showDropdown, showSearchBar])

  const handleChange = (value) => {
    if (value.length === 0 && onClearSearchText) {
      debounce()
      onClearSearchText()
      setIsEmptyRes(false)
    } else {
      if (onSearchChange) {
        const isDateInput = REG_DATE_INPUT.test(value)
        if (isDateInput) {
          if (value.length === 10) {
            setIsLoading(true)
            setIsEmptyRes(false)
            onSearchChange(getBackendFormattedDate(value)).then((res) => {
              if (res.payload) {
                setIsLoading(false)
                if (isEmpty(res.payload)) setIsEmptyRes(true)
              }
            })
          }
        } else {
          debounce(() => {
            setIsLoading(true)
            setIsEmptyRes(false)
            onSearchChange(value).then((res) => {
              if (res.payload) {
                setIsLoading(false)
                if (isEmpty(res.payload)) setIsEmptyRes(true)
              }
            })
          }, DEBOUNCE_TIMEOUT)
        }
      } else {
        const newOptions = options.filter(({ name }) =>
          name.toLowerCase().startsWith(value.toLowerCase())
        )
        setFilteredOptions(newOptions)
      }
    }
  }

  const stateReducer = (state, actionAndChanges) => {
    const { type, changes } = actionAndChanges
    //@ts-ignore
    if (type === useCombobox.stateChangeTypes.keyDownEnter) {
      setShowDropdown(false)
    } else {
      return changes
    }
  }

  const {
    getInputProps,
    getItemProps,
    getMenuProps,
    highlightedIndex,
    getComboboxProps,
  } = useCombobox({
    items: filteredOptions,
    stateReducer,
    onSelectedItemChange: ({ selectedItem }) => {
      onChange(selectedItem)
      setShowDropdown(false)
      buttonRef.current.focus()
    },
    onInputValueChange: ({ inputValue }) =>
      showSearchBar && handleChange(inputValue),
    itemToString: () => '',
  })

  const getDownshiftItemStyle = (key, index, item) => {
    if (!showSearchBar)
      return getItemProps({
        as: 'tr',
        key,
        index,
        item,
        style: {
          backgroundColor: highlightedIndex === index ? '#F6F6FC' : 'white',
        },
      })
    else
      return getItemProps({
        as: 'tr',
        key,
        index,
        item,
        style: {
          backgroundColor: highlightedIndex === index ? '#F6F6FC' : 'white',
        },
      })
  }

  const handleKeyPress = (target) => {
    if (target.keyCode === TAB_KEY) {
      setShowDropdown(false)
    }
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      // If the dropdown is open and the clicked target is not within the dropdown then close the menu
      if (
        showDropdown &&
        customSelectRef.current &&
        !customSelectRef.current.contains(e.target)
      ) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showDropdown])

  const getTableColumnStyles = (fieldsToBeDisplayed, index) => {
    if (fieldsToBeDisplayed.length > 1) {
      if (index === 0) {
        return 'tw-w-50%'
      } else if (index === fieldsToBeDisplayed.length - 1) {
        return 'tw-w-10%'
      } else {
        return 'tw-w-1/5'
      }
    } else {
      return 'tw-w-full'
    }
  }

  return (
    <div
      data-test={dataTestId}
      {...getComboboxProps({}, { suppressRefError: true })}
      className='tw-relative'
      ref={customSelectRef}
      id='dropdown'
    >
      <button
        className={classNames(
          'tw-bg-light-lightest tw-min-w-full tw-flex tw-justify-between tw-items-center tw-border tw-border-pondBlack tw-h-10 tw-rounded tw-px-15 tw-text-xs tw-w-full tw-bg-arrowDownBlue tw-bg-no-repeat tw-bg-20 tw-bg-center-right-15 tw-pr-9.5',
          {
            'tw-font-bold tw-text-pondBlack-lightest': screeningDashboardStyles,
            'tw-text-sm': isScheduleArchive,
            'tw-bg-white tw-opacity-100 tw-cursor-default': readOnly,
            'tw-border-b-0 tw-rounded-bl-none tw-rounded-br-none': showDropdown,
          }
        )}
        onClick={() => setShowDropdown(!showDropdown)}
        type='button'
        data-testid='select-button'
        ref={buttonRef}
        disabled={readOnly}
      >
        <span className='tw-overflow-hidden tw-overflow-ellipsis tw-whitespace-nowrap'>
          {value || placeholder}
        </span>
      </button>
      <div
        className={classNames(
          'tw-absolute tw-z-10 tw-w-full tw-text-sm tw-font-hind'
        )}
        {...getMenuProps({}, { suppressRefError: true })}
      >
        {(!showSearchBar || !showDropdown) && (
          <input
            {...getInputProps({
              ref: searchBarRef,
            })}
            className='tw-absolute tw-h-0 tw-w-0'
            tabIndex={-1}
          />
        )}
        {showDropdown && (
          <>
            {showSearchBar && (
              <div
                className={classNames(
                  'tw-px-15 tw-pb-15 tw-pt-2 tw-flex tw-bg-white tw-border-l tw-rounded-tl-none tw-border-b tw-border-r tw-rounded-tr-none tw-border-pondBlack'
                )}
              >
                <input
                  className='search-control form-control'
                  placeholder={searchBoxPlaceholder || placeholder}
                  data-testid='custom-select-input'
                  {...getInputProps({
                    onKeyDown: handleKeyPress,
                    ref: searchBarRef,
                  })}
                />
              </div>
            )}
            <div
              className='tw-bg-light-lightest tw-overflow-y-scroll tw-max-h-200 tw-border-pondBlack tw-rounded tw-border-l tw-rounded-tl-none tw-border-b tw-border-r tw-rounded-tr-none tw-font-medium'
              id='custom-scroll'
            >
              <table className='tw-w-full tw-h-full'>
                <tbody>
                  {(isLoading && onEmptySearchRes) || isEmptyRes ? (
                    <tr>
                      {isEmptyRes ? (
                        <td
                          className='tw-h-9 tw-px-5 tw-text-xs tw-font-hind tw-font-medium hover:tw-bg-light'
                          data-test='empty-search'
                        >
                          {onEmptySearchRes}
                        </td>
                      ) : (
                        <td className='tw-relative tw-min-h-12.5 tw-flex tw-justify-center tw-items-center'>
                          <Image
                            src={Icons.loadingIcon}
                            alt='Loading...'
                            width={35}
                          />
                        </td>
                      )}
                    </tr>
                  ) : (
                    filteredOptions &&
                    filteredOptions.map((item, index) => (
                      <tr
                        key={index}
                        data-testid={`downshift-listItem-${index}`}
                        {...getDownshiftItemStyle(index, index, item)}
                        className='tw-h-8 tw-bg-light-lightest tw-px-15 tw-flex tw-items-center hover:tw-bg-light tw-text-xs tw-font-hind tw-font-medium'
                      >
                        {fieldsToBeDisplayed &&
                          fieldsToBeDisplayed.map((eachkey, index) =>
                            isObject(eachkey) && item[eachkey.field] ? (
                              <td key={eachkey.field} className='tw-w-10%'>
                                {eachkey.badge}
                              </td>
                            ) : (
                              <td
                                key={
                                  item[eachkey] || `${item.id} ${eachkey.field}`
                                }
                                className={getTableColumnStyles(
                                  fieldsToBeDisplayed,
                                  index
                                )}
                              >
                                {item[eachkey]}
                              </td>
                            )
                          )}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
