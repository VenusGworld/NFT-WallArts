import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './accountReducer';
import infoReducer from './infoReducer';

export default configureStore({
  reducer: {
    account: accountReducer,
    info: infoReducer
  },
});
