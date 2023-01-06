import { createSlice } from "@reduxjs/toolkit";
import { dateFormat } from "../helper/helper";

const initialState = {
  data: [],
  streak: 0,
  lastDate: new Date(
    new Date().setDate(new Date().getDate() - 3)
  ).toISOString(),
};

const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    // addNew(state, action) {
    //   state.data.push(action.payload);
    //   console.log(
    //     Math.ceil(
    //       (+new Date() - +new Date(state.lastDate)) / (1000 * 24 * 60 * 60)
    //     )
    //   );
    //   // if ()
    //   state.lastDate = new Date().toISOString();
    // },
    // addExist(state, action) {
    //   console.log(state.lastDate);
    //   console.log(
    //     Math.floor(
    //       (+new Date() - +new Date(state.lastDate)) / (1000 * 24 * 60 * 60)
    //     )
    //   );
    //   const target = state.data.find(
    //     (item) => item.date === action.payload.date
    //   );
    //   target.time++;
    // },
    add(state, action) {
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

        state.lastDate = new Date().toISOString();
      }
    },
    // add(state, action) {
    //   const targetIndex = state.data.findIndex(
    //     (item) => dateFormat(item.date) === dateFormat(action.payload.date)
    //   );

    //   if (targetIndex > -1) {
    //     state.data[targetIndex].time =
    //       state.data[targetIndex].time + action.payload.time;
    //     console.log("exist");
    //   } else {
    //     console.log("new");
    //     state.data.push(action.payload);
    //     state.lastDate = new Date().toISOString();
    //   }
    // },
    reset(state) {
      state.data = [];
      state.lastDate = new Date(
        new Date().setDate(new Date().getDate() - 2)
      ).toISOString();
    },
    resetToday(state) {
      state.lastDate = new Date(
        new Date().setDate(new Date().getDate() - 1)
      ).toISOString();
      state.data = state.data.filter(
        (item) => dateFormat(item.date) !== dateFormat(new Date())
      );
      state.streak = 0;
    },
  },
});

export const reportsActions = reportsSlice.actions;

export default reportsSlice.reducer;
