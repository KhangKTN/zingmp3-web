import * as apis from '../../apis'
import actionTypes from './actionTypes'

export const getHomePage = () => async (dispatch) => {
    try {
        const res = await apis.getHome()

        if (res?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_HOME,
                data: res.data.data.items
            })
        } else {
            dispatch({
                type: actionTypes.GET_HOME,
                data: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_HOME,
            data: null
        })
    }
}
