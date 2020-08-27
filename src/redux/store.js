import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {persistStore, persistReducer} from 'redux-persist'
import localforage from 'localforage';
import {authReducer} from "./reducers/authReducer";
import {userReducer} from "./reducers/userReducer";
import {clientReducer} from "./reducers/clientReducer";
import {jobReducer} from "./reducers/jobReducer";

const authPersistConfig = {
    key: 'ga:auth',
    storage: localforage,
    whitelist: ['auth']
}

const clientPersistConfig = {
    key: 'ga:client',
    storage: localforage,
}

const userPersistConfig = {
    key: 'ga:user',
    storage: localforage,
}

const jobsPersistConfig = {
    key: 'ga:job',
    storage: localforage,
}

const reducer = combineReducers({
    auth: authReducer,
    user: persistReducer(userPersistConfig, userReducer),
    client: persistReducer(clientPersistConfig, clientReducer),
    job: persistReducer(jobsPersistConfig, jobReducer)
})

const persistedReducer = persistReducer(authPersistConfig, reducer)
export const store = createStore(persistedReducer, applyMiddleware(thunk))
export const persistor = persistStore(store)
