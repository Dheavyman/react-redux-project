import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';

const actionTypeEndsInSuccess = (type) => {
  return type.substring(type.length - 8) == '_SUCCESS';
};

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
