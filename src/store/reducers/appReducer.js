import actionTypes from "../actions/actionTypes";

const initState = {
    banner: {},
    seasonTheme: {},
    newRelease: {}
}

const appReducer = (state = initState, action) => {
    switch(action.type){
        case actionTypes.GET_HOME:
            return {
                ...state,
                banner: action.data?.filter(item => item.sectionId === 'hSlider') || null,
                seasonTheme: action.data?.filter(item => item.sectionId === 'hSeasonTheme') || null,
                newRelease: action.data?.filter(item => item.sectionType === 'new-release') || null,
            }
        default:
            return state
            // break
    }
}

export default appReducer