import { configureStore } from "@reduxjs/toolkit";
import { contactsInitState } from "./contact/contact.init-state";
import { contactsReducer } from "./contact/contact.slice";

import {
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
    
const initState = {
    contacts: contactsInitState,
}

export const store = configureStore({
    devTools: true,
    preloadedState: initState,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    
    reducer: {
        contacts: contactsReducer,
    }
});

export const persistor = persistStore(store);