import { createSlice } from "@reduxjs/toolkit";
import { dateFormat } from "../helper/helper";

const initialState = {
  data: [],
  streak: 0,
  lastDate: new Date(
    new Date().setDate(new Date().getDate() - 3)
  ).toLocaleString(),
};

const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    add(state, action) {
      console.log("add in report slice");
      if (action.payload.time > 0) {
        state.data.push(action.payload);
        const dayDiff = Math.floor(
          (+new Date() - +new Date(state.lastDate)) / (1000 * 24 * 60 * 60)
        );

        if (dayDiff === 1) {
          state.streak++;
        } else if (dayDiff > 1) {
          state.streak = 0;
        }

        state.lastDate = new Date().toLocaleString();
      }
    },

    reset(state) {
      state.data = [];
      state.lastDate = new Date(
        new Date().setDate(new Date().getDate() - 2)
      ).toLocaleString();
    },
    resetToday(state) {
      state.lastDate = new Date(
        new Date().setDate(new Date().getDate() - 1)
      ).toLocaleString();
      state.data = state.data.filter(
        (item) => dateFormat(item.date) !== dateFormat(new Date())
      );
      state.streak = 0;
    },
  },
});

export const reportsActions = reportsSlice.actions;

export default reportsSlice.reducer;
