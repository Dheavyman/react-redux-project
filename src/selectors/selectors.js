/**
 * Format select input dropdown values
 *
 * @param {array} authors - Authors
 */
export const authorsFormattedForDropdown = authors => authors.map(author => ({
  value: author.id,
  text: author.firstName + ' ' + author.lastName
}));

/**
 * Sort array of course objects by title
 *
 * @param {object} first - First item in the comparison
 * @param {object} second - Second item in the comparison
 * @returns {number} -1, 1 or 0
 */
export const sortByTitleAscending = (first, second) => {
  if (first.title < second.title) {
    return -1;
  }
  if (first.title > second.title) {
    return 1;
  }
  return 0;
};
