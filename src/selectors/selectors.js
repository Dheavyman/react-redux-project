export const authorsFormattedForDropdown = authors => authors.map(author => ({
  value: author.id,
  text: author.firstName + ' ' + author.lastName
}));

export const sortByTitleAscending = (first, second) => {
  if (first.title < second.title) {
    return -1;
  }
  if (first.title > second.title) {
    return 1;
  }
  return 0;
};
