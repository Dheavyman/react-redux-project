import * as actionTypes from '../actions/actionTypes';
import initialState from './initialState';

const authorReducer = (state = initialState.authors, action) => {
  switch(action.type) {
    case actionTypes.LOAD_AUTHORS_SUCCESS:
      return action.authors;

    case actionTypes.CREATE_AUTHOR_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.author)
      ];

    case actionTypes.UPDATE_AUTHOR_SUCCESS:
      return [
        ...state.filter(author => author.id !== action.author.id),
        Object.assign({}, action.author)
      ];

    case actionTypes.DELETE_AUTHOR_SUCCESS:
      return [
        ...state.filter(author => author.id !== action.authorId)
      ];

    default:
      return state;
  }
};

export default authorReducer;
