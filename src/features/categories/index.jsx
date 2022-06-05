import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CATEGORIES } from "../../database/CATEGORIES";
import { aplicationConfig } from "../../config/aplication.config";
import axios from "axios"

const initialState = {
    data: [],
    selectedCategory: null,
    loading: false,
    error: false,
}

export const fetchCategories = createAsyncThunk(
  "categories/getData",
  async (asyncThunk) => {
    const res = await axios.get(`${aplicationConfig.DB}/categories.json`);
    return res.data; 
  }
)

export const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
      setSelectedCategory: (state, action) => {
        const categorySelected = state.data.find(category => category.id === action.payload)
        state.selectedCategory = categorySelected.id;
      }
    },
    extraReducers: {
      [fetchCategories.pending]: (state) => {
        state.loading = true
      },
      [fetchCategories.fulfilled]: (state, {payload}) => {
        state.data = payload
        state.loading = false
      },
      [fetchCategories.rejected]: (state) => {
        state.error = true,
        state.loading = false
      }
    }
})

export const  { setSelectedCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
