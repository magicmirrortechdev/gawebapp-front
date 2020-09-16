import AuthService from '../../services/services'
import Global from "../../global";
const authService = new AuthService()

// action types
export const UPDATE_USER = 'UPDATE_USER'

export const LOG_IN_SENT = 'LOG_IN_SENT'
export const LOG_IN_FULFILLED = 'LOG_IN_FULFILLED'
export const LOG_IN_REJECTED = 'LOG_IN_REJECTED'
export const SAVE_VERSION = 'SAVE_VERSION'
export const LOG_LOGOUT_USER = 'LOG_LOGOUT_USER'
export const LOG_LOGOUT_USER_REJECT = 'LOG_LOGOUT_USER_REJECT'

// async action creator
export const logInUser = (data) => async dispatch => {
    dispatch({type: LOG_IN_SENT})
    dispatch({type: SAVE_VERSION, payload: Global.version});

    authService.login(data)
    .then(response => {
        dispatch({type: LOG_IN_FULFILLED, payload: response.data.user})
    })
    .catch(err => {
        console.log(err.response)
        dispatch({type: LOG_IN_REJECTED, payload: err.message})
    })
}

export const logoutUser = () => async dispatch => {
    dispatch({type: LOG_LOGOUT_USER})
    await authService.logout()
    .catch(err => {
        dispatch({type: LOG_LOGOUT_USER_REJECT, payload: err.message})
        console.log(err)
    })
}
