import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducers from '../reducers';

const configureStore = initialState => {
  return createStore(
    rootReducers,
    initialState,
    applyMiddleware(thunk)
  );
};

export default configureStore;
