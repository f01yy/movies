import {createSlice} from '@reduxjs/toolkit'
import {createAsyncThunk} from '@reduxjs/toolkit'
import {getMovies, getMoviesByQuery} from '../../api/MoviesService'

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async () => {
    const response = await getMovies();
    return response;
  }
)

export const fetchMoviesByQuery = createAsyncThunk(
  'movies/fetchMoviesByQuery',
  async (query) => {
    const response = await getMoviesByQuery(query);
    return response;
  }
)

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
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.list = action.payload.movies;
        state.moviesCount = action.payload.movie_count;
      })
      .addCase(fetchMoviesByQuery.fulfilled, (state, action) => {
        state.list = action.payload.movies;
        state.moviesCount = action.payload.movie_count;
      })
  }
})

export default moviesSlice.reducer;

export const {searchMovie} = moviesSlice.actions;