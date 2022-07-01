import { createSelector } from '@reduxjs/toolkit';


const selectAuth = state => state.auth;
const selectCart = state => state.cart;
const selectLocations = state => state.location;
const selectDeviceInfo = state => state.device;
const selectCategories = state => state.categories;
const selectAssets = state => state.assets;
const selectProducts = state => state.products;

// AUTH
export const selectUserInfo = createSelector([selectAuth], auth => auth.user.email);

// CATEGORIES
export const selectSelectedCategory = createSelector([selectCategories], category => category.selectedCategory);

// PRODUCTS
export const selectSelectedProduct = createSelector([selectProducts], product => product.selectedProduct);

// CART
export const selectCartProducts = createSelector([selectCart], cart => cart.cartProducts);

// LOCATIONS
export const selectAllLocations = createSelector([selectLocations], location => location.locations);

// DEVICE INFO
export const selectDeviceWidth = createSelector([selectDeviceInfo], device => device.deviceInfo.screenDimensions.windowWidth);
export const selectDeviceHeight = createSelector([selectDeviceInfo], device => device.deviceInfo.screenDimensions.windowHeight);

// ASSETS
export const selectProductAssets = createSelector([selectAssets], assets => assets.globalAplicationAssets.productsAssets);