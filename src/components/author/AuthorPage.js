import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';

import AuthorList from './AuthorList';
import * as authorActions from '../../actions/authorActions';

class AuthorPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.redirectToAddAuthorPage = this.redirectToAddAuthorPage.bind(this);
    this.deleteAuthor = this.deleteAuthor.bind(this);
  }

  redirectToAddAuthorPage() {
    browserHistory.push('/author');
  }

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
        <AuthorList authors={authors} onDelete={this.deleteAuthor} />
      </div>
    );
  }
}

AuthorPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  authors: state.authors,
  courses: state.courses
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(authorActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthorPage);
