import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { insertAdress } from "../../../database/adresses/insertAdress";
import { selectAdresses } from "../../../database/adresses/selectAdresses";
import { deleteAdress } from "../../../database/adresses/deleteAdress";

const initialState = {
  locations: [],
  loading: false,
  error: false,
};

export const addDBLocation = createAsyncThunk(
  "location/addDB",
  async (location, asyncThunk) => {
    try {
      await insertAdress(
        location.id,
        location.street.trim(),
        location.cp.trim(),
        location.country.trim()
      );
      return true;
    } catch (error) {
      console.log("Insert Error:", error);
      return asyncThunk.rejectWithValue(`Error en DB insert: ${error}`);
    }
  }
);

export const selectDBLocations = createAsyncThunk(
  "location/selectDB",
  async (asyncThunk) => {
    try {
      const results = await selectAdresses();
      return results.rows?._array;
    } catch (error) {
      console.log("Select Error:", error);
      return asyncThunk.rejectWithValue(`Error en DB Select: ${error}`);
    }
  }
);

export const deleteDBLocation = createAsyncThunk(
  "location/deleteDB",
  async (locationId ,asyncThunk) => {
    try {
      console.log("locationId:", locationId)
      await deleteAdress(locationId);
      return true;
    } catch (error) {
      console.log("Delete Error:", error);
      return asyncThunk.rejectWithValue(`Error en DB Delete: ${error}`);
    }
  }
);

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    addLocation: (state, action) => {
      state.locations.push(action.payload);
    },
  },
  extraReducers: {
    [addDBLocation.pending]: (state) => {
      state.loading = true;
    },
    [addDBLocation.fulfilled]: (state, { payload }) => {
      state.loading = false;
    },
    [addDBLocation.rejected]: (state) => {
      state.error = true;
      state.loading = false;
    },
    [selectDBLocations.pending]: (state) => {
      state.loading = true;
    },
    [selectDBLocations.fulfilled]: (state, { payload }) => {
      state.loading = false;
    },
    [selectDBLocations.rejected]: (state) => {
      state.error = true;
      state.loading = false;
    },
    [deleteDBLocation.pending]: (state) => {
      state.loading = true;
    },
    [deleteDBLocation.fulfilled]: (state, { payload }) => {
      state.loading = false;
    },
    [deleteDBLocation.rejected]: (state) => {
      state.error = true;
      state.loading = false;
    },
  },
});

export const { addLocation } = locationSlice.actions;
export default locationSlice.reducer;
