import actionTypes from '../actions/actionTypes'

const initState = {
    currentSong: '',
    isPlay: false,
    isNext: false,
    songs: null,
    songRecent: []
}

const musicReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_SONG:
            return {
                ...state,
                currentSong: action.songId || ''
            }
        case actionTypes.PLAY:
            return {
                ...state,
                isPlay: action.isPlay
            }
        case actionTypes.IS_NEXT:
            return {
                ...state,
                isNext: action.isNext
            }
        case actionTypes.SET_SONGS:
            return {
                ...state,
                songs: action.data
            }
        case actionTypes.SONG_RECENT:
            let songRecent = [...state.songRecent]
            let index = songRecent.findIndex(item => item.encodeId === action.songId.encodeId)
            if (index >= 0) songRecent.splice(index, 1)
            songRecent.unshift(action.songId)
            if (songRecent.length > 20) songRecent.pop()
            // console.log(songRecent);
            return {
                ...state,
                songRecent: songRecent
            }
        case actionTypes.CLEAR_RECENT:
            return {
                ...state,
                songRecent: []
            }
        default:
            return state
    }
}

export default musicReducer
