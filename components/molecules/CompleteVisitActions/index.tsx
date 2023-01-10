import React, { useState } from 'react'
import { Button, BUTTON_VARIANT } from 'components/atoms/Button'
import { ButtonList } from 'components/molecules/ButtonList'

export type CompleteVisitActionsProps = {
  returnToSession: () => void
  editClearanceNote: () => void
  emailDischargeNote: () => void
  downloadDischargeNote: () => void
  downloadProviderDocumentation: () => void
  isDownloadingDischargeNote: boolean
  setIsDownloadingDischargeNote: (value: boolean) => void
  isDownloadingProviderDoc: boolean
  setIsDownloadingProviderDoc: (value: boolean) => void
  handleMarkVisitPrinted?: () => void
  isMarkVisitPrintedLoading?: boolean
}

export const CompleteVisitActions = ({
  returnToSession,
  editClearanceNote,
  emailDischargeNote,
  downloadDischargeNote,
  downloadProviderDocumentation,
  isDownloadingDischargeNote,
  setIsDownloadingDischargeNote,
  isDownloadingProviderDoc,
  setIsDownloadingProviderDoc,
  handleMarkVisitPrinted,
  isMarkVisitPrintedLoading,
}: CompleteVisitActionsProps) => {
  const downloadDischargeNoteHandler = () => {
    setIsDownloadingDischargeNote(true)
    downloadDischargeNote()

    if (handleMarkVisitPrinted) {
      handleMarkVisitPrinted()
    }
  }

  const downloadProviderDocHandler = () => {
    setIsDownloadingProviderDoc(true)
    downloadProviderDocumentation()
  }

  const downloadOptions = [
    {
      label: 'Download in English',
      value: 'English',
      className: 'tw-bg-download',
    },
    {
      label: 'Download in Spanish',
      value: 'Spanish',
      className: 'tw-bg-download',
    },
  ]

  const checkOutList = [
    {
      variant: BUTTON_VARIANT.PRIMARY,
      clickHandler: () => returnToSession(),
      buttonText: 'Return To Session',
      dataTest: 'returnToSession',
      style: 'tw-w-full tw-mb-2.5',
    },
    {
      variant: BUTTON_VARIANT.DANGER,
      clickHandler: () => editClearanceNote(),
      buttonText: 'Edit Clearance Note',
      dataTest: 'editClearanceNote',
      style: 'tw-w-full',
    },
  ]

  return (
    <div className='tw-flex tw-flex-col'>
      <ButtonList
        className='tw-flex tw-flex-col tw-mb-2.5'
        list={checkOutList}
      />

      {/* ToDo: Revert back (Replace the next button) to Dropdown localization options for Download Report */}
      {/* <Dropdown
        title='Download Discharge Note'
        items={downloadOptions}
        onItemChange={() => downloadDischargeNote()}
      /> */}

      <Button
        variant={BUTTON_VARIANT.PRIMARY}
        className='tw-w-full tw-mt-2.5'
        data-test='downloadDischargeNote'
        data-testid='downloadDischargeNote'
        onClick={downloadDischargeNoteHandler}
        isLoading={isDownloadingDischargeNote || isMarkVisitPrintedLoading}
      >
        {isDownloadingDischargeNote || isMarkVisitPrintedLoading ? (
          <div>Downloading...</div>
        ) : (
          'Download Discharge Note'
        )}
      </Button>

      <Button
        variant={BUTTON_VARIANT.PRIMARY}
        className='tw-w-full tw-mt-2.5'
        data-test='downloadProviderDocumentation'
        data-testid='downloadProviderDocumentation'
        onClick={downloadProviderDocHandler}
        isLoading={isDownloadingProviderDoc}
      >
        {isDownloadingProviderDoc ? (
          <div>Downloading...</div>
        ) : (
          'Download Provider Documentation'
        )}
      </Button>

      {/* ToDo: Revert back the Button  */}
      {/* <Button
        variant={BUTTON_VARIANT.PRIMARY}
        className='tw-w-full tw-mt-2.5'
        data-test='editClearanceNote'
        data-testid='editClearanceNote'
        onClick={() => emailDischargeNote()}
      >
        Email Discharge Note
      </Button> */}
    </div>
  )
}
