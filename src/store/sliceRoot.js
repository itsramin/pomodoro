import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "./settingSlice";
import uiReducer from "./uiSlice";
import reportsReducer from "./reportsSlice";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

const reducers = combineReducers({
  settings: settingsReducer,
  ui: uiReducer,
  reports: reportsReducer,
});
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["ui"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export default store;
