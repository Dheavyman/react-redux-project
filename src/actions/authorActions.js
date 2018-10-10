import * as actionTypes from './actionTypes';
import authorApi from '../api/mockAuthorApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';

export const loadAuthorSuccess = authors => {
  return {
    type: actionTypes.LOAD_AUTHORS_SUCCESS,
    authors
  };
};

export const createAuthorSuccess = author => ({
  type: actionTypes.CREATE_AUTHOR_SUCCESS,
  author
});

export const updateAuthorSuccess = author => ({
  type: actionTypes.UPDATE_AUTHOR_SUCCESS,
  author
});

export const deleteAuthorSuccess = authorId => ({
  type: actionTypes.DELETE_AUTHOR_SUCCESS,
  authorId
});

export const loadAuthors = () => (dispatch) => {
  dispatch(beginAjaxCall());
  return authorApi.getAllAuthors()
    .then(authors => {
      dispatch(loadAuthorSuccess(authors));
    })
    .catch(error => {
      throw(error);
    });
};

export const saveAuthor = author => (dispatch) => {
  dispatch(beginAjaxCall());
  return authorApi.saveAuthor(author)
    .then(savedAuthor => {
      author.id ? dispatch(updateAuthorSuccess(savedAuthor)) :
        dispatch(createAuthorSuccess(savedAuthor));
    })
    .catch(error => {
      dispatch(ajaxCallError(error));
      throw(error);
    });
};

export const deleteAuthor = authorId => (dispatch) => {
  return authorApi.deleteAuthor(authorId)
    .then(() => {
      dispatch(deleteAuthorSuccess(authorId));
    })
    .catch(error => {
      throw(error);
    });
};
