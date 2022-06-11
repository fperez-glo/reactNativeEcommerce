import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        email: undefined
    },
    loading: false,
    error: false,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      setUser: (state, action) => {
        state.user.email = action.payload;
      }
    },
})

export const  { setUser } = authSlice.actions;
export default authSlice.reducer;
