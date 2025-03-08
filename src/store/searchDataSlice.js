import { createSlice } from "@reduxjs/toolkit";
const dataSlice = createSlice({
  name: "search",
  intialState: {
    data: [],
  },
  reducers: {
    addData: (state, action) => {
      state.items.push(action.payload);
    },
    removeData: (state) => {
      state.items = [];
    },
  },
});

export const { addData } = dataSlice.actions;
export default dataSlice.reducer;
