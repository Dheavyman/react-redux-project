import React, { PropTypes } from 'react';
import { Link } from 'react-router';

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
