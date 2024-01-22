import actionTypes from './actionTypes';

export const setCurrentSong = (songId) => ({
    type: actionTypes.SET_CURRENT_SONG,
    songId
})

export const setIsPlay = (isPlay) => ({
    type: actionTypes.PLAY,
    isPlay
})