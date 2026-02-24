import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTopNews = createAsyncThunk("news/fetchTopNews", async () => {
  const { data } = await axios.get(
    "https://hacker-news.firebaseio.com/v0/topstories.json",
  );
  return data.slice(0, 100);
});

export const fetchNewsById = createAsyncThunk(
  "news/fetchNewsById",
  async (id) => {
    const { data } = await axios.get(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
    );
    return data;
  },
);

const newsSlice = createSlice({
  name: "news",
  initialState: {
    ids: [],
    items: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTopNews.fulfilled, (state, action) => {
        state.loading = false;
        state.ids = action.payload;
      })
      .addCase(fetchTopNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchNewsById.fulfilled, (state, action) => {
        state.items[action.payload.id] = action.payload;
      });
  },
});

export default newsSlice.reducer;
