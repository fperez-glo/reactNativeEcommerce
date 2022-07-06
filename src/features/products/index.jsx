import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import config from "../../config/aplication.config"

const initialState = {
    data: [],
    selectedProduct: null,
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
      setSelectedProduct: (state, action) => {
        const productSelected = state.data.find(product => product.id === action.payload);
        state.selectedProduct = productSelected;
      },
      selectedProductAddPropertie: (state, action) => {
        state.selectedProduct[action.payload?.propertieName] = action.payload?.data;
      }
    },
    extraReducers: {
      [fetchProducts.pending]: (state) => {
        state.loading = true
      },
      [fetchProducts.fulfilled]: (state, {payload}) => {
        // Lleno la propertie data del state.
        state.data = payload
        state.loading = false
      },
      [fetchProducts.rejected]: (state) => {
        state.error = true,
        state.loading = false
      }
    }
})

export const  { setSelectedProduct, selectedProductAddPropertie } = productsSlice.actions;
export default productsSlice.reducer;
