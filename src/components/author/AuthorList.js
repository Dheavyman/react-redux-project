import React, { PropTypes } from 'react';

import AuthorListRow from './AuthorListRow';

/**
 * Author list component
 *
 * @param {array} authors - Authors
 * @param {func} onDelete - On delete handler
 * @returns {object} React element
 */
const AuthorList = ({authors, onDelete}) => (
  <table className="table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {authors.map(author => (
        <AuthorListRow key={author.id} author={author} onDelete={onDelete} />
      ))}
    </tbody>
  </table>
);

AuthorList.propTypes = {
  authors: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default AuthorList;
