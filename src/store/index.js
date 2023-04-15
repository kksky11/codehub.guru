import { configureStore } from "@reduxjs/toolkit";
import rootReducers from './rootReducers';
import storage from 'redux-persist/lib/storage';
import { decryptLocalStorage, encryptLocalStorage } from "coreApp/utility";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  createTransform
} from 'redux-persist';

const encryptDecrypt = createTransform(
  (inboundState, key) => {
    if (!inboundState) return inboundState;
    return encryptLocalStorage(inboundState);
  },
  (outboundState, key) => {
    if (!outboundState) return outboundState;
    return decryptLocalStorage(outboundState);
  },
  //{ whitelist: ["myAccountReducer", "supportReducer","offerReducer","userReducer","finvuReducer"] }
);


const persistConfig = {
  key: 'root',
  storage,
  transforms: [encryptDecrypt]
}
const persistedReducer = persistReducer(persistConfig, rootReducers)
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
})
export const persistor = persistStore(store)



