import { configureStore } from "@reduxjs/toolkit"
import categoriesReducer from "../features/categories"

export default configureStore({
    reducer: {
        categories: categoriesReducer
    },
});