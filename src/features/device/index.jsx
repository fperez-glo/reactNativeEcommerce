import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    deviceInfo: {}
}

export const deviceSlice = createSlice({
    name: "device",
    initialState,
    reducers: {
      setDeviceWindowsDimensions: (state, action) => {
        state.deviceInfo.screenDimensions = action.payload;
      },
    },
})

export const  { setDeviceWindowsDimensions } = deviceSlice.actions;
export default deviceSlice.reducer;
