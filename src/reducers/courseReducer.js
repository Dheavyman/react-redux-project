import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';

/**
 * Course reducer
 *
 * @param {array} [state=initialState.courses] - Course
 * @param {object} action - Action object
 * @returns {array} New state
 */
const courseReducer = (state = initialState.courses, action) => {
  switch(action.type) {
    case actionTypes.LOAD_COURSES_SUCCESS:
      return action.courses;

    case actionTypes.CREATE_COURSE_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.course)
      ];

    case actionTypes.UPDATE_COURSE_SUCCESS:
      return [
        ...state.filter(course => course.id !== action.course.id),
        Object.assign({}, action.course)
      ];

    case actionTypes.DELETE_COURSE_SUCCESS:
      return [
        ...state.filter(course => course.id !== action.courseId)
      ];

    default:
      return state;
  }
};

export default courseReducer;
