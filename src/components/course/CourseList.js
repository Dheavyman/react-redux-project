import React, { PropTypes } from 'react';
import CourseListRow from './CourseListRow';

/**
 * Course list component
 *
 * @param {array} courses - Courses
 * @param {func} onDelete - On delete handler
 * @returns {object} React element
 */
const CourseList = ({courses, onDelete}) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>&nbsp;</th>
          <th>Title</th>
          <th>Author</th>
          <th>Category</th>
          <th>Duration</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {courses.map(course => (
          <CourseListRow
            key={course.id}
            course={course}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
};

CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default CourseList;
