import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  settingsVisible: false,
  reportVisible: false,
  currentTab: 0,
  curTime: 0,
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
    setCurTime(state, action) {
      state.curTime = action.payload;
    },
    toggleReport(state) {
      state.reportVisible = !state.reportVisible;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
