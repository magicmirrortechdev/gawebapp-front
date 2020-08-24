import AuthService from '../../services/services'
const authService = new AuthService()

export const FETCH_CLIENT_SENT = 'FETCH_CLIENT_SENT'
export const FETCH_CLIENT_SUCCESS = 'FETCH_CLIENT_SUCCESS'
export const FETCH_CLIENT_FAILURE = 'FETCH_CLIENT_FAILURE'

export const FETCH_CLIENT_ADD_SENT = 'FETCH_CLIENT_ADD_SENT'
export const FETCH_CLIENT_ADD_SUCCESS = 'FETCH_CLIENT_ADD_SUCCESS'
export const FETCH_CLIENT_ADD_FAILURE = 'FETCH_CLIENT_ADD_FAILURE'

export const FETCH_CLIENT_UPDATE_SENT = 'FETCH_CLIENT_UPDATE_SENT'
export const FETCH_CLIENT_UPDATE_SUCCESS = 'FETCH_CLIENT_UPDATE_SUCCESS'
export const FETCH_CLIENT_UPDATE_FAILURE = 'FETCH_CLIENT_UPDATE_FAILURE'

export const FETCH_CLIENT_REMOVE_SENT = 'FETCH_CLIENT_REMOVE_SENT'
export const FETCH_CLIENT_REMOVE_SUCCESS = 'FETCH_CLIENT_REMOVE_SUCCESS'
export const FETCH_CLIENT_REMOVE_FAILURE = 'FETCH_CLIENT_REMOVE_FAILURE'

export const getClients = () => async dispatch => {
    dispatch({type: FETCH_CLIENT_SENT})
    try{
        const response = await authService.getClients();
        dispatch({type: FETCH_CLIENT_SUCCESS, payload: response.data.clients})
    } catch(err) {
        dispatch({type: FETCH_CLIENT_FAILURE, payload: err.message})
        console.log(err)
    }
}

export const addClient = (data) => async dispatch => {
    dispatch({type: FETCH_CLIENT_ADD_SENT})
    try{
        const response = await authService.addClient(data);
        dispatch({type: FETCH_CLIENT_ADD_SUCCESS, payload: response.data.client})
    } catch(err) {
        dispatch({type: FETCH_CLIENT_ADD_FAILURE, payload: err.message})
        console.log(err)
    }
}

export const updateClient = (id, data) => async dispatch => {
    dispatch({type: FETCH_CLIENT_UPDATE_SENT})
    try{
        const response = await authService.updateClient(id, data);
        dispatch({type: FETCH_CLIENT_UPDATE_SUCCESS, payload: {id: id, data: response.data.client}})
    } catch(err) {
        dispatch({type: FETCH_CLIENT_UPDATE_FAILURE, payload: err.message})
        console.log(err)
    }
}

export const removeClient = (id) => async dispatch => {
    dispatch({type: FETCH_CLIENT_REMOVE_SENT})
    try {
        await authService.deleteClient(id)
        dispatch({type: FETCH_CLIENT_REMOVE_SUCCESS, payload: {id: id}})
    } catch (err){
        dispatch({type: FETCH_CLIENT_REMOVE_FAILURE, payload: err})
        console.log(err)
    }
}
