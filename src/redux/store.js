import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import {persistStore, persistReducer} from 'redux-persist'
import localforage from 'localforage';
import { createOffline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults/index';
import { composeWithDevTools } from 'redux-devtools-extension';

import {authReducer} from "./reducers/authReducer";
import {userReducer} from "./reducers/userReducer";
import {clientReducer} from "./reducers/clientReducer";
import {jobReducer} from "./reducers/jobReducer";
import axios from "axios";

const effect = (effect, _action) => axios(effect);
const discard = async (error, _action, _retries) => {
    const { request, response } = error;
    if (!request) throw error; // There was an error creating the request
    if (!response) return false; // There was no response
    return 400 <= response.status && response.status < 500;
};

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

const {
    middleware: offlineMiddleware,
    enhanceReducer: offlineEnhanceReducer,
    enhanceStore: offlineEnhanceStore
} = createOffline({
    ...offlineConfig,
    persist: false,
    effect,
    discard
});

const reducer = combineReducers({
    auth: authReducer,
    user: persistReducer(userPersistConfig, userReducer),
    client: persistReducer(clientPersistConfig, clientReducer),
    job: persistReducer(jobsPersistConfig, jobReducer)
})

const persistedReducer = persistReducer(authPersistConfig, offlineEnhanceReducer(reducer))

export default function configureStore() {
    const store = createStore(
        persistedReducer,
        composeWithDevTools(
            offlineEnhanceStore,
            applyMiddleware(thunk, offlineMiddleware)
        )
    );
    const persistor = persistStore(store);

    return { persistor, store };

}
