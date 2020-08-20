import {
    FETCH_WORKER_SENT,
    FETCH_WORKER_SUCCESS,
    FETCH_WORKER_FAILURE,
    FETCH_WORKER_REMOVE_SENT,
    FETCH_WORKER_REMOVE_SUCCESS,
    FETCH_WORKER_REMOVE_FAILURE,
    FETCH_WORKER_ADD_FAILURE,
    FETCH_WORKER_ADD_SUCCESS,
    FETCH_WORKER_UPDATE_SUCCESS,
    FETCH_WORKER_UPDATE_FAILURE
} from '../actions/userAction'
import {LOG_LOGOUT_USER} from '../actions/authAction'
import {merger, adder, updater, remover} from './actionReducers'

const initialState = {
    users: []
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_WORKER_REMOVE_SENT:
        case FETCH_WORKER_SENT:
            return state;
        case LOG_LOGOUT_USER:
            state = initialState
            return state
        case FETCH_WORKER_SUCCESS:
            return merger(state, {users: action.payload, usersErr: undefined})
        case FETCH_WORKER_FAILURE:
            return merger(state, {usersEr: action.payload})

        case FETCH_WORKER_ADD_SUCCESS:
            return {...state, users: adder(state.users, action.payload)}
        case FETCH_WORKER_ADD_FAILURE:
            return merger(state, {usersEr: action.payload})

        case FETCH_WORKER_UPDATE_SUCCESS:
            let index = state.users.findIndex(u => u._id === action.payload.id)
            console.log(index, updater(state.users, action.payload.data, index))

            return {...state, users: updater(state.users, action.payload, index)}
        case FETCH_WORKER_UPDATE_FAILURE:
            return merger(state, {usersEr: action.payload})

        case FETCH_WORKER_REMOVE_SUCCESS:
            return {...state, users: remover(state.users, action.payload.id)}
        case FETCH_WORKER_REMOVE_FAILURE:
            return merger(state, {usersEr: action.payload})

        default:
            return state
    }
}
