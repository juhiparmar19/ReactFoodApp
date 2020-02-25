import Constants from '../../config/constants'

export const saveFeed = (feedData) => (
    {
    type:Constants.SAVE_FEED,
    feedData,
});

export const updateFeed = (feed)  => ({
    type: Constants.UPDATE_FEED,
    feed
});

