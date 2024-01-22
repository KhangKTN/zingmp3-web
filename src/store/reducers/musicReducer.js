import actionTypes from "../actions/actionTypes";

const initState = {
    currentSong: '',
    isPlay: false
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
        default:
            return state
    }
}

export default musicReducer