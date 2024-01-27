import actionTypes from "../actions/actionTypes";

const initState = {
    currentSong: '',
    isPlay: false,
    isNext: false,
    songs: []
}

const musicReducer = (state = initState, action) => {
    switch(action.type){
        case actionTypes.SET_CURRENT_SONG:
            return{
                ...state,
                currentSong: action.songId || ''
            }
        case actionTypes.PLAY:
            return{
                ...state,
                isPlay: action.isPlay
            }
        case actionTypes.IS_NEXT:
            return{
                ...state,
                isNext: action.isNext
            }
        case actionTypes.SET_SONGS:
            return{
                ...state,
                songs: action.data
            }
        default:
            return state
    }
}

export default musicReducer