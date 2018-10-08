import * as actionTypes from './actionTypes';
import courseApi from '../api/mockCourseApi';

export const loadCoursesSuccess = courses => {
  return {
    type: actionTypes.LOAD_COURSES_SUCCESS,
    courses
  };
};

export const loadCourses = () => (dispatch) => {
  return courseApi.getAllCourses()
    .then(courses => {
      dispatch(loadCoursesSuccess(courses));
    })
    .catch(error => {
      throw(error);
    });
};
