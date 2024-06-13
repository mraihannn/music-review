import { configureStore } from "@reduxjs/toolkit";
import movie from "./movie";

export const store = configureStore({
  reducer: movie,
});
