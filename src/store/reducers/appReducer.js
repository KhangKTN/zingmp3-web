import actionTypes from '../actions/actionTypes'

const initState = {
    banner: {},
    newRelease: [],
    seasonTheme: [],
    weekChart: [],
    top100: [],
    chart: {},
    rank: []
}

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_HOME:
            return {
                ...state,
                banner: action.data?.filter((item) => item.sectionId === 'abc') || [],
                seasonTheme: action.data?.filter((item) => item?.sectionId?.includes('Theme')) || [],
                newRelease: action.data?.filter((item) => item.sectionType === 'new-release') || [],
                weekChart: action.data?.filter((item) => item.sectionType === 'weekChart') || [],
                top100: action.data?.filter((item) => item.sectionId === 'h100') || [],
                chart: action.data?.filter((item) => item.sectionId === 'hZC')[0].chart || [],
                rank: action.data?.filter((item) => item.sectionId === 'hZC')[0].items || []
            }
        default:
            return state
    }
}

export default appReducer
