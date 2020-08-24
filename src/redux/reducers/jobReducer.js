import {
    FETCH_JOB_SUCCESS,
    FETCH_JOB_FAILURE,
    FETCH_JOB_REMOVE_FAILURE,
    FETCH_JOB_ADD_FAILURE,
    FETCH_JOB_UPDATE_FAILURE
} from '../actions/jobAction'
import {LOG_LOGOUT_USER} from '../actions/authAction'
import {merger, adder, updater, remover} from './actionReducers'
import {
    FETCH_ESTIMATE_ADD_SUCCESS,
    FETCH_ESTIMATE_REMOVE_SUCCESS,
    FETCH_ESTIMATE_UPDATE_SUCCESS
} from "../actions/estimateAction";

const initialState = {
    jobs: []
}

export const jobReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_LOGOUT_USER:
            state = initialState
            return state
        case FETCH_JOB_SUCCESS:
            return merger(state, {jobs: action.payload, jobsErr: undefined})

        case FETCH_ESTIMATE_ADD_SUCCESS:
            return {...state, jobs: adder(state.jobs, action.payload)}

        case FETCH_ESTIMATE_UPDATE_SUCCESS:
            try{
                let index = state.jobs.findIndex(u => u._id === action.payload.id)
                return {...state, jobs: updater(state.jobs, action.payload.data, index)}
            } catch(e){
                return state
            }

        case FETCH_ESTIMATE_REMOVE_SUCCESS:
            try{
                return {...state, jobs: remover(state.jobs, action.payload.id)}
            }catch(e){
                return state
            }

        case FETCH_JOB_FAILURE:
        case FETCH_JOB_ADD_FAILURE:
        case FETCH_JOB_REMOVE_FAILURE:
        case FETCH_JOB_UPDATE_FAILURE:
            return merger(state, {jobsEr: action.payload})

        default:
            return state
    }
}
