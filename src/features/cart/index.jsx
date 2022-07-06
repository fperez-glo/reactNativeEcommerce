import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config/aplication.config"

const initialState = {
  cartProducts: [],
  loading: false,
  orderResponse: undefined,
  error: false,
};

export const confirmPurchase = createAsyncThunk(
  "cart/confirmPurchase",
  async (purchaseOrderData, asyncThunk) => {
    const res = await axios.post(
      `${config.extra.firebaseRealtimeDbUri}orders.json`,
        JSON.stringify({
          date: new Date(),
          purchaseOrderData
        })
    );
    return res.data;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartProduct: (state, action) => {
      let foundedInCart = false;
      state.cartProducts.length &&
        state.cartProducts.forEach((product) => {
          if (product.id === action.payload.id) {
            foundedInCart = true;
            product.productQty += action.payload.productQty;
          }
        });
      !foundedInCart && state.cartProducts.push(action.payload);
    },
    deleteCartProduct: (state, action) => {
      const filter = state.cartProducts.filter(
        (products) => products.id != action.payload
      );
      state.cartProducts = filter;
    },
    cleanCart: (state) => {
      state.cartProducts = initialState.cartProducts;
    },
  },
  extraReducers: {
    [confirmPurchase.pending]: (state) => {
      state.loading = true;
    },
    [confirmPurchase.fulfilled]: (state, { payload }) => {
      // Lleno la propertie orderResponse del payload(return) que devuelve la asyncThunk.
      state.orderResponse = payload.name;
      state.loading = false;
    },
    [confirmPurchase.rejected]: (state) => {
      console.log("entra por error:", state)
      state.error = true;
      state.loading = false;
    },
  },
});

export const { addCartProduct, deleteCartProduct, cleanCart } =
  cartSlice.actions;
export default cartSlice.reducer;
