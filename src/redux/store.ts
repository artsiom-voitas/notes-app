import { configureStore } from '@reduxjs/toolkit';
import notesReducer from './notes/notesSlice';
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistReducer,
    persistStore
} from 'redux-persist';
import storage from 'redux-persist/es/storage';

const persistConfig = {
    key: 'root',
    storage
};
const persistedReducer = persistReducer(persistConfig, notesReducer);

export const store = configureStore({
    reducer: {
        notesReducer: persistedReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
