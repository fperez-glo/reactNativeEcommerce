import { combineReducers, configureStore } from "@reduxjs/toolkit"
import categoriesReducer from "../features/categories"
import authReducer from "../features/auth"
import cartReducer from "../features/cart"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist"

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
  };

  const reducers = combineReducers({
    auth: authReducer,
    categories: categoriesReducer,
    cart: cartReducer
  });
  
  const persistedReducer = persistReducer(persistConfig, reducers);
  const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  });
  const persistor = persistStore(store);

  export { store, persistor };