import actionTypes from './actionTypes'

export const setCurrentSong = songId => ({
    type: actionTypes.SET_CURRENT_SONG,
    songId
})

export const setIsPlay = isPlay => ({
    type: actionTypes.PLAY,
    isPlay
})

export const setIsNext = isNext => ({
    type: actionTypes.IS_NEXT,
    isNext
})

export const setList = data => ({
    type: actionTypes.SET_SONGS,
    data
})

export const setSongRecent = songId => ({
    type: actionTypes.SONG_RECENT,
    songId
})

export const clearSongRecent = () => ({
    type: actionTypes.CLEAR_RECENT
})

/* export const setList = (id) => async(dispatch) => {
    try {
        const res = await apis.getPlaylist(id)
        dispatch({
            type: actionTypes.SET_SONGS,
            data: res?.data.err === 0 ? res.data.data.song.items : []
        })
    } catch (error) {
        dispatch({
            type: actionTypes.SET_SONGS,
            data: []
        })
    }
} */