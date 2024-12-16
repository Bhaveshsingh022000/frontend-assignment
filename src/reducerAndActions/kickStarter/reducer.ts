import { createSlice } from "@reduxjs/toolkit";
import { fetchProjectDetails } from "./actions";

export type Project = {
  "s.no": number;
  "amt.pledged": number;
  blurb: string;
  by: string;
  country: string;
  currency: string;
  "end.time": string;
  location: string;
  "percentage.funded": number;
  "num.backers": number;
  state: string;
  title: string;
  type: string;
  url: string;
};

export type ProjectState = {
  isFetching: boolean;
  error: unknown;
  data: Project[];
};

const initialState: ProjectState = {
  data: [],
  error: null,
  isFetching: false,
};

const kickStarterProjectsSlice = createSlice({
  name: "kickStarterProjectSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProjectDetails.pending, (state) => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(fetchProjectDetails.fulfilled, (state, action) => {
      state.isFetching = false;
      state.error = null;
      state.data = action.payload;
    });
    builder.addCase(fetchProjectDetails.rejected, (state, action) => {
      state.isFetching = false;
      state.error = action.error;
    });
  },
});

export default kickStarterProjectsSlice;
