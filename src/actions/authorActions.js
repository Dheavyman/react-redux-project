import * as actionTypes from './actionTypes';
import authorApi from '../api/mockAuthorApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';

/**
 * Load authors success action creator
 *
 * @param {array} authors - List of authors
 * @returns {object} Load authors success action
 */
export const loadAuthorSuccess = authors => {
  return {
    type: actionTypes.LOAD_AUTHORS_SUCCESS,
    authors
  };
};

/**
 * Create author success action creator
 *
 * @param {object} author - Author
 * @returns {object} Create author success action
 */
export const createAuthorSuccess = author => ({
  type: actionTypes.CREATE_AUTHOR_SUCCESS,
  author
});

/**
 * Update author success action creator
 *
 * @param {object} author - Author
 * @returns {object} - Update author success action
 */
export const updateAuthorSuccess = author => ({
  type: actionTypes.UPDATE_AUTHOR_SUCCESS,
  author
});

/**
 * Delete author success action creator
 *
 * @param {number} authorId - Id of the author
 * @returns {object} Delete author action
 */
export const deleteAuthorSuccess = authorId => ({
  type: actionTypes.DELETE_AUTHOR_SUCCESS,
  authorId
});

/**
 * Load authors async action creator
 *
 */
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

/**
 * Save author async action creator
 *
 * @param {object} author - Author
 */
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

/**
 * Delete author async action creator
 *
 * @param {number} authorId - Id of the author
 */
export const deleteAuthor = authorId => (dispatch) => {
  return authorApi.deleteAuthor(authorId)
    .then(() => {
      dispatch(deleteAuthorSuccess(authorId));
    })
    .catch(error => {
      throw(error);
    });
};
