import { createSlice } from '@reduxjs/toolkit'

export const accountSlice = createSlice({
  name: 'info',
  initialState: {
    eth_to_usd: 0,
  },
  reducers: {
    setEthPrice: (state, action) => {
      state.eth_to_usd = action.payload;
    },
  },
})

export const { setEthPrice } = accountSlice.actions;

export const ethPrice = (state) => state.info.eth_to_usd;

export default accountSlice.reducer;
