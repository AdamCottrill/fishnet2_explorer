import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "table",
  initialState: { value: "FN011" },
  reducers: {
    setTable: (state, { payload }) => {
      return { ...state, value: payload.value };
    },
  },
});

export const { setTable } = slice.actions;

export const getSelectedTable = (state) => state.table.value;

export default slice.reducer;
