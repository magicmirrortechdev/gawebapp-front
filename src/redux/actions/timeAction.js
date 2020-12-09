import AuthService from '../../services/services'
const authService = new AuthService()

export const FETCH_TIME_SUCCESS = 'FETCH_TIME_SUCCESS'
export const FETCH_TIME_FAILURE = 'FETCH_TIME_FAILURE'

export const FETCH_TIME_ADD_SUCCESS = 'FETCH_TIME_ADD_SUCCESS'
export const FETCH_TIME_ADD_FAILURE = 'FETCH_TIME_ADD_FAILURE'

export const FETCH_TIME_UPDATE_SUCCESS = 'FETCH_TIME_UPDATE_SUCCESS'
export const FETCH_TIME_UPDATE_FAILURE = 'FETCH_TIME_UPDATE_FAILURE'

export const FETCH_TIME_REMOVE_SUCCESS = 'FETCH_TIME_REMOVE_SUCCESS'
export const FETCH_TIME_REMOVE_FAILURE = 'FETCH_TIME_REMOVE_FAILURE'

export const addTime = (data) => async dispatch => {
    try {
        const response = await authService.addTime(data);
        dispatch({ type: FETCH_TIME_ADD_SUCCESS, payload: response.data.time })
    } catch (err) {
        dispatch({ type: FETCH_TIME_ADD_FAILURE, payload: err.message })
        console.log(err)
    }
}

export const updateTime = (id, data) => async dispatch => {
    try {
        const response = await authService.updateTime(id, data)
        dispatch({ type: FETCH_TIME_UPDATE_SUCCESS, payload: { id: id, data: response.data.TIME } })
    } catch (err) {
        dispatch({ type: FETCH_TIME_UPDATE_FAILURE, payload: err.message })
        console.log(err)
    }
}

export const removeTime = (id) => async dispatch => {
    try {
        await authService.removeTime(id)
        dispatch({ type: FETCH_TIME_REMOVE_SUCCESS, payload: { id: id } })
    } catch (err) {
        dispatch({ type: FETCH_TIME_REMOVE_FAILURE, payload: err })
        console.log(err)
    }
}

export const getTimes = (id = undefined) => async dispatch => {
    try {
        let response = await authService.getTimes(id);
        dispatch({ type: FETCH_TIME_SUCCESS, payload: response.data.times })
    } catch (err) {
        dispatch({ type: FETCH_TIME_FAILURE, payload: err.message })
        console.log(err)
    }
}
