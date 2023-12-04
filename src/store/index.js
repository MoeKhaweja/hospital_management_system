import { configureStore } from "@reduxjs/toolkit";
import roomsSlice from "./rooms_slice";

const store = configureStore({
  reducer: { rooms: roomsSlice.reducer },
});

export default store;
