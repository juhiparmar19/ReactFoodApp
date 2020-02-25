import { createStore, combineReducers } from 'redux';
import rootReducer from '../redux/reducers';

export default createStore(
    combineReducers({
        rootReducer
    })
)