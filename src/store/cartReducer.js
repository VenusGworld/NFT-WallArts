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
    },
    initialize(state) {
      state.orderedProducts = [];
    },
    setCart: (state, action) => {
      state.orderedProducts = action.payload;
    }
  },
})

export const { addingCart, initialize, clearResults, setCart } = cartSlice.actions;

export const orderedProducts = (state) => state.cart;

export default cartSlice.reducer;
