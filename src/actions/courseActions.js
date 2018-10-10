import * as actionTypes from './actionTypes';
import courseApi from '../api/mockCourseApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';

export const loadCoursesSuccess = courses => ({
  type: actionTypes.LOAD_COURSES_SUCCESS,
  courses
});

export const createCourseSuccess = course => ({
  type: actionTypes.CREATE_COURSE_SUCCESS,
  course
});

export const updateCourseSuccess = course => ({
  type: actionTypes.UPDATE_COURSE_SUCCESS,
  course
});

export const deleteCourseSuccess = courseId => ({
  type: actionTypes.DELETE_COURSE_SUCCESS,
  courseId
});

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

export const deleteCourse = courseId => (dispatch) => {
  return courseApi.deleteCourse(courseId)
    .then(() => {
      dispatch(deleteCourseSuccess(courseId));
    })
    .catch(error => {
      throw(error);
    });
};
