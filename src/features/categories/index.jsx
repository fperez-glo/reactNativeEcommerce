import { createSlice } from "@reduxjs/toolkit";

const categories = [
    {
      id: 1,
      description: "Microprocesadores",
    },
    {
      id: 2,
      description: "Tarjetas de Video",
    },
    {
      id: 3,
      description: "Fuentes",
    },
    {
      id: 4,
      description: "Almacenamiento",
    },
  ];

const initialState = {
    value: {
        categories,
        selectedCategory: null,
    }
}

export const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {

    }
})

export default categoriesSlice.reducer;