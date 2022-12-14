import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMovies } from '../../api/MoviesService';

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async ({ query, page, genre, rating, sort, order, limit }) => {
    const response = await getMovies(query, page, genre, rating, sort, order, limit);
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
    sort: 'date_added',
    order: 'desc',
    limit: 20,
    loading: false,
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
    },
    selectSort(state, action) {
      state.sort = action.payload;
    },
    selectOrder(state, action) {
      state.order = action.payload;
    },
    setLimit(state, action) {
      state.limit = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchMovies.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload.movies;
      state.moviesCount = action.payload.movie_count;
    })
    .addCase(fetchMovies.pending, (state) => {
      state.loading = true;
    });
  },
});

export default moviesSlice.reducer;

export const {
  searchMovie,
  selectPage,
  selectGenre,
  selectMinimumRating,
  selectSort,
  selectOrder,
  setLimit,
} = moviesSlice.actions;
