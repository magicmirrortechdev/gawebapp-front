import AuthService from '../../services/services'
import {
    FETCH_ESTIMATE_ADD_SUCCESS,
    FETCH_ESTIMATE_CONVERT_JOB_FAILURE,
    FETCH_ESTIMATE_DECLINE_FAILURE, FETCH_ESTIMATE_REMOVE_SUCCESS,
    FETCH_ESTIMATE_UPDATE_SUCCESS
} from "./estimateAction";
const authService = new AuthService()

export const FETCH_JOB_SUCCESS = 'FETCH_JOB_SUCCESS'
export const FETCH_JOB_FAILURE = 'FETCH_JOB_FAILURE'

export const FETCH_JOB_ADD_FAILURE = 'FETCH_JOB_ADD_FAILURE'
export const FETCH_JOB_UPDATE_FAILURE = 'FETCH_JOB_UPDATE_FAILURE'
export const FETCH_JOB_REMOVE_FAILURE = 'FETCH_JOB_REMOVE_FAILURE'

export const getJobs = () => async dispatch => {
    try{
        const response = await authService.getJobs();
        dispatch({type: FETCH_JOB_SUCCESS, payload: response.data.jobs})
    } catch(err) {
        dispatch({type: FETCH_JOB_FAILURE, payload: err.message})
        console.log(err)
    }
}

export const addJob = (data) => async dispatch => {
    try{
        const response = await authService.addJob(data);
        const response2 = await authService.getJob(response.data.estimate._id)

        dispatch({type: FETCH_ESTIMATE_ADD_SUCCESS, payload: response2.data.estimate})
    } catch(err) {
        dispatch({type: FETCH_JOB_ADD_FAILURE, payload: err.message})
        console.log(err)
    }
}

export const updateJob = (id, data) => async dispatch => {
    try{
        const response = await authService.updateEstimate(id, data);
        dispatch({type: FETCH_ESTIMATE_UPDATE_SUCCESS, payload: {id: id, data: response.data.estimate}})
    } catch(err) {
        dispatch({type: FETCH_JOB_UPDATE_FAILURE, payload: err.message})
        console.log(err)
    }
}

export const removeJob = (id) => async dispatch => {
    try {
        await authService.deleteEstimate(id)
        dispatch({type: FETCH_ESTIMATE_REMOVE_SUCCESS, payload: {id: id}})
    } catch (err){
        dispatch({type: FETCH_JOB_REMOVE_FAILURE, payload: err})
        console.log(err)
    }
}

export const convertJob = (id, item) => async dispatch => {
    try {
        await authService.convertJob(id)
        item.status = 'Approve'
        dispatch({type: FETCH_ESTIMATE_UPDATE_SUCCESS, payload: {id: id, data: item}})
    } catch (err){
        dispatch({type: FETCH_ESTIMATE_CONVERT_JOB_FAILURE, payload: err})
        console.log(err)
    }
}

export const closeJob = (id, item) => async dispatch => {
    try {
        await authService.closeJob(id)
        item.status = 'Closed'
        dispatch({type: FETCH_ESTIMATE_UPDATE_SUCCESS, payload: {id: id, data: item}})
    } catch (err){
        dispatch({type: FETCH_ESTIMATE_DECLINE_FAILURE, payload: err})
        console.log(err)
    }
}

export const convertInvoice = (id, data) => async dispatch =>{
    try {
        const response = await authService.convertInvoice(id, data)
        dispatch({type: FETCH_ESTIMATE_UPDATE_SUCCESS, payload: {id: id, data: response.data.estimate}})
    } catch (err){
        dispatch({type: FETCH_ESTIMATE_DECLINE_FAILURE, payload: err})
        console.log(err)
    }
}

export const addInvoice = (invoice) => async dispatch =>{
    try {
        const response = await authService.addInvoice(invoice)
    } catch (err){
        dispatch({type: FETCH_ESTIMATE_DECLINE_FAILURE, payload: err})
        console.log(err)
    }
}

export const removeInvoice = (id, invoiceId) => async dispatch =>{
    try {
        const response = await authService.invoiceDelete(id, invoiceId)
        dispatch({type: FETCH_ESTIMATE_UPDATE_SUCCESS, payload: {id: id, data: response.data.estimate}})
    } catch (err){
        dispatch({type: FETCH_ESTIMATE_DECLINE_FAILURE, payload: err})
        console.log(err)
    }
}

export const updateInvoice = (id, invoiceId, item) => async dispatch =>{
    try {
        const response = await authService.updateInvoice(id, invoiceId, item)
        dispatch({type: FETCH_ESTIMATE_UPDATE_SUCCESS, payload: {id: id, data: response.data.estimate}})
    } catch (err){
        dispatch({type: FETCH_ESTIMATE_DECLINE_FAILURE, payload: err})
        console.log(err)
    }
}

export const payInvoice = (id, invoiceId, item) => async dispatch =>{
    try {
        const response = await authService.payInvoice(id, invoiceId, item)
        dispatch({type: FETCH_ESTIMATE_UPDATE_SUCCESS, payload: {id: id, data: response.data.estimate}})
    } catch (err){
        dispatch({type: FETCH_ESTIMATE_DECLINE_FAILURE, payload: err})
        console.log(err)
    }
}

export const sendInvoice = (invoice) => async dispatch =>{
    try {
        const response = await authService.sendInvoice(invoice)
    } catch (err){
        dispatch({type: FETCH_ESTIMATE_DECLINE_FAILURE, payload: err})
        console.log(err)
    }
}

export const addWorkers = (id, data) => async dispatch => {
    try {
        const response = await authService.addWorkers(id, data)
        dispatch({type: FETCH_ESTIMATE_UPDATE_SUCCESS, payload: {id: id, data: response.data.estimate}})
    } catch (err){
        dispatch({type: FETCH_ESTIMATE_DECLINE_FAILURE, payload: err})
        console.log(err)
    }
}

export const addProjectManager = (id, data) => async dispatch => {
    try {
        const response = await authService.addProjectManager(id, data)
        dispatch({type: FETCH_ESTIMATE_UPDATE_SUCCESS, payload: {id: id, data: response.data.estimate}})
    } catch (err){
        dispatch({type: FETCH_ESTIMATE_DECLINE_FAILURE, payload: err})
        console.log(err)
    }
}

export const addExpense = (id, data) => async dispatch =>{
    try {
        const response = await authService.addExpense(id, data)
        dispatch({type: FETCH_ESTIMATE_UPDATE_SUCCESS, payload: {id: id, data: response.data.estimate}})
    } catch (err){
        dispatch({type: FETCH_ESTIMATE_DECLINE_FAILURE, payload: err})
        console.log(err)
    }
}

export const removeExpense = (id, expenseId) => async dispatch =>{
    try {
        const response = await authService.removeExpense(id, expenseId)
        dispatch({type: FETCH_ESTIMATE_UPDATE_SUCCESS, payload: {id: id, data: response.data.estimate}})
    } catch (err){
        dispatch({type: FETCH_ESTIMATE_DECLINE_FAILURE, payload: err})
        console.log(err)
    }
}

export const updateExpense = (id, expenseId, item) => async dispatch =>{
    try {
        const response = await authService.updateExpense(id, expenseId, item)
        dispatch({type: FETCH_ESTIMATE_UPDATE_SUCCESS, payload: {id: id, data: response.data.estimate}})
    } catch (err){
        dispatch({type: FETCH_ESTIMATE_DECLINE_FAILURE, payload: err})
        console.log(err)
    }
}
