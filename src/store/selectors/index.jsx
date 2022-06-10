import { createSelector } from '@reduxjs/toolkit';


const selectAuth = state => state.auth;

export const selectUserInfo = createSelector([selectAuth], auth => auth.user.email);