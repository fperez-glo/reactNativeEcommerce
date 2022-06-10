import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import config from "../../config/aplication.config"

const initialState = {
    user: {
        email: undefined
    },
    loading: false,
    error: false,
}

// export const fetchCategories = createAsyncThunk(
//   "categories/getData",
//   async (asyncThunk) => {
//     const res = await axios.get(`${config.extra.firebaseRealtimeDbUri}/categories.json`);
//     return res.data; 
//   }
// )

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      setUser: (state, action) => {
        console.log("payload:", action.payload)
        //const categorySelected = state.data.find(category => category.id === action.payload)
        state.user.email = action.payload;
      }
    },
    // extraReducers: {
    //   [fetchCategories.pending]: (state) => {
    //     state.loading = true
    //   },
    //   [fetchCategories.fulfilled]: (state, {payload}) => {
    //     state.data = payload
    //     state.loading = false
    //   },
    //   [fetchCategories.rejected]: (state) => {
    //     state.error = true,
    //     state.loading = false
    //   }
    // }
})

export const  { setUser } = authSlice.actions;
export default authSlice.reducer;
