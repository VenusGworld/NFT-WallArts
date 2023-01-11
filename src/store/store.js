import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
// import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

import accountReducer from "./accountReducer";
import selectedReducer from "./selectedReducer";
import cartReducer from "./cartReducer";
import filledPaymentDeliveryInfoSlice from "./filledPaymentInfoReducer";

// const persistConfig = {
//   key: 'root',
//   storage,
// }

const appReducer = combineReducers({
  account:
    accountReducer,
  selectedData:
    selectedReducer,
  cart:
    cartReducer,
  filledPaymentInfo:
    filledPaymentDeliveryInfoSlice
});

const rootReducer = (state, action) => {
  if (action.type === 'account/clearResults') {
    // this applies to all keys defined in persistConfig(s)
    storage.removeItem('persist:root')
    state = {}
  }
  return appReducer(state, action)
}

// const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  // reducer: persistedReducer,
  reducer: rootReducer,
  middleware: [thunk],
});

export default store;

// export const persistor = persistStore(store);
