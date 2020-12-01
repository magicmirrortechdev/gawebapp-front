import {
    FETCH_EXPENSE_ADD_SUCCESS,
    FETCH_EXPENSE_ADD_FAILURE,
    FETCH_EXPENSE_FAILURE,
    FETCH_EXPENSE_REMOVE_FAILURE,
    FETCH_EXPENSE_REMOVE_SUCCESS,
    FETCH_EXPENSE_SUCCESS,
    FETCH_EXPENSE_UPDATE_FAILURE,
    FETCH_EXPENSE_UPDATE_SUCCESS,
} from '../actions/expenseAction'
import { LOG_LOGOUT_USER } from '../actions/authAction'
import { merger, adder, updater, remover } from './actionReducers'

const initialState = {
    expenses: []
}

export const expenseReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_LOGOUT_USER:
            state = initialState
            return state
        case FETCH_EXPENSE_SUCCESS:
            return merger(state, { expenses: action.payload, expensesErr: undefined })

        case FETCH_EXPENSE_ADD_SUCCESS:
            return {...state, expenses: adder(state.expenses, action.payload) }

        case FETCH_EXPENSE_UPDATE_SUCCESS:
            try {
                let index = state.expenses.findIndex(u => u._id === action.payload.id)
                return {...state, expenses: updater(state.expenses, action.payload.data, index) }
            } catch (e) {
                return state
            }

        case FETCH_EXPENSE_REMOVE_SUCCESS:
            try {
                return {...state, expenses: remover(state.expenses, action.payload.id) }
            } catch (e) {
                return state
            }

        case FETCH_EXPENSE_FAILURE:
        case FETCH_EXPENSE_ADD_FAILURE:
        case FETCH_EXPENSE_REMOVE_FAILURE:
        case FETCH_EXPENSE_UPDATE_FAILURE:
            return merger(state, { expensesEr: action.payload })

        default:
            return state
    }
}