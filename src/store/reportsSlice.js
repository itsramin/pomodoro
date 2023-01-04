import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  lastDate: new Date(new Date().setDate(new Date().getDate() - 1))
    .toISOString()
    .slice(0, 10),
};

const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    addNew(state, action) {
      state.data.push(action.payload);
      // console.log(action.payload);
      state.lastDate = new Date().toISOString().slice(0, 10);
    },
    addExist(state, action) {
      const target = state.data.find(
        (item) => item.date === action.payload.date
      );
      target.time++;
    },
    reset(state, action) {
      state.data = [];
      state.lastDate = new Date(new Date().setDate(new Date().getDate() - 1))
        .toISOString()
        .slice(0, 10);
    },
  },
});

export const reportsActions = reportsSlice.actions;

export default reportsSlice.reducer;
