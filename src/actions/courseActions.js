import * as actionTypes from './actionTypes';

export const createCourse = course => {
  return {
    type: actionTypes.CREATE_COURSE,
    course
  };
};
