import actionTypes from "../actions/actionTypes";

const initState = {
    banner: {},
    newRelease: {},
    seasonTheme: {},
    weekChart: {},
    top100: {},
    chart: {},
    rank: []
}

const appReducer = (state = initState, action) => {
    switch(action.type){
        case actionTypes.GET_HOME:
            return {
                ...state,
                banner: action.data?.filter(item => item.sectionId === 'hSlider') || null,
                seasonTheme: action.data?.filter(item => item?.sectionId?.includes('Theme')) || null,
                newRelease: action.data?.filter(item => item.sectionType === 'new-release') || null,
                weekChart: action.data?.filter(item => item.sectionType === 'weekChart') || null,
                top100: action.data?.filter(item => item.sectionId === 'h100') || null,
                chart: action.data?.filter(item => item.sectionId === 'hZC')[0].chart || null,
                rank: action.data?.filter(item => item.sectionId === 'hZC')[0].items || null
            }
        default:
            return state
            // break
    }
}

export default appReducer