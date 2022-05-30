import { createSlice } from "@reduxjs/toolkit";
import { CATEGORIES } from "../../database/CATEGORIES";

const initialState = {
    data: CATEGORIES,
    selectedCategory: null,
}

export const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
      setSelectedCategory: (state, action) => {
        const categorySelected = state.data.find(category => category.id === action.payload)
        state.selectedCategory = categorySelected;
      }
    }
})

export const  { setSelectedCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
