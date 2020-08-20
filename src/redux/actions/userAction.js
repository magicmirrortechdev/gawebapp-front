import AuthService from '../../services/services'
const authService = new AuthService()

export const FETCH_WORKER_SENT = 'FETCH_WORKER_SENT'
export const FETCH_WORKER_SUCCESS = 'FETCH_WORKER_SUCCESS'
export const FETCH_WORKER_FAILURE = 'FETCH_WORKER_FAILURE'

export const FETCH_WORKER_ADD_SENT = 'FETCH_WORKER_ADD_SENT'
export const FETCH_WORKER_ADD_SUCCESS = 'FETCH_WORKER_ADD_SUCCESS'
export const FETCH_WORKER_ADD_FAILURE = 'FETCH_WORKER_ADD_FAILURE'

export const FETCH_WORKER_UPDATE_SENT = 'FETCH_WORKER_UPDATE_SENT'
export const FETCH_WORKER_UPDATE_SUCCESS = 'FETCH_WORKER_UPDATE_SUCCESS'
export const FETCH_WORKER_UPDATE_FAILURE = 'FETCH_WORKER_UPDATE_FAILURE'

export const FETCH_WORKER_REMOVE_SENT = 'FETCH_WORKER_REMOVE_SENT'
export const FETCH_WORKER_REMOVE_SUCCESS = 'FETCH_WORKER_REMOVE_SUCCESS'
export const FETCH_WORKER_REMOVE_FAILURE = 'FETCH_WORKER_REMOVE_FAILURE'

export const getUsers = () => async dispatch => {
    dispatch({type: FETCH_WORKER_SENT})
    try{
        const response = await authService.getUsers();
        dispatch({type: FETCH_WORKER_SUCCESS, payload: response.data.users})
    } catch(err) {
        dispatch({type: FETCH_WORKER_FAILURE, payload: err.message})
        console.log(err)
    }
}

export const addUser = (data) => async dispatch => {
    dispatch({type: FETCH_WORKER_ADD_SENT})
    try{
        const response = await authService.addWorker(data);
        dispatch({type: FETCH_WORKER_ADD_SUCCESS, payload: response.data.user})
    } catch(err) {
        dispatch({type: FETCH_WORKER_ADD_FAILURE, payload: err.message})
        console.log(err)
    }
}

export const updateUser = (id, data) => async dispatch => {
    dispatch({type: FETCH_WORKER_UPDATE_SENT})
    try{
        const response = await authService.updateWorker(id, data);
        dispatch({type: FETCH_WORKER_UPDATE_SUCCESS, payload: {id: id, data: response.data.user}})
    } catch(err) {
        dispatch({type: FETCH_WORKER_UPDATE_FAILURE, payload: err.message})
        console.log(err)
    }
}

export const removeUser = (id) => async dispatch => {
    dispatch({type: FETCH_WORKER_REMOVE_SENT})
    try {
        await authService.workerDelete(id)
        dispatch({type: FETCH_WORKER_REMOVE_SUCCESS, payload: {id: id}})
    } catch (err){
        dispatch({type: FETCH_WORKER_REMOVE_FAILURE, payload: err})
        console.log(err)
    }
}
