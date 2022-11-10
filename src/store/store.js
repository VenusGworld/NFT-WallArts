import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

import accountReducer from "./accountReducer";
import infoReducer from "./infoReducer";
import selectedReducer from "./selectedReducer";

const rootReducer = combineReducers({
  account: persistReducer(
    {
      key: "account",
      storage,
    },
    accountReducer
  ),
  info: persistReducer(
    {
      key: "info",
      storage,
    },
    infoReducer
  ),
  selectedData: persistReducer(
    { key: "selected_data", storage },
    selectedReducer
  ),
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

export default store;

export const persistor = persistStore(store);
