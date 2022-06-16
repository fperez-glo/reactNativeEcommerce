import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    locations: [],
    loading: false,
    error: false,
}

export const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
      addLocation: (state, action) => {
        state.locations.push(action.payload);
      }
    },
})

export const  { addLocation } = locationSlice.actions;
export default locationSlice.reducer;
