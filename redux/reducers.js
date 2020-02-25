import Constants from '../config/constants'
const initialState = {
    feedList: [],
}
function rootReducer (state = initialState, action) {
    switch (action.type) {
        case Constants.SAVE_FEED:
            return { ...state, feedList: action.feedData };
       
        default:
            return state;
    }
};

export default rootReducer;
