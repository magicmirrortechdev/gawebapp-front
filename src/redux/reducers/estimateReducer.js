import {
    FETCH_ESTIMATE_SUCCESS,
    FETCH_ESTIMATE_FAILURE,
    FETCH_ESTIMATE_REMOVE_SUCCESS,
    FETCH_ESTIMATE_REMOVE_FAILURE,
    FETCH_ESTIMATE_ADD_FAILURE,
    FETCH_ESTIMATE_ADD_SUCCESS,
    FETCH_ESTIMATE_UPDATE_SUCCESS,
    FETCH_ESTIMATE_UPDATE_FAILURE,
    FETCH_ESTIMATE_CONVERT_JOB_FAILURE,
    FETCH_ESTIMATE_DECLINE_FAILURE
} from '../actions/estimateAction'
import {LOG_LOGOUT_USER} from '../actions/authAction'
import {merger, adder, updater, remover} from './actionReducers'

const initialState = {
    estimates: []
}

export const estimateReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_LOGOUT_USER:
            state = initialState
            return state
        case FETCH_ESTIMATE_SUCCESS:
            return merger(state, {estimates: action.payload, estimatesErr: undefined})

        case FETCH_ESTIMATE_ADD_SUCCESS:
            return {...state, estimates: adder(state.estimates, action.payload)}

        case FETCH_ESTIMATE_UPDATE_SUCCESS:
            try{
                let index = state.estimates.findIndex(u => u._id === action.payload.id)
                return {...state, estimates: updater(state.estimates, action.payload.data, index)}
            } catch(e){
                return state
            }

        case FETCH_ESTIMATE_REMOVE_SUCCESS:
            try{
                return {...state, estimates: remover(state.estimates, action.payload.id)}
            } catch(e){
                return state
            }

        case FETCH_ESTIMATE_FAILURE:
        case FETCH_ESTIMATE_ADD_FAILURE:
        case FETCH_ESTIMATE_REMOVE_FAILURE:
        case FETCH_ESTIMATE_UPDATE_FAILURE:
        case FETCH_ESTIMATE_CONVERT_JOB_FAILURE:
        case FETCH_ESTIMATE_DECLINE_FAILURE:
            return merger(state, {estimatesEr: action.payload})

        default:
            return state
    }
}
