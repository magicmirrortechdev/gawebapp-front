import {authReducer} from "./reducers/authReducer";
import {userReducer} from "./reducers/userReducer";
import {clientReducer} from "./reducers/clientReducer"
import {combineReducers} from "redux";

const reducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    client: clientReducer
})

export default reducer
