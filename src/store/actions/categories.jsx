import { SET_CATEGORY_SELECTED, SET_INITIAL_DATA } from '../actions-types/categories';

export const setSelectedCategory = (category) => ({
  type: SET_CATEGORY_SELECTED,
  payload: {
    category
  },
});

export const setInitialCategoryData = () => ({
  type: SET_INITIAL_DATA,
});
