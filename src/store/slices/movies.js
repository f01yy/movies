import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMoviesByQueryAndPage } from '../../api/MoviesService';

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async ({query, page, genre, rating}) => {
    const response = await getMoviesByQueryAndPage(query, page, genre, rating);
    return response;
  }
);

export const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    list: [],
    searchQuery: '',
    page: 1,
    genre: '',
    moviesCount: 0,
    minimumRating: 0,
  },
  reducers: {
    searchMovie(state, action) {
      state.searchQuery = action.payload;
    },
    selectPage(state, action) {
      state.page = action.payload;
    },
    selectGenre(state, action) {
      state.genre = action.payload;
    },
    selectMinimumRating(state, action) {
      state.minimumRating = action.payload;
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

export const { searchMovie, selectPage, selectGenre, selectMinimumRating } = moviesSlice.actions;
