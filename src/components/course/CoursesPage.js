import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import toastr from 'toastr';

import CourseList from './CourseList';
import Pagination from '../common/Pagination';
import * as courseActions from '../../actions/courseActions';
import { sortByTitleAscending }from '../../selectors/selectors';

/**
 * Course page component
 *
 * @class CoursesPage
 * @extends {React.Component}
 */
class CoursesPage extends React.Component {
  /**
   *Creates an instance of CoursesPage.
   *
   * @param {object} props - Properties passed to component
   * @param {object} context - Context passed to component
   * @memberof CoursesPage
   */
  constructor(props, context) {
    super(props, context);
    this.state = {
      pageCourses: []
    };
    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
  }

  /**
   * Redirect to add course page
   *
   * @memberof CoursesPage
   */
  redirectToAddCoursePage() {
    browserHistory.push('/course');
  }

  /**
   * Delete course
   *
   * @param {number} courseId - Id of the course
   * @memberof CoursesPage
   */
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
   * Page change handler
   *
   * @param {array} pageCourses - Courses in a page
   * @memberof CoursesPage
   */
  onPageChange(pageCourses) {
    this.setState({ pageCourses });
  }

  /**
   * Render method
   *
   * @returns {object} React element
   * @memberof CoursesPage
   */
  render() {
    const { pageCourses } = this.state;

    return (
      <div>
        <h1>Courses</h1>
        <input
          type="submit"
          value="Add Course"
          className="btn btn-primary"
          onClick={this.redirectToAddCoursePage}
        />
        {pageCourses.length > 0
        ? <CourseList courses={pageCourses} onDelete={this.deleteCourse} />
        : (
          <div>
            <br />
            <h4 className="">
              No course added yet. Click on add course button to add new course.
            </h4>
          </div>
          )
        }
        <Pagination
          items={this.props.courses}
          currentPage={1}
          itemsPerPage={2}
          onPageChange={this.onPageChange}
        />
      </div>
    );
  }
}

CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

/**
 * Map state to props
 *
 * @param {object} state - State
 * @returns {object} Object mapped to props
 */
const mapStateToProps = state => {
  const courses = [...state.courses];
  courses.sort(sortByTitleAscending);

  return {
    courses
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

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
