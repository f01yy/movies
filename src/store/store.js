import {configureStore} from '@reduxjs/toolkit'
import moviesReducer from './slices/movies'

export default configureStore({
  reducer: {
    movies: moviesReducer,
  }
})