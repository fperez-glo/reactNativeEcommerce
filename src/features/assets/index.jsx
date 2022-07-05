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
        if (state.globalAplicationAssets.productsAssets?.length !== action.payload?.length){
          state.globalAplicationAssets.productsAssets = [];
          let concatArray = [];
          concatArray = concatArray.concat(action.payload);
          concatArray.forEach(productAsset => {
            state.globalAplicationAssets.productsAssets.push({assetName: productAsset?.name, uri: productAsset?.uri})
          })
        }
      }
    },
})

export const  { setGlobalAplicationProductsAssets } = assetsSlice.actions;
export default assetsSlice.reducer;
