import * as actionTypes from '../actions/actionTypes';

const courseReducer = (state = [], action) => {
  switch(action.type) {
    case actionTypes.LOAD_COURSES_SUCCESS:
      return action.courses;

    default:
      return state;
  }
};

export default courseReducer;
