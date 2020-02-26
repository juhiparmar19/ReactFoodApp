import Constants from '../config/constants'
const initialState = {
    user: '',
    imageUri: '',
    feedList: [],
    isLoading
}
function rootReducer(state = initialState, action) {
    switch (action.type) {
        case Constants.SAVE_FEED:
            return { ...state, feedList: action.feedData };
        case Constants.SAVE_USER:
            return { ...state, user: action.userData };
        case Constants.RESET:
            return {initialState};
        case Constants.SAVE_PROFILE_IMAGE:
            return { ...state, imageUri: action.uri };
            case Constants.LOADING:
            return { ...state, isLoading: action.loading };
        default:
            return state;
    }
};

export default rootReducer;
