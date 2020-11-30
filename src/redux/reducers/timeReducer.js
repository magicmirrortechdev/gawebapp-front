import {
  FETCH_TIME_ADD_SUCCESS,
  FETCH_TIME_ADD_FAILURE,
  FETCH_TIME_FAILURE,
  FETCH_TIME_REMOVE_FAILURE,
  FETCH_TIME_REMOVE_SUCCESS,
  FETCH_TIME_SUCCESS,
  FETCH_TIME_UPDATE_FAILURE,
  FETCH_TIME_UPDATE_SUCCESS,
} from '../actions/timeAction'
import {LOG_LOGOUT_USER} from '../actions/authAction'
import {merger, adder, updater, remover} from './actionReducers'

const initialState = {
  times: []
}

export const timeReducer = (state = initialState, action) => {
  switch (action.type) {
      case LOG_LOGOUT_USER:
          state = initialState
          return state
      case FETCH_TIME_SUCCESS:
          return merger(state, {times: action.payload, timesErr: undefined})

      case FETCH_TIME_ADD_SUCCESS:
          return {...state, times: adder(state.times, action.payload)}

      case FETCH_TIME_UPDATE_SUCCESS:
          try{
              let index = state.times.findIndex(u => u._id === action.payload.id)
              return {...state, timess: updater(state.times, action.payload.data, index)}
          } catch(e){
              return state
          }

      case FETCH_TIME_REMOVE_SUCCESS:
          try{
              return {...state, times: remover(state.times, action.payload.id)}
          }catch(e){
              return state
          }

      case FETCH_TIME_FAILURE:
      case FETCH_TIME_ADD_FAILURE:
      case FETCH_TIME_REMOVE_FAILURE:
      case FETCH_TIME_UPDATE_FAILURE:
          return merger(state, {timesEr: action.payload})

      default:
          return state
  }
}
