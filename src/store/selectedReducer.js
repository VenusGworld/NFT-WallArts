import { createSlice } from '@reduxjs/toolkit'

export const selectedReducer = createSlice({
  name: 'selectedData',
  initialState: {
    nft_img: "",
    nft_name: "",
    item_data: {},
    quantity: 0
  },
  reducers: {
    setNFTData: (state, action) => {
      state.nft_img = action.payload.image;
      state.nft_name = action.payload.title;
    },
    setItem: (state, action) => {
      state.item_data = action.payload;
    },
    setQuantity: (state, action) => {
      state.quantity = action.payload;
    },
    clearResults() {
    }
  },
})

export const { 
  setNFTData,
  setItem,
  setQuantity,
  initialize,
  clearResults } = selectedReducer.actions;

export const selectedData = (state) => state.selectedData;

export default selectedReducer.reducer;
