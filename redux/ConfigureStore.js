import { createStore, combineReducers } from 'redux';
import rootReducer from './Reducers';

export default createStore(
    combineReducers({
        rootReducer
    })
)