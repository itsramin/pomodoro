import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15,
  longBreakInterval: 3,
  autoStart: false,
  muteNotif: false,
  curTime: 0,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    change(state, action) {
      for (let item in action.payload) {
        state[item] = +action.payload[item];
      }
    },
    resetDefaults(state) {
      for (let item in initialState) {
        state[item] = +initialState[item];
      }
    },
    setCurTime(state, action) {
      state.curTime = action.payload;
    },
  },
});

export const settingsActions = settingsSlice.actions;

export default settingsSlice.reducer;
