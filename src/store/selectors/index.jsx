import { createSelector } from '@reduxjs/toolkit';


const selectAuth = state => state.auth;
const selectCart = state => state.cart;

// AUTH
export const selectUserInfo = createSelector([selectAuth], auth => auth.user.email);

// CART
export const selectCartProducts = createSelector([selectCart], cart => cart.cartProducts);