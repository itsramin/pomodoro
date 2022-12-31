import { createSlice } from "@reduxjs/toolkit";

const initialState = { pomodoro: 25, shortBreak: 5, longBreak: 15 };

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    change(state, action) {
      for (let item in action.payload) {
        state[item] = +action.payload[item];
      }
    },
  },
});

export const settingsActions = settingsSlice.actions;

export default settingsSlice.reducer;
