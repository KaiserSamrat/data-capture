export const makeQuery = (
  mainFilter,
  subSelectedFilters,
  selectedSubCategory,
  currentSelection,
  moneyFilter,
  chartFilter,
  yearFilter,
  index,
  wpccFilter,
  wpccFilterText
) => {
  let query = null
  if (Object.keys(mainFilter)?.length) {
    if (currentSelection === "all") {
      query = `main=all`
    }
    if (currentSelection === "category") {
      query = `main=category&subfilter=${subSelectedFilters?._id}`
    }
    if (currentSelection === "subcategory") {
      query = `main=subcategory&subfilter=${selectedSubCategory?._id}`
    }
  } else {
    query = `main=all`
  }
  // chart query add condition
  if (moneyFilter !== "" && !!moneyFilter) {
    query = `${query}&money=${moneyFilter?.value || 'all'}`
  }
  if (chartFilter !== "" && !!chartFilter) {
    query = `${query}&chart=${chartFilter}`
  }
  if (yearFilter !== "" && !!yearFilter) {
    query = `${query}&year=${yearFilter}`
  }
  if (index !== "" && !!index) {
    query = `${query}&index=${index}`
  }
  if (wpccFilter !== "" && !!wpccFilter) {
    query = `${query}&${wpccFilterText}=${wpccFilter}`
  }
  return query
}
