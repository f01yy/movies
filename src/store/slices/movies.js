import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMoviesByQueryAndPage } from '../../api/MoviesService';

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async ({query, page}) => {
    const response = await getMoviesByQueryAndPage(query, page);
    return response;
  }
);

export const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    list: [],
    searchQuery: '',
    page: 1,
    genre: 'All',
    moviesCount: 0,
  },
  reducers: {
    searchMovie(state, action) {
      state.searchQuery = action.payload;
    },
    selectPage(state, action) {
      state.page = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchMovies.fulfilled, (state, action) => {
      state.list = action.payload.movies;
      state.moviesCount = action.payload.movie_count;
    });
  },
});

export default moviesSlice.reducer;

export const { searchMovie, selectPage } = moviesSlice.actions;
