import React, { PropTypes } from 'react';
import { Link } from 'react-router';

/**
 * Course list row component
 *
 * @param {object} course - Course
 * @param {func} onDelete - On delete handler
 * @returns
 */
const CourseListRow = ({course, onDelete}) => {
  /**
   * Delete course event handler
   *
   */
  const deleteCourse = () => (
    onDelete(course.id)
  );

  return (
    <tr>
      <td><a href={course.watchHref} target="_blank">Watch</a></td>
      <td><Link to={'/course/' + course.id}>{course.title}</Link></td>
      <td>{course.authorId}</td>
      <td>{course.category}</td>
      <td>{course.duration}</td>
      <td>
        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={deleteCourse}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

CourseListRow.propTypes = {
  course: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default CourseListRow;
