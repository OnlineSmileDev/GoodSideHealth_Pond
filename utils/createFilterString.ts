export const createFilterString = (filters) =>
  Object.keys(filters)
    .filter((each) => filters[each])
    .map((each) => `${each}=${filters[each]}`)
    .join('&')
