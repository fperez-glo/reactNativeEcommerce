import {
    SET_CATEGORY_SELECTED,
    SET_INITIAL_DATA,
  } from '../actions-types/categories';
import { CATEGORIES } from "../../database/CATEGORIES"


const initialState = {
 category: undefined,
 categories: CATEGORIES
};

const categories = (state = initialState, action) => {
switch (action.type) {

case SET_CATEGORY_SELECTED: 
  return {
      ...state,
      category: action.payload.category,
    };


 case SET_INITIAL_DATA:
     return {
         ...state,
     }

default: 
   return state;
 
}
};

export default categories;
