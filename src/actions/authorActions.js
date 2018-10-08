import * as actionTypes from './actionTypes';
import authorApi from '../api/mockAuthorApi';

export const loadAuthorSuccess = authors => {
  return {
    type: actionTypes.LOAD_AUTHORS_SUCCESS,
    authors
  };
};

export const loadAuthors = () => (dispatch) => {
  return authorApi.getAllAuthors()
    .then(authors => {
      dispatch(loadAuthorSuccess(authors));
    })
    .catch(error => {
      throw(error);
    });
};
