import { AsyncStorage } from 'react-native';
import Constants from '../config/constants'
export const getData = (token) => ({
    type:Constants.GET_TOKEN,
    token,
});

export const saveData = token => ({
    type: Constants.SAVE_TOKEN,
    token
});

export const removeData = () => ({
    type: Constants.REMOVE_TOKEN,
});

export const loading = bool => ({
    type: Constants.LOADING,
    isLoading: bool,
});

export const error = error => ({
    type: 'ERROR',
    error,
});

export const getUserToken = () => dispatch => 

 AsyncStorage.getItem('userToken')
        .then((data) => {
            dispatch(loading(false));
            dispatch(getData(data));
        })
        .catch((err) => {
            dispatch(loading(false));
            dispatch(error(err.message || 'ERROR'));
        })



export const saveUserToken = (data) => dispatch =>
    AsyncStorage.setItem('userToken', 'abc')
        .then((data) => {
            dispatch(loading(false));
            dispatch(saveData('token saved'));
        })
        .catch((err) => {
            dispatch(loading(false));
            dispatch(error(err.message || 'ERROR'));
        })

export const removeUserToken = () => dispatch =>
    AsyncStorage.removeItem('userToken')
        .then((data) => {
            dispatch(loading(false));
            dispatch(removeData(data));
        })
        .catch((err) => {
            dispatch(loading(false));
            dispatch(error(err.message || 'ERROR'));
        })