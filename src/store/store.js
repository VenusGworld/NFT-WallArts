import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import accountReducer from './accountReducer';
import infoReducer from './infoReducer';

const persistConfig = {
  key: 'root',
  storage,
}
 
const persistedUserReducer = persistReducer(persistConfig, accountReducer)

const store = configureStore({
  reducer: {
    account: persistedUserReducer,
    info: infoReducer
  },
  middleware: [thunk]
});

export default store;

export const persistor = persistStore(store)