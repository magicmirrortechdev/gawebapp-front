import {
    FETCH_CLIENT_SENT,
    FETCH_CLIENT_SUCCESS,
    FETCH_CLIENT_FAILURE,
    FETCH_CLIENT_REMOVE_SENT,
    FETCH_CLIENT_REMOVE_SUCCESS,
    FETCH_CLIENT_REMOVE_FAILURE,
    FETCH_CLIENT_ADD_FAILURE,
    FETCH_CLIENT_ADD_SUCCESS,
    FETCH_CLIENT_UPDATE_SUCCESS,
    FETCH_CLIENT_UPDATE_FAILURE
} from '../actions/clientAction'
import {LOG_LOGOUT_USER} from '../actions/authAction'
import {merger, adder, updater, remover} from './actionReducers'

const initialState = {
    clients: []
}

export const clientReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CLIENT_REMOVE_SENT:
        case FETCH_CLIENT_SENT:
            return state;
        case LOG_LOGOUT_USER:
            state = initialState
            return state
        case FETCH_CLIENT_SUCCESS:
            return merger(state, {clients: action.payload, clientsErr: undefined})
        case FETCH_CLIENT_FAILURE:
            return merger(state, {clientsEr: action.payload})

        case FETCH_CLIENT_ADD_SUCCESS:
            return {...state, clients: adder(state.clients, action.payload)}
        case FETCH_CLIENT_ADD_FAILURE:
            return merger(state, {clientsEr: action.payload})

        case FETCH_CLIENT_UPDATE_SUCCESS:
            let index = state.clients.findIndex(u => u._id === action.payload.id)
            return {...state, clients: updater(state.clients, action.payload.data, index)}
        case FETCH_CLIENT_UPDATE_FAILURE:
            return merger(state, {clientsEr: action.payload})

        case FETCH_CLIENT_REMOVE_SUCCESS:
            return {...state, clients: remover(state.clients, action.payload.id)}
        case FETCH_CLIENT_REMOVE_FAILURE:
            return merger(state, {clientsEr: action.payload})

        default:
            return state
    }
}
