import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import toastr from 'toastr';

import AuthorForm from './AuthorForm';
import * as authorActions from '../../actions/authorActions';

class ManageAuthorPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      author: Object.assign({}, this.props.author),
      errors: {},
      saving: false,
      hasUnsavedChanges: false
    };
    this.updateAuthorState = this.updateAuthorState.bind(this);
    this.saveAuthor = this.saveAuthor.bind(this);
  }

  componentDidMount() {
    this.props.router.setRouteLeaveHook(this.props.route, () => {
      if (this.state.hasUnsavedChanges) {
        return 'You have unsaved changes, are you sure you want to leave?';
      }
    });
  }

  updateAuthorState(event) {
    const field = event.target.name;
    let author = Object.assign({}, this.state.author);
    author[field] = event.target.value;

    return this.setState({
      author,
      hasUnsavedChanges: true
    });
  }

  authorFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.author.firstName.length < 3) {
      errors.firstName = 'First name must be at least 3 characters.';
      formIsValid = false;
    }
    if (this.state.author.lastName.length < 3) {
      errors.lastName = 'Last name must be at least 3 characters.';
      formIsValid = false;
    }

    this.setState({ errors });
    return formIsValid;
  }

  saveAuthor(event) {
    event.preventDefault();

    if (!this.authorFormIsValid()) {
      return;
    }

    this.setState({ saving: true });
    this.props.actions.saveAuthor(this.state.author)
      .then(() => {
        this.setState({
          saving: false,
          hasUnsavedChanges: false
        });
        toastr.success('Author saved successfully');
        this.context.router.push('/authors');
      })
      .catch(error => {
        toastr.error(error);
        this.setState({ saving: false });
      });
  }

  render() {
    const { author, saving, errors } = this.state;
    return (
      <AuthorForm
        author={author}
        saving={saving}
        errors={errors}
        onChange={this.updateAuthorState}
        onSave={this.saveAuthor}
      />
    );
  }
}

ManageAuthorPage.propTypes = {
  author: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired
};

ManageAuthorPage.contextTypes = {
  router: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
  const authorId = ownProps.params.id;
  let author = {
    id: '',
    firstName: '',
    lastName: ''
  };

  if (authorId && state.authors.length > 0) {
    author = state.authors.find(author => author.id === authorId);
  }

  return {
    author
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(authorActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(ManageAuthorPage));
