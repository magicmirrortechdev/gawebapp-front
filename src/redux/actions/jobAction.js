import AuthService from '../../services/services'
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

export const FETCH_JOB_SUCCESS = 'FETCH_JOB_SUCCESS'
export const FETCH_JOB_FAILURE = 'FETCH_JOB_FAILURE'

export const FETCH_JOB_ADD_FAILURE = 'FETCH_JOB_ADD_FAILURE'
export const FETCH_JOB_UPDATE_FAILURE = 'FETCH_JOB_UPDATE_FAILURE'
export const FETCH_JOB_REMOVE_FAILURE = 'FETCH_JOB_REMOVE_FAILURE'

export const addEstimate = (data) => async dispatch => {
    try{
        const response = await authService.addEstimate(data);
        dispatch({type: FETCH_ESTIMATE_ADD_SUCCESS, payload: response.data.job})
    } catch(err) {
        dispatch({type: FETCH_ESTIMATE_ADD_FAILURE, payload: err.message})
        console.log(err)
    }
}

export const updateEstimate = (id, data) => async dispatch => {
    try{
        const response = await authService.updateEstimate(id, data)
        dispatch({type: FETCH_ESTIMATE_UPDATE_SUCCESS, payload: {id: id, data: response.data.job}})
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


export const getJobs = (id = undefined) => async dispatch => {
    try{
        let response;
        if (id === undefined){
            response = await authService.getEstimates();
        }else{
            response = await authService.getEstimates(id);
        }
        dispatch({type: FETCH_JOB_SUCCESS, payload: response.data.estimates})
    } catch(err) {
        dispatch({type: FETCH_JOB_FAILURE, payload: err.message})
        console.log(err)
    }
}

export const addJob = (data) => async dispatch => {
    try{
        const response = await authService.addJob(data);
        dispatch({type: FETCH_ESTIMATE_ADD_SUCCESS, payload: response.data.estimate})
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
        dispatch({type: FETCH_ESTIMATE_UPDATE_SUCCESS, payload: {id: response.data.invoice._id, data: response.data.invoice}})
    } catch (err){
        dispatch({type: FETCH_ESTIMATE_DECLINE_FAILURE, payload: err})
        console.log(err)
    }
}

export const payInvoice = (id, item) => async dispatch =>{
    try {
        const response = await authService.payInvoice(id, item)
        dispatch({type: FETCH_ESTIMATE_UPDATE_SUCCESS, payload: {id: id, data: response.data.invoice}})
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

export const updateTime = (estimateId, workerId, timeId, data) => async dispatch => {
    try {
        const response = await authService.updateTime(estimateId, workerId, timeId, data)
        dispatch({type: FETCH_ESTIMATE_UPDATE_SUCCESS, payload: {id: estimateId, data: response.data.estimate}})
    } catch (err){
        dispatch({type: FETCH_ESTIMATE_DECLINE_FAILURE, payload: err})
        console.log(err)
    }
}

export const removeTime = (estimateId, workerId, timeId) => async dispatch =>{
    try {
        const response = await authService.removeTime(estimateId, workerId, timeId)
        dispatch({type: FETCH_ESTIMATE_UPDATE_SUCCESS, payload: {id: estimateId, data: response.data.estimate}})
    } catch (err){
        dispatch({type: FETCH_ESTIMATE_DECLINE_FAILURE, payload: err})
        console.log(err)
    }
}
