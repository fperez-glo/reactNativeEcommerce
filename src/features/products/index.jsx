import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import config from "../../config/aplication.config"

const initialState = {
    data: [],
    // selectedCategory: null,
    loading: false,
    error: false,
}

export const fetchProducts = createAsyncThunk(
  "products/getData",
  async (asyncThunk) => {
    const res = await axios.get(`${config.extra.firebaseRealtimeDbUri}/products.json`);
    return res.data; 
  }
)

export const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
      setSelectedCategory: (state, action) => {
        const categorySelected = state.data.find(category => category.id === action.payload)
        state.selectedCategory = categorySelected.id;
      }
    },
    extraReducers: {
      [fetchProducts.pending]: (state) => {
        state.loading = true
      },
      [fetchProducts.fulfilled]: (state, {payload}) => {
        state.data = payload
        state.loading = false
      },
      [fetchProducts.rejected]: (state) => {
        state.error = true,
        state.loading = false
      }
    }
})

export const  { setSelectedCategory } = productsSlice.actions;
export default productsSlice.reducer;
