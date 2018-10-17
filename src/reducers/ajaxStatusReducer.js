import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';

/**
 * Check if action type ends in success
 *
 * @param {string} type - Action type
 * @returns {boolean} True or false
 */
const actionTypeEndsInSuccess = (type) => {
  return type.substring(type.length - 8) == '_SUCCESS';
};

/**
 * Ajax status reducer
 *
 * @param {number} [state=initialState.numAjaxCallsInProgress] - Number of ajax
 * calls
 * @param {object} action - Action object
 * @returns {number} New state
 */
const ajaxStatusReducer = (state = initialState.numAjaxCallsInProgress,
  action) => {
  if (action.type == actionTypes.BEGIN_AJAX_CALL) {
    return state + 1;
  } else if (action.type == actionTypes.AJAX_CALL_ERROR ||
      actionTypeEndsInSuccess(action.type)) {
    return state - 1;
  }

  return state;
};

export default ajaxStatusReducer;
