import React, { PropTypes } from 'react';
import { Link } from 'react-router';

/**
 * Author list row component
 *
 * @param {object} author - Author
 * @param {func} onDelete - On delete handler
 * @returns {object} React element
 */
const AuthorListRow = ({author, onDelete}) => {
  const deleteAuthor = () => (
    onDelete(author.id)
  );

  return (
    <tr>
      <td><Link to={'/author/' + author.id}>{author.id}</Link></td>
      <td>{author.firstName} {author.lastName}</td>
      <td>
        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={deleteAuthor}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

AuthorListRow.propTypes = {
  author: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default AuthorListRow;
