import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  settingsVisible: false,
  currentTab: 0,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSettings(state) {
      state.settingsVisible = !state.settingsVisible;
    },
    changeTab(state, action) {
      state.currentTab = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;