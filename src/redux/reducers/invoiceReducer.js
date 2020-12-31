import {
    FETCH_INVOICE_SUCCESS,
    FETCH_INVOICE_ADD_SUCCESS,
    FETCH_INVOICE_UPDATE_SUCCESS,
    FETCH_INVOICE_REMOVE_SUCCESS
} from '../actions/invoiceAction'
import {LOG_LOGOUT_USER} from '../actions/authAction'
import {merger, adder, updater, remover} from './actionReducers'

const initialState = {
    invoices: []
}

export const invoiceReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_LOGOUT_USER:
            state = initialState
            return state
        case FETCH_INVOICE_SUCCESS:
            return merger(state, {invoices: action.payload, invoicesErr: undefined})

        case FETCH_INVOICE_ADD_SUCCESS:
            return {...state, invoices: adder(state.invoices, action.payload)}

        case FETCH_INVOICE_UPDATE_SUCCESS:
            try{
                let index = state.invoices.findIndex(u => u._id === action.payload.id)
                return {...state, invoices: updater(state.invoices, action.payload.data, index)}
            } catch(e){
                return state
            }

        case FETCH_INVOICE_REMOVE_SUCCESS:
            try{
                return {...state, invoices: remover(state.invoices, action.payload.id)}
            }catch(e){
                return state
            }

        default:
            return state
    }
}
