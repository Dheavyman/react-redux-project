export const authorsFormattedForDropdown = authors => authors.map(author => ({
  value: author.id,
  text: author.firstName + ' ' + author.lastName
}));
