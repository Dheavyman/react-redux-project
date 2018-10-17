import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';

import AuthorList from './AuthorList';
import * as authorActions from '../../actions/authorActions';

/**
 * Author page component
 *
 * @class AuthorPage
 * @extends {React.Component}
 */
class AuthorPage extends React.Component {
  /**
   *Creates an instance of AuthorPage.
   *
   * @param {object} props - Properties passed to component
   * @param {object} context - Context passed to component
   * @memberof AuthorPage
   */
  constructor(props, context) {
    super(props, context);
    this.redirectToAddAuthorPage = this.redirectToAddAuthorPage.bind(this);
    this.deleteAuthor = this.deleteAuthor.bind(this);
  }

  /**
   * Redirect user to add author page
   *
   * @memberof AuthorPage
   */
  redirectToAddAuthorPage() {
    browserHistory.push('/author');
  }

  /**
   * Delete an author
   *
   * @param {number} authorId - Id of the author
   * @memberof AuthorPage
   */
  deleteAuthor(authorId) {
    const authorHasCourse = this.props.courses.some(course => (
      course.authorId === authorId
    ));
    if (authorHasCourse) {
      toastr.info('Cannot delete author because author has a course');
      return;
    }
    this.props.actions.deleteAuthor(authorId)
      .then(() => {
        toastr.success('Author deleted successfully');
      })
      .catch(error => {
        toastr.error(error);
      });
  }

  /**
   * Render method
   *
   * @returns {object} React element
   * @memberof AuthorPage
   */
  render() {
    const { authors } = this.props;
    return (
      <div>
        <h1>Authors</h1>
        <input
          type="submit"
          value="Add Author"
          className="btn btn-primary"
          onClick={this.redirectToAddAuthorPage}
        />
        {authors.length > 0
        ? <AuthorList authors={authors} onDelete={this.deleteAuthor} />
        : (
          <div>
            <br />
            <h4>
              No author added yet. Click on add author button to add new author.
            </h4>
          </div>
          )
        }
      </div>
    );
  }
}

AuthorPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

/**
 * Map state to props
 *
 * @param {object} state - State
 * @returns {object} Object mapped to props
 */
const mapStateToProps = state => ({
  authors: state.authors,
  courses: state.courses
});

/**
 * Map dispatch to props
 *
 * @param {func} dispatch - Dispatch
 * @returns {object} Actions
 */
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(authorActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthorPage);
