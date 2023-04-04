import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer.js';

//creating store plus applying middleware
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;