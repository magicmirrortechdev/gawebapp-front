import AuthService from '../../services/services'
const authService = new AuthService()

export const FETCH_INVOICE_SUCCESS = 'FETCH_INVOICE_SUCCESS'
export const FETCH_INVOICE_ADD_SUCCESS = 'FETCH_INVOICE_ADD_SUCCESS'
export const FETCH_INVOICE_UPDATE_SUCCESS = 'FETCH_INVOICE_UPDATE_SUCCESS'
export const FETCH_INVOICE_REMOVE_SUCCESS = 'FETCH_INVOICE_REMOVE_SUCCESS'

export const FETCH_INVOICE_FAILURE = 'FETCH_INVOICE_DECLINE_FAILURE'

export const getInvoices = (id) => async dispatch => {
    try{
        const response = await authService.getInvoices(id);
        dispatch({type: FETCH_INVOICE_SUCCESS, payload: response.data.invoices})
    } catch(err) {
        dispatch({type: FETCH_INVOICE_FAILURE, payload: err.message})
        console.log(err)
    }
}

export const convertInvoice = (id, data) => async dispatch =>{
    try {
        const response = await authService.convertInvoice(id, data)
        dispatch({type: FETCH_INVOICE_ADD_SUCCESS, payload: {id: id, data: response.data.estimate}})
    } catch (err){
        dispatch({type: FETCH_INVOICE_FAILURE, payload: err})
        console.log(err)
    }
}

export const addInvoice = (invoice) => async dispatch =>{
    try {
        const response = await authService.addInvoices(invoice)
        dispatch({type: FETCH_INVOICE_ADD_SUCCESS, payload: {id: response.data.invoice._id, data: response.data.invoice}})
    } catch (err){
        dispatch({type: FETCH_INVOICE_FAILURE, payload: err})
        console.log(err)
    }
}

export const removeInvoice = (id) => async dispatch =>{
    try {
        await authService.invoiceDelete(id)
        dispatch({type: FETCH_INVOICE_REMOVE_SUCCESS, payload: {id: id}})
    } catch (err){
        dispatch({type: FETCH_INVOICE_FAILURE, payload: err})
        console.log(err)
    }
}

export const updateInvoice = (id, item) => async dispatch =>{
    try {
        const response = await authService.updateInvoice(id, item)
        dispatch({type: FETCH_INVOICE_UPDATE_SUCCESS, payload: {id: id, data: response.data.invoice}})
    } catch (err){
        dispatch({type: FETCH_INVOICE_FAILURE, payload: err})
        console.log(err)
    }
}

export const payInvoice = (id, item) => async dispatch =>{
    try {
        const response = await authService.payInvoice(id, item)
        dispatch({type: FETCH_INVOICE_UPDATE_SUCCESS, payload: {id: id, data: response.data.invoice}})
    } catch (err){
        dispatch({type: FETCH_INVOICE_FAILURE, payload: err})
        console.log(err)
    }
}

export const sendInvoice = (invoice) => async dispatch =>{
    try {
        await authService.sendInvoice(invoice)
    } catch (err){
        dispatch({type: FETCH_INVOICE_FAILURE, payload: err})
        console.log(err)
    }
}
