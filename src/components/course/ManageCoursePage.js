import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import toastr from 'toastr';

import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import { authorsFormattedForDropdown } from '../../selectors/selectors';

/**
 * Manage course page component
 *
 * @export ManageCoursePage
 * @class ManageCoursePage
 * @extends {React.Component}
 */
export class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      course: Object.assign({}, this.props.course),
      errors: {},
      saving: false,
      hasUnsavedChanges: false
    };
    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  /**
   * Component did mount life cycle method
   *
   * @memberof ManageCoursePage
   */
  componentDidMount() {
    this.props.router.setRouteLeaveHook(this.props.route, () => {
      if (this.state.hasUnsavedChanges) {
        return 'You have unsaved changes, are you sure you want to leave?';
      }
    });
  }

  /**
   * Component will receive props life cycle method
   *
   * @param {object} nextProps - Next properties passed to component
   * @memberof ManageCoursePage
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.course.id != nextProps.course.id) {
      this.setState({
        course: Object.assign({}, nextProps.course)
      });
    }
  }

  /**
   * Update course state event handler
   *
   * @param {object} event - Event object
   * @returns {object} New state
   * @memberof ManageCoursePage
   */
  updateCourseState(event) {
    const field = event.target.name;
    let course = Object.assign({}, this.state.course);
    course[field] = event.target.value;

    return this.setState({
      course,
      hasUnsavedChanges: true
    });
  }

  /**
   * Check if course form is valid
   *
   * @returns {boolean} True or false
   * @memberof ManageCoursePage
   */
  courseFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.course.title.length < 5) {
      errors.title = 'Title must be at least 5 characters.';
      formIsValid = false;
    }
    if (this.state.course.authorId.length < 1) {
      errors.authorId = 'Select an author.';
      formIsValid = false;
    }
    if (this.state.course.category.length < 1) {
      errors.category = "Category cannot be empty.";
      formIsValid = false;
    }
    if (!/^[0-9]+(?:(:[0-5][0-9])){1,2}$/.test(this.state.course.duration)) {
      errors.duration = 'Duration must contain only numbers and colon with ' +
        'appropriate time values in the format hh:mm:ss or mm:ss ';
      formIsValid = false;
    }

    this.setState({ errors });
    return formIsValid;
  }

  /**
   * Save course event handler
   *
   * @param {object} event - Event object
   * @returns {any}
   * @memberof ManageCoursePage
   */
  saveCourse(event) {
    event.preventDefault();

    if (!this.courseFormIsValid()) {
      return;
    }

    this.setState({ saving: true });
    this.props.actions.saveCourse(this.state.course)
      .then(() => {
        this.setState({
          saving: false,
          hasUnsavedChanges: false
        });
        toastr.success('Course saved successfully');
        this.context.router.push('/courses');
      })
      .catch(error => {
        toastr.error(error);
        this.setState({ saving: false });
      });
  }

  /**
   * Render method
   *
   * @returns {object} React element
   * @memberof ManageCoursePage
   */
  render() {
    return (
      <CourseForm
        allAuthors={this.props.authors}
        course={this.state.course}
        errors={this.state.errors}
        onChange={this.updateCourseState}
        onSave={this.saveCourse}
        saving={this.state.saving}
        routeParams={this.props.routeParams}
      />
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  routeParams: PropTypes.object
};

ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

/**
 * Map state to props
 *
 * @param {object} state - State
 * @param {object} ownProps - Own properties
 * @returns {object} Object mapped to props
 */
const mapStateToProps = (state, ownProps) => {
  const courseId = ownProps.params.id;
  let course = {
    id: '',
    watchHref: '',
    title: '',
    authorId: '',
    duration: '',
    category: ''
  };
  const courseExist = state.courses.some(course => course.id === courseId);

  if (courseId && courseExist) {
    course = state.courses.find(course => course.id === courseId);
  }

  return {
    course,
    authors: authorsFormattedForDropdown(state.authors)
  };
};

/**
 * Map dispatch to props
 *
 * @param {func} dispatch - Dispatch
 * @returns {object} Actions
 */
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(courseActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(ManageCoursePage));
