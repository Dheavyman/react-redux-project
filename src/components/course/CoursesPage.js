import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';

import CourseList from './CourseList';
import * as courseActions from '../../actions/courseActions';

/**
 * Course page component
 *
 * @class CoursesPage
 * @extends {React.Component}
 */
class CoursesPage extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
  }

  redirectToAddCoursePage() {
    browserHistory.push('/course');
  }

  deleteCourse(courseId) {
    this.props.actions.deleteCourse(courseId)
      .then(() => {
        toastr.success('Course deleted successfully');
      })
      .catch(error => {
        toastr.error(error);
      });
  }

  /**
   * Render method
   *
   * @returns {object} React element
   * @memberof CoursesPage
   */
  render() {
    const { courses } =  this.props;
    return (
      <div>
        <h1>Courses</h1>
        <input
          type="submit"
          value="Add Course"
          className="btn btn-primary"
          onClick={this.redirectToAddCoursePage}
        />
        <CourseList courses={courses} onDelete={this.deleteCourse} />
      </div>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  courses: state.courses
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(courseActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
