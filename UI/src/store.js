import {createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const initialState = {};

export default function configureStore(initialState){
    return createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(thunk)),
    )
}
// import { createStore } from 'redux'
//
// import reducers from './reducers/index'
//
// const store = createStore(
//   reducers,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )
//
// export default store
