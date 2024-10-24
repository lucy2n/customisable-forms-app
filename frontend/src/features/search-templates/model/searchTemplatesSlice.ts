import { createSlice } from "@reduxjs/toolkit";

export type SearchTemplateState = {
  search: string;
};

const initialState: SearchTemplateState = {
  search: "",
};

export const searchTemplatesSlice = createSlice({
  name: "searchByInputTemp",
  initialState,
  reducers: {
    setSearchByInputTemplates: (state, { payload }: { payload: string }) => {
      state.search = payload;
    },
  },
});

export const { setSearchByInputTemplates } = searchTemplatesSlice.actions;
export default searchTemplatesSlice.reducer;