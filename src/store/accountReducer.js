import { createSlice } from '@reduxjs/toolkit'

export const accountSlice = createSlice({
  name: 'account',
  initialState: {
    account: '',
    isConnected: false,
    chain: 0
  },
  reducers: {
    connect: (state, action) => {
      state.isConnected = true;
      state.account = action.payload;
    },
    disConnect: (state) => {
      state.isConnected = false;
      state.account = '';
      state.chain = '';
    },
    setChain: (state, action) => {
      state.chain = action.payload
    },
    clearResults() {
    }
  },
})

export const { connect, disConnect, setChain, initialize, clearResults } = accountSlice.actions;

export const isConnected = (state) => state.account.isConnected;
export const connectedChain = (state) => state.account.chain;
export const connectedAccount = (state) => state.account.account;

export default accountSlice.reducer;
