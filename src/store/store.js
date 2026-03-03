import { configureStore } from "@reduxjs/toolkit";
import commentsReducer from "./slices/commentsSlice";
import newsReducer from "./slices/newsSlice";

export const loadNews = () => {
  try {
    const data = localStorage.getItem("news");
    return data ? JSON.parse(data) : undefined;
  } catch {
    return undefined;
  }
};

export const loadComments = () => {
  try {
    const data = localStorage.getItem("comments");
    return data ? JSON.parse(data) : undefined;
  } catch {
    return undefined;
  }
};

const saveStateMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  const { news, comments } = store.getState();

  const limitedComments = Object.fromEntries(
    Object.entries(comments)
      .slice(-500)
      .map(([id, c]) => [id, { id: c.id, text: c.text, kids: c.kids }]),
  );
  localStorage.setItem("news", JSON.stringify(news));
  localStorage.setItem("comments", JSON.stringify(limitedComments));
  return result;
};

export const store = configureStore({
  reducer: {
    news: newsReducer,
    comments: commentsReducer,
  },
  preloadedState: {
    news: loadNews(),
    comments: loadComments(),
  },
  middleware: (getDefault) => getDefault().concat(saveStateMiddleware),
});
