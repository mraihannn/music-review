import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieRecommedations";

export const store = configureStore({
  reducer: {
    movieRecommendations: movieReducer,
  },
});
