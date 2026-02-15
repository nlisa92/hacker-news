import { configureStore } from "@reduxjs/toolkit";
import commentsReducer from "./slices/commentsSlice";
import newsReducer from "./slices/newsSlice";

export const store = configureStore({
    reducer: {
        news: newsReducer,
        comments: commentsReducer,
    }
})