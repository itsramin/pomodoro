import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "./settingSlice";
import uiReducer from "./uiSlice";

const store = configureStore({
  reducer: { settings: settingsReducer, ui: uiReducer },
});

export default store;
