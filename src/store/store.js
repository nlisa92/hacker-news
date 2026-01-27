import { configureStore } from "@reduxjs/toolkit";
import commentsReducer from "./slice/commentsSlice";
import newsReducer from "./slice/newsSlice";

export const store = configureStore({
    reducer: {
        news: newsReducer,
        comments: commentsReducer,
    }
})