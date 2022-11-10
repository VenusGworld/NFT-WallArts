import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import accountReducer from './accountReducer';
import infoReducer from './infoReducer';

const persistAccConfig = {
  key: 'account',
  storage,
}

const persistInfoConfig = {
  key: 'info',
  storage,
}
 
const rootReducer = combineReducers({ 
  account: persistReducer(persistAccConfig, accountReducer),
  info: persistReducer(persistInfoConfig, infoReducer),
})

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk]
});

export default store;

export const persistor = persistStore(store)