import * as actionTypes from './actionTypes';

export const beginAjaxCall = () => ({
  type: actionTypes.BEGIN_AJAX_CALL
});

export const ajaxCallError = error => ({
  type: actionTypes.AJAX_CALL_ERROR,
  error
});
