import { createStore, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

import rootReducers from '../reducers';

const configureStore = initialState => {
  return createStore(
    rootReducers,
    initialState,
    applyMiddleware(reduxImmutableStateInvariant())
  );
};

export default configureStore;
