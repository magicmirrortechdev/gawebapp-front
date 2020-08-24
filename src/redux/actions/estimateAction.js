import AuthService from '../../services/services'
import {getJobs} from "./jobAction";
import {getClients} from "./clientAction";
const authService = new AuthService()

export const FETCH_ESTIMATE_SUCCESS = 'FETCH_ESTIMATE_SUCCESS'
export const FETCH_ESTIMATE_FAILURE = 'FETCH_ESTIMATE_FAILURE'

export const FETCH_ESTIMATE_ADD_SUCCESS = 'FETCH_ESTIMATE_ADD_SUCCESS'
export const FETCH_ESTIMATE_ADD_FAILURE = 'FETCH_ESTIMATE_ADD_FAILURE'

export const FETCH_ESTIMATE_UPDATE_SUCCESS = 'FETCH_ESTIMATE_UPDATE_SUCCESS'
export const FETCH_ESTIMATE_UPDATE_FAILURE = 'FETCH_ESTIMATE_UPDATE_FAILURE'

export const FETCH_ESTIMATE_REMOVE_SUCCESS = 'FETCH_ESTIMATE_REMOVE_SUCCESS'
export const FETCH_ESTIMATE_REMOVE_FAILURE = 'FETCH_ESTIMATE_REMOVE_FAILURE'

export const FETCH_ESTIMATE_CONVERT_JOB_FAILURE = 'FETCH_ESTIMATE_CONVERT_JOB_FAILURE'

export const FETCH_ESTIMATE_DECLINE_FAILURE = 'FETCH_ESTIMATE_DECLINE_FAILURE'


export const getEstimates = (id = "") => async dispatch => {
    try{
        const response = await authService.getEstimates(id);
        dispatch({type: FETCH_ESTIMATE_SUCCESS, payload: response.data.estimates})
    } catch(err) {
        dispatch({type: FETCH_ESTIMATE_FAILURE, payload: err.message})
        console.log(err)
    }
}

export const addEstimate = (data) => async dispatch => {
    try{
        const response = await authService.addEstimate(data);
        const response2 = await authService.getEstimate(response.data.estimate._id)

        dispatch({type: FETCH_ESTIMATE_ADD_SUCCESS, payload: response2.data.estimate})
        getClients();
    } catch(err) {
        dispatch({type: FETCH_ESTIMATE_ADD_FAILURE, payload: err.message})
        console.log(err)
    }
}

export const updateEstimate = (id, data) => async dispatch => {
    try{
        const response = await authService.updateEstimate(id, data)
        dispatch({type: FETCH_ESTIMATE_UPDATE_SUCCESS, payload: {id: id, data: response.data.estimate}})
    } catch(err) {
        dispatch({type: FETCH_ESTIMATE_UPDATE_FAILURE, payload: err.message})
        console.log(err)
    }
}

export const removeEstimate = (id) => async dispatch => {
    try {
        await authService.deleteEstimate(id)
        dispatch({type: FETCH_ESTIMATE_REMOVE_SUCCESS, payload: {id: id}})
    } catch (err){
        dispatch({type: FETCH_ESTIMATE_REMOVE_FAILURE, payload: err})
        console.log(err)
    }
}

export const convertJob = (id, item) => async dispatch => {
    try {
        await authService.convertJob(id, item)
        item.isJob= true
        item.status= 'Approve'
        dispatch({type: FETCH_ESTIMATE_UPDATE_SUCCESS, payload: {id: id, data: item}})
    } catch (err){
        dispatch({type: FETCH_ESTIMATE_CONVERT_JOB_FAILURE, payload: err})
        console.log(err)
    }
}

export const decline = (id, item) => async dispatch => {
    try {
        await authService.decline(id)
        item.status = 'Decline'
        dispatch({type: FETCH_ESTIMATE_UPDATE_SUCCESS, payload: {id: id, data: item}})
    } catch (err){
        dispatch({type: FETCH_ESTIMATE_DECLINE_FAILURE, payload: err})
        console.log(err)
    }
}
