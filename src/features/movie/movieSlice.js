import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  popularMovies: [],
  searchResults: [],
  topRatedMovies: [],
  upcomingMovies: [],
  movieDetails: {},
  movieCast: [],
};

export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    setSearchResults: (state, action) => {
        state.searchResults = action.payload;
      },
    setTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    setUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    setMovieDetails: (state, action) => {
      state.movieDetails = action.payload;
    },
    setMovieCast: (state, action) => {
      state.movieCast = action.payload;
    },
  },
});

export const { setPopularMovies, setTopRatedMovies, setUpcomingMovies, setMovieDetails, setMovieCast, setSearchResults  } = movieSlice.actions;

export default movieSlice.reducer;
