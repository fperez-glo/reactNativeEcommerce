import { combineReducers } from "@reduxjs/toolkit";

// Reducers
import categoriesReducer from "./categories"

const appReducer = combineReducers({
    categoriesReducer
});

const rootReducer = (state, action) => {
    // when a logout action is dispatched it will reset redux state
    // https://medium.com/@asher.cassetto.cohen/resetting-redux-state-with-a-root-reducer-bonus-how-to-reset-state-selectively-e2a008d0de61
    //if (action.type === 'auth/REMOVE') {
    //  state = undefined;
    //}
    return appReducer(state, action);
}

export default rootReducer;