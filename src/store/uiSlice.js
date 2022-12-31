import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  settingsVisible: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSettings(state) {
      state.settingsVisible = !state.settingsVisible;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
