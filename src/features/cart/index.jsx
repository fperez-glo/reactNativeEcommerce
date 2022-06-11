import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartProducts: [],
    loading: false,
    error: false,
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
      addCartProduct: (state, action) => {
        state.cartProducts.push(action.payload);
      },
      deleteCartProduct: (state, action) => {
        const filter = state.cartProducts.filter(products => products.id != action.payload);
        state.cartProducts = filter;
      }
    },
})

export const  { addCartProduct, deleteCartProduct } = cartSlice.actions;
export default cartSlice.reducer;
