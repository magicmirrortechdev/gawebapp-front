import {authReducer} from "./reducers/authReducer";
import {userReducer} from "./reducers/userReducer";
import {combineReducers} from "redux";

const reducer = combineReducers({
    auth: authReducer,
    user: userReducer
})

export default reducer
