import { combineReducers, configureStore } from "@reduxjs/toolkit"
import categoriesReducer from "../features/categories"
import productsReducer from "../features/products"
import authReducer from "../features/auth"
import cartReducer from "../features/cart"
import deviceReducer from "../features/device"
import locationReducer from "../features/configuration/locations"
import assetsReducer from "../features/assets"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist"

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
  };

  const reducers = combineReducers({
    auth: authReducer,
    categories: categoriesReducer,
    cart: cartReducer,
    location: locationReducer,
    device: deviceReducer,
    products: productsReducer,
    assets: assetsReducer,
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
  