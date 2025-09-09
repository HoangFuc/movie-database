import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./slices/movie"
export const store = configureStore({
  reducer: {
    movie: movieReducer,
  },
});

// Khai báo type để dùng với TS (nếu bạn code TS)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
