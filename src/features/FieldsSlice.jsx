import { createSlice } from "@reduxjs/toolkit";

import { tableFieldsApi } from "../services/tableFields";

export const slice = createSlice({
  name: "fields",
  initialState: {},
  reducers: {
    //
    //addField: (state, payload) => ({ ...state, [payload.field]: true }),
    toggleFieldState: (state, payload) => {
      const new_value = !state[payload.field];
      return { ...state, [payload.field]: new_value };
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        tableFieldsApi.endpoints.getTableFields.matchPending,
        (state, action) => {
          console.log("Pending...", action);
          state = {};
          return state;
        }
      )
      .addMatcher(
        tableFieldsApi.endpoints.getTableFields.matchFulfilled,
        (state, action) => {
          console.log("Pending...", action);
          action.payload.result.fields.forEach((fld) => {
            state = {
              ...state,
              [fld]: true,
            };
          });

          return state;
        }
      )
      .addMatcher(
        tableFieldsApi.endpoints.getTableFields.matchRejected,
        (state, action) => console.log("Rejected...", action)
      );
  },
});

export const { toggleFieldState } = slice.actions;

export const getFields = (state) => state.fields;

export default slice.reducer;
