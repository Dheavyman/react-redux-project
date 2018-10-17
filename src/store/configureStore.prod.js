import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducers from '../reducers';

/**
 * Configure redux store for production environment
 *
 * @param {object} initialState - Initial state
 * @returns {object} Store object
 */
const configureStore = initialState => {
  return createStore(
    rootReducers,
    initialState,
    applyMiddleware(thunk)
  );
};

export default configureStore;
