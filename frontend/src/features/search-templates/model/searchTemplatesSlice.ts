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
    setSearchByInputTemplates: (state: SearchTemplateState, { payload: search }: { payload: string }) => ({
      ...state,
      search: search,
    }),
  },
});

export const { setSearchByInputTemplates } = searchTemplatesSlice.actions;
export default searchTemplatesSlice.reducer;
