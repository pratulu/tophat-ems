import { createSlice } from "@reduxjs/toolkit";

const initialState: any = [];

const candidateSlice = createSlice({
  name: "candidates",
  initialState,
  reducers: {
    addCandidate: (state, action) => {
      state = state.push(...action.payload);
    },
  },
});

export const { addCandidate } = candidateSlice.actions;
export default candidateSlice.reducer;
