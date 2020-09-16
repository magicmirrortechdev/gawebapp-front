import {
    LOG_IN_SENT,
    LOG_IN_FULFILLED,
    LOG_IN_REJECTED,
    LOG_LOGOUT_USER, SAVE_VERSION
} from '../actions/authAction'
import {merger} from './actionReducers'

const initialState = {
    userLogged : null
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_VERSION:
            localStorage.setItem("version", action.payload)
            return state
        case LOG_IN_SENT:
            return state;
        case LOG_IN_FULFILLED:
            return merger(state, {userLogged: action.payload, loginErr: undefined})
        case LOG_IN_REJECTED:
            return merger(state, {loginErr: action.payload})
        case LOG_LOGOUT_USER:
            state = initialState
            return state
        default:
            return state
    }
}
