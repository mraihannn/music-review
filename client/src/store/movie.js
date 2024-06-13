import { createSlice } from "@reduxjs/toolkit";
import musicAPI from "../api/musicAPI";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    data: [],
    loading: false,
    error: "",
  },
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
      state.error = "";
    },

    fetchSucces: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },

    fetchError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export default movieSlice.reducer;

export const { fetchStart, fetchSucces, fetchError } = movieSlice.actions;

export function getRecommendations() {
  return async (dispatch, getState) => {
    dispatch(fetchStart());
    try {
      const { data } = await musicAPI.get("/api/music/recommendations", {
        headers: {
          author: `Bearer ${localStorage.access_token}`,
        },
      });

      dispatch(fetchSucces(data.data.tracks.items));
    } catch (error) {
      dispatch(fetchError(error?.message));
    }
  };
}

export function getDetail(spotifyId) {
  return async (dispatch, getState) => {
    dispatch(fetchStart());
    try {
      const { data } = await musicAPI.get(`/api/music/${spotifyId}`, {
        headers: {
          author: `Bearer ${localStorage.access_token}`,
        },
      });

      dispatch(fetchSucces(data));
    } catch (error) {
      dispatch(fetchError(error?.message));
    }
  };
}
