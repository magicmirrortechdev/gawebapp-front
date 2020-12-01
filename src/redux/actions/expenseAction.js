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

export const addEXPENSE = (data) => async dispatch => {
    try {
        const response = await authService.addEXPENSE(data);
        const response2 = await authService.getEXPENSE(response.data.expense._id)

        dispatch({ type: FETCH_EXPENSE_ADD_SUCCESS, payload: response2.data.expense })
    } catch (err) {
        dispatch({ type: FETCH_EXPENSE_ADD_FAILURE, payload: err.message })
        console.log(err)
    }
}

export const updateEXPENSE = (id, data) => async dispatch => {
    try {
        const response = await authService.updateEXPENSE(id, data)
        dispatch({ type: FETCH_EXPENSE_UPDATE_SUCCESS, payload: { id: id, data: response.data.expense } })
    } catch (err) {
        dispatch({ type: FETCH_EXPENSE_UPDATE_FAILURE, payload: err.message })
        console.log(err)
    }
}

export const removeEXPENSE = (id) => async dispatch => {
    try {
        await authService.deleteExpense(id)
        dispatch({ type: FETCH_EXPENSE_REMOVE_SUCCESS, payload: { id: id } })
    } catch (err) {
        dispatch({ type: FETCH_EXPENSE_REMOVE_FAILURE, payload: err })
        console.log(err)
    }
}

export const getExpenses = (id = undefined) => async dispatch => {
    try {
        let response;
        if (id === undefined) {
            response = await authService.getExpenses();
        } else {
            response = await authService.getExpenses(id);
        }
        dispatch({ type: FETCH_EXPENSE_SUCCESS, payload: response.data.expenses })
    } catch (err) {
        dispatch({ type: FETCH_EXPENSE_FAILURE, payload: err.message })
        console.log(err)
    }
}