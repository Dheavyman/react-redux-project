import * as actionTypes from './actionTypes';
import courseApi from '../api/mockCourseApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';

/**
 * Load courses success action creator
 *
 * @param {array} courses - List of authors
 * @returns {object} Load courses action
 */
export const loadCoursesSuccess = courses => ({
  type: actionTypes.LOAD_COURSES_SUCCESS,
  courses
});

/**
 * Create course success action creator
 *
 * @param {object} course - Course
 * @returns {object} Create course success action
 */
export const createCourseSuccess = course => ({
  type: actionTypes.CREATE_COURSE_SUCCESS,
  course
});

/**
 * Update course success action creator
 *
 * @param {object} course - Course
 * @returns {object} Update course action
 */
export const updateCourseSuccess = course => ({
  type: actionTypes.UPDATE_COURSE_SUCCESS,
  course
});

/**
 * Delete course success action creator
 *
 * @param {number} courseId - Id of course
 * @returns {object} Delete course success action
 */
export const deleteCourseSuccess = courseId => ({
  type: actionTypes.DELETE_COURSE_SUCCESS,
  courseId
});

/**
 * Load courses async action creator
 *
 */
export const loadCourses = () => (dispatch) => {
  dispatch(beginAjaxCall());
  return courseApi.getAllCourses()
    .then(courses => {
      dispatch(loadCoursesSuccess(courses));
    })
    .catch(error => {
      throw(error);
    });
};

/**
 * Save course async action creator
 *
 * @param {*} course
 */
export const saveCourse = course => (dispatch) => {
  dispatch(beginAjaxCall());
  return courseApi.saveCourse(course)
    .then(savedCourse => {
      course.id ? dispatch(updateCourseSuccess(savedCourse)) :
        dispatch(createCourseSuccess(savedCourse));
    })
    .catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
};

/**
 * Delete course async action creator
 *
 * @param {number} courseId - Id of course
 */
export const deleteCourse = courseId => (dispatch) => {
  return courseApi.deleteCourse(courseId)
    .then(() => {
      dispatch(deleteCourseSuccess(courseId));
    })
    .catch(error => {
      throw(error);
    });
};
