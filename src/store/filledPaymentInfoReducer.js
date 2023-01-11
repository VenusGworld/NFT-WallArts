import { createSlice } from '@reduxjs/toolkit'

export const filledPaymentDeliveryInfoSlice = createSlice({
  name: 'filledPaymentDeliveryInfo',
  initialState: {
    info: {},
  },
  reducers: {
    clearResults() {
    },
    initialize(state) {
      state.info = {};
    },
    setPaymentDeliveryInfo: (state, action) => {
      state.info = action.payload;
    }
  },
})

export const { initialize, clearResults, setPaymentDeliveryInfo } = filledPaymentDeliveryInfoSlice.actions;

export const filledPaymentDeliveryInfo = (state) => state.filledPaymentInfo.info;

export default filledPaymentDeliveryInfoSlice.reducer;
