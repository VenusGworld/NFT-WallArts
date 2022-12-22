import { createSlice } from '@reduxjs/toolkit'

export const selectedReducer = createSlice({
  name: 'selectedData',
  initialState: {
    nft_img: "",
    nft_name: "",

    nft_description: "",
    nft_contractAddress: "",
    nft_tokenId: "",
    nft_symbol: "",
    nft_totalSupply: "",

    item_data: {},
    quantity: 0
  },
  reducers: {
    setNFTData: (state, action) => {
      state.nft_img = action.payload.image;
      state.nft_name = action.payload.title;
      state.nft_description = action.payload.description;
      state.nft_contractAddress = action.payload.contract;
      state.nft_tokenId = action.payload.id;
      state.nft_symbol = action.payload.symbol;
      state.nft_totalSupply = action.payload.total;
    },
    setItem: (state, action) => {
      state.item_data = action.payload;
    },
    setQuantity: (state, action) => {
      state.quantity = action.payload;
    },
    initialize(state) {
      state.nft_img = "";
      state.nft_name = "";
      state.nft_description = "";
      state.nft_contractAddress = "";
      state.nft_tokenId = "";
      state.nft_symbol = "";
      state.nft_totalSupply = "";
      state.item_data = {};
      state.quantity = 0;
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
