import { createSlice } from '@reduxjs/toolkit'

export const selectedReducer = createSlice({
  name: 'selectedData',
  initialState: {
    nft_img: "",
    item_data: {},
    quantity: 0
  },
  reducers: {
    setNFTImage: (state, action) => {
      state.nft_img = action.payload;
    },
    setItem: (state, action) => {
      state.item_data = action.payload;
    },
    setQuantity: (state, action) => {
      state.quantity = action.payload;
    }
  },
})

export const { 
  setNFTImage,
  setItem,
  setQuantity } = selectedReducer.actions;

export const selectedData = (state) => state.selectedData;

export default selectedReducer.reducer;
