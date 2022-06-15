import { createSelector } from '@reduxjs/toolkit';


const selectAuth = state => state.auth;
const selectCart = state => state.cart;
const selectLocations = state => state.location;

// AUTH
export const selectUserInfo = createSelector([selectAuth], auth => auth.user.email);

// CART
export const selectCartProducts = createSelector([selectCart], cart => cart.cartProducts);

// LOCATIONS
export const selectAllLocations = createSelector([selectLocations], location => location.locations);