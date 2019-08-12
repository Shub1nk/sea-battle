import { createStore, compose } from 'redux';

import rootReducer from './reducers';
import middlewares from './middlewares';

let composeEnhancers = compose;
composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(middlewares));

export default store;