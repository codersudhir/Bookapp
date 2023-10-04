import { applyMiddleware, combineReducers, legacy_createStore } from 'redux'

import { Reducer as bookReducer } from './reducer'
import thunk from 'redux-thunk'
const rootReducer = combineReducers({
    bookReducer,
  
})
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))