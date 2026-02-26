import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCommentById } from "../../api/hackerNewsApi";

export const fetchCommentById = createAsyncThunk(
  "comments/fetchCommentById",
  async (id) => {
    return await getCommentById(id);
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
