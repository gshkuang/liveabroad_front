import { createStore, compose, applyMiddleware } from 'redux';

import reducers from './index';
import thunk from 'redux-thunk';

const store = createStore(reducers,compose(
  applyMiddleware(thunk)
  // ,
  // (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__() 
));


export default store