import { createSlice } from "@reduxjs/toolkit";

const roomsSlice = createSlice({
  name: "rooms",
  initialState: {
    reload: 0,
  },
  reducers: {
    reloadRooms(state) {
      state.reload = state.reload + 1;
    },
  },
});

export const roomActions = roomsSlice.actions;

export default roomsSlice;
