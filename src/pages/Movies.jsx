import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchMovies, fetchMoviesByQuery} from '../store/slices/movies'
import MoviesList from '../components/MoviesList'
import MoviesSearch from '../components/MoviesSearch'
import MoviesPagination from '../components/MoviesPagination'



const Movies = () => {
  const dispatch = useDispatch();
  const movies = useSelector(state => state.movies.list);
  const searchQuery = useSelector(state => state.movies.searchQuery)

  useEffect(() => {
    dispatch(fetchMovies());
  }, [])

  useEffect(() => {
    dispatch(fetchMoviesByQuery(searchQuery))
  }, [searchQuery])

  return (
    <section>
      <div className="movies">
        <MoviesSearch />
        <MoviesList movies={movies} />
        <MoviesPagination />
      </div>
    </section>
  )
}

export default Movies