import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCommentById = createAsyncThunk(
  "comments/fetchCommentById",
  async (id) => {
    const { data } = await axios.get(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
    );
    return data;
  },
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    items: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCommentById.fulfilled, (state, action) => {
        state.loading = false;
        state.items[action.payload.id] = action.payload;
      })
      .addCase(fetchCommentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default commentsSlice.reducer;
