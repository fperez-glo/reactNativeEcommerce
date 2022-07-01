import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    globalAplicationAssets: {
        productsAssets: [],
        categoriesAssets: [],
    },
    loading: false,
    error: false,
}

export const assetsSlice = createSlice({
    name: "assets",
    initialState,
    reducers: {
      setGlobalAplicationProductsAssets: (state, action) => {
        let concatArray = [];
        concatArray = concatArray.concat(action.payload);
        state.globalAplicationAssets.productsAssets = concatArray;
      }
    },
})

export const  { setGlobalAplicationProductsAssets } = assetsSlice.actions;
export default assetsSlice.reducer;
