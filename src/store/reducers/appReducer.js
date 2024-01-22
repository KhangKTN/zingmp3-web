import actionTypes from "../actions/actionTypes";

const initState = {
    banner: []
}

const appReducer = (state = initState, action) => {
    switch(action.type){
        case actionTypes.GET_HOME:
            return {
                ...state,
                banner: action.data?.filter(item => item.sectionType === 'banner') || null
            }
        default:
            return state
            // break
    }
}

export default appReducer