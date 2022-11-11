import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    orderedProducts: [],
  },
  reducers: {
    addingCart: (state, action) => {
      let arr = state.orderedProducts;
      arr.push(action.payload);
      state.orderedProducts = arr;
    },
    clearResults() {
    }
  },
})

export const { addingCart, initialize, clearResults } = cartSlice.actions;

export const orderedProducts = (state) => state.cart;

export default cartSlice.reducer;
