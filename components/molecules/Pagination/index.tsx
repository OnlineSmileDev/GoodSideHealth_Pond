import React from 'react'
import { Pagination as BootstrapPagination } from 'react-bootstrap'

const INITIAL_PAGE = 1
const ELLIPSES_IN_START = 4

export type PaginationProps = {
  recordsPerPage: number
  totalSize: number
  paginate: (value: number) => void
  currentPage: number
  ellipses: number
}

export const Pagination = ({
  recordsPerPage,
  totalSize,
  paginate,
  currentPage,
  ellipses,
}: PaginationProps) => {
  const pages = []
  const totalPages = Math.ceil(totalSize / recordsPerPage)
  const showElipsesInLast = currentPage < totalPages - ellipses - 1
  const showElipsesInStart = currentPage > ELLIPSES_IN_START
  const firstPageItemTobeRender = showElipsesInStart ? currentPage - 2 : 2
  const lastPageItemToBeRender = showElipsesInLast
    ? currentPage + 2
    : totalPages - 1

  for (
    let page = firstPageItemTobeRender;
    page <= lastPageItemToBeRender;
    page++
  ) {
    pages.push(page)
  }

  const handleNext = (currentPage, totalPages) => {
    if (currentPage < totalPages) {
      paginate(currentPage + 1)
    }
  }
  const handleBack = (currentPage) => {
    if (currentPage > 1) {
      paginate(currentPage - 1)
    }
  }

  return (
    <BootstrapPagination>
      {showElipsesInStart && (
        <BootstrapPagination.Prev onClick={() => handleBack(currentPage)}>
          Prev
        </BootstrapPagination.Prev>
      )}
      <BootstrapPagination.First
        active={INITIAL_PAGE === currentPage}
        onClick={() => paginate(INITIAL_PAGE)}
        data-testid='initialPage'
      >
        {INITIAL_PAGE}
      </BootstrapPagination.First>
      {showElipsesInStart && <BootstrapPagination.Ellipsis />}
      {pages.map((pageNumber) => (
        <BootstrapPagination.Item
          key={pageNumber}
          active={pageNumber === currentPage}
          onClick={() => paginate(pageNumber)}
        >
          {pageNumber}
        </BootstrapPagination.Item>
      ))}
      {showElipsesInLast && <BootstrapPagination.Ellipsis />}
      {totalPages > INITIAL_PAGE && (
        <BootstrapPagination.Last
          active={totalPages === currentPage}
          onClick={() => paginate(totalPages)}
          data-testid='lastPage'
        >
          {totalPages}
        </BootstrapPagination.Last>
      )}

      {showElipsesInLast && (
        <BootstrapPagination.Next
          onClick={() => handleNext(currentPage, totalPages)}
        >
          Next
        </BootstrapPagination.Next>
      )}
    </BootstrapPagination>
  )
}
