import { createSlice } from "@reduxjs/toolkit";
import musicAPI from "../api/musicAPI";
import Swal from "sweetalert2";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    data: [],
    loading: false,
    error: "",
    detail: {},
    search: [],
    offset: 0,
    hasMore: true,
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

    fetchDetail: (state, action) => {
      state.detail = action.payload;
      if (state.detail.reviews) {
        state.detail.reviews.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      }
    },

    fetchSearch: (state, action) => {
      state.search = action.payload;
    },

    updateSearch: (state, action) => {
      state.search = [...state.search, ...action.payload];
    },

    updateOffset: (state) => {
      state.offset += 10;
    },

    updateHasMore: (state) => {
      state.hasMore = false;
    },

    updateDetail: (state, action) => {
      state.detail = {
        ...state.detail,
        reviews: [...state.detail.reviews, action.payload],
      };
      state.detail.reviews.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    },
  },
});

export default movieSlice.reducer;

export const {
  fetchStart,
  fetchSucces,
  fetchError,
  fetchDetail,
  updateDetail,
  fetchSearch,
  updateOffset,
  updateSearch,
  updateHasMore,
} = movieSlice.actions;

export function getRecommendations() {
  return async (dispatch) => {
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
  return async (dispatch) => {
    dispatch(fetchStart());
    try {
      const { data } = await musicAPI.get(`/api/music/${spotifyId}`, {
        headers: {
          author: `Bearer ${localStorage.access_token}`,
        },
      });

      dispatch(fetchDetail(data));
    } catch (error) {
      dispatch(fetchError(error?.message));
    }
  };
}

export function addReview(spotifyId, rating, comment) {
  return async (dispatch) => {
    dispatch(fetchStart());
    try {
      const { data } = await musicAPI.post(
        `/api/reviews/${spotifyId}`,
        {
          spotifyId,
          rating,
          comment,
        },
        {
          headers: {
            author: `Bearer ${localStorage.access_token}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Review added!",
      });

      dispatch(updateDetail(data));
    } catch (error) {
      if (error.response) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response.data.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Somethings Gone Wrong!",
        });
      }
      dispatch(fetchError(error?.message));
    }
  };
}

export function searchMusic(value) {
  return async (dispatch) => {
    dispatch(fetchStart());
    try {
      const { data } = await musicAPI.get("/api/music/search", {
        params: {
          q: value,
          limit: 10,
          offset: 0,
        },
        headers: {
          author: `Bearer ${localStorage.access_token}`,
        },
      });
      if (data.tracks.items.length > 0) {
        dispatch(fetchSearch(data.tracks.items));
      }
      dispatch(updateOffset());
    } catch (error) {
      dispatch(fetchError(error?.message));
    }
  };
}

export function getMoreSearch(input) {
  return async (dispatch, getState) => {
    const { data } = await musicAPI.get("/api/music/search", {
      params: {
        q: input,
        limit: 10,
        offset: getState().movieRecommendations.offset,
      },
      headers: {
        author: `Bearer ${localStorage.access_token}`,
      },
    });
    if (data.tracks.items.length > 0) {
      dispatch(updateSearch(data.tracks.items));

      dispatch(updateOffset());
    } else {
      dispatch(updateHasMore());
    }
  };
}
