import * as actionTypes from './actionTypes';

/**
 * Begin ajax request action creator
 *
 * @returns {object} begin ajax request action
 */
export const beginAjaxCall = () => ({
  type: actionTypes.BEGIN_AJAX_CALL
});

/**
 * Ajax call error action creator
 *
 * @param {object} error - Error object
 * @returns {object} Ajax call error object
 */
export const ajaxCallError = error => ({
  type: actionTypes.AJAX_CALL_ERROR,
  error
});
