import { createStore, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

import rootReducers from '../reducers';

/**
 * Configure redux store for development environment
 *
 * @param {object} initialState - Initial state
 * @returns {object} Store object
 */
const configureStore = initialState => {
  return createStore(
    rootReducers,
    initialState,
    applyMiddleware(thunk, reduxImmutableStateInvariant())
  );
};

export default configureStore;
