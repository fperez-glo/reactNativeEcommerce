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
        let foundedInCart = false;
        state.cartProducts.length && state.cartProducts.forEach(product => {
          if(product.id === action.payload.id){
            foundedInCart = true;
            product.productQty += action.payload.productQty
          }
        })
        !foundedInCart && state.cartProducts.push(action.payload);
      },
      deleteCartProduct: (state, action) => {
        const filter = state.cartProducts.filter(products => products.id != action.payload);
        state.cartProducts = filter;
      },
      cleanCart:(state)=> {
        state.cartProducts = initialState.cartProducts;
      }
    },
})

export const  { addCartProduct, deleteCartProduct, cleanCart } = cartSlice.actions;
export default cartSlice.reducer;
