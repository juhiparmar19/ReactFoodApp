import { AsyncStorage } from 'react-native';
import Constants from '../../config/constants'

export const getToken = (token) => ({
    type:Constants.GET_TOKEN,
    token,
});

export const saveToken = token => ({
    type: Constants.SAVE_TOKEN,
    token
});

export const removeToken = () => ({
    type: Constants.REMOVE_TOKEN,
});
export const saveUserData =(userData) => (
    console.log("saveUserData",userData),
    {
    type: Constants.SAVE_USER,
    userData
    
});
export const saveProfileImage =(uri) => (
    console.log("saveProfileImage",uri),
    {
    type: Constants.SAVE_PROFILE_IMAGE,
    uri
    
});

export const loading = bool => ({
    type: Constants.LOADING,
    loading: bool,
});

export const error = error => ({
    type: 'ERROR',
    error,
});

export const reset = () => ({
    type: Constants.RESET,
});
// export const getUserToken = () => dispatch => 

//  AsyncStorage.getItem('userToken')
//         .then((data) => {
//             dispatch(loading(false));
//             dispatch(getData(data));
//         })
//         .catch((err) => {
//             dispatch(loading(false));
//             dispatch(error(err.message || 'ERROR'));
//         })



// export const saveUserToken = (data) => dispatch =>
//     AsyncStorage.setItem('userToken', 'abc')
//         .then((data) => {
//             dispatch(loading(false));
//             dispatch(saveData('token saved'));
//         })
//         .catch((err) => {
//             dispatch(loading(false));
//             dispatch(error(err.message || 'ERROR'));
//         })

// export const removeUserToken = () => dispatch =>
//     AsyncStorage.removeItem('userToken')
//         .then((data) => {
//             dispatch(loading(false));
//             dispatch(removeData(data));
//         })
//         .catch((err) => {
//             dispatch(loading(false));
//             dispatch(error(err.message || 'ERROR'));
//         })