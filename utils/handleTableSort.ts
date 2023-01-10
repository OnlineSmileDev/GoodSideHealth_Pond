import { get } from 'utils/get'

export const handleTableSort = (
  data,
  sortField,
  sortOrder,
  currentPage,
  sizePerPage
) => {
  const isSortableData = data.some((each) => get(each, sortField) !== undefined)
  return isSortableData
    ? sortOrder === 'asc'
      ? data

          .slice()
          .sort((first, second) =>
            get(first, sortField) > get(second, sortField) ? 1 : -1
          )
          .slice(currentPage, currentPage + sizePerPage)
      : data
          .slice()
          .sort((first, second) =>
            get(first, sortField) > get(second, sortField) ? -1 : 1
          )
          .slice(currentPage, currentPage + sizePerPage)
    : data
}
