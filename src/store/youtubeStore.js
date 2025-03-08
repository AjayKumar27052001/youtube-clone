import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./searchDataSlice";

const appStore = configureStore({
  reducer: {
    data: dataReducer,
  },
});
export default appStore;
