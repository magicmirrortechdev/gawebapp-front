import AuthService from '../../services/services'
const authService = new AuthService()

export const FETCH_EXPENSE_SUCCESS = 'FETCH_EXPENSE_SUCCESS'
export const FETCH_EXPENSE_FAILURE = 'FETCH_EXPENSE_FAILURE'

export const FETCH_EXPENSE_ADD_SUCCESS = 'FETCH_EXPENSE_ADD_SUCCESS'
export const FETCH_EXPENSE_ADD_FAILURE = 'FETCH_EXPENSE_ADD_FAILURE'

export const FETCH_EXPENSE_UPDATE_SUCCESS = 'FETCH_EXPENSE_UPDATE_SUCCESS'
export const FETCH_EXPENSE_UPDATE_FAILURE = 'FETCH_EXPENSE_UPDATE_FAILURE'

export const FETCH_EXPENSE_REMOVE_SUCCESS = 'FETCH_EXPENSE_REMOVE_SUCCESS'
export const FETCH_EXPENSE_REMOVE_FAILURE = 'FETCH_EXPENSE_REMOVE_FAILURE'

export const addExpense = (data) => async dispatch => {
    try {
        const response = await authService.addExpense(data);
        const response2 = await authService.getExpense(response.data.expense._id)

        dispatch({ type: FETCH_EXPENSE_ADD_SUCCESS, payload: response2.data.expense })
    } catch (err) {
        dispatch({ type: FETCH_EXPENSE_ADD_FAILURE, payload: err.message })
        console.log(err)
    }
}

export const updateExpense = (id, data) => async dispatch => {
    try {
        const response = await authService.updateExpense(id, data)
        dispatch({ type: FETCH_EXPENSE_UPDATE_SUCCESS, payload: { id: id, data: response.data.expense } })
    } catch (err) {
        dispatch({ type: FETCH_EXPENSE_UPDATE_FAILURE, payload: err.message })
        console.log(err)
    }
}

export const removeExpense = (id) => async dispatch => {
    try {
        await authService.removeExpense(id)
        dispatch({ type: FETCH_EXPENSE_REMOVE_SUCCESS, payload: { id: id } })
    } catch (err) {
        dispatch({ type: FETCH_EXPENSE_REMOVE_FAILURE, payload: err })
        console.log(err)
    }
}

export const getExpenses = (id) => async dispatch => {
    try {
        let response = await authService.getExpenses(id);
        dispatch({ type: FETCH_EXPENSE_SUCCESS, payload: response.data.expenses })
    } catch (err) {
        dispatch({ type: FETCH_EXPENSE_FAILURE, payload: err.message })
        console.log(err)
    }
}
