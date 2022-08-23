import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../store/slices/movies';
import MoviesList from '../components/MoviesList';
import MoviesSearch from '../components/MoviesSearch';
import MoviesPagination from '../components/MoviesPagination';

const Movies = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.list);
  const searchQuery = useSelector((state) => state.movies.searchQuery);
  const currentPage = useSelector((state) => state.movies.page);

  useEffect(() => {
    console.log('WORKED');
    dispatch(fetchMovies({ query: searchQuery, page: currentPage }));
  }, [searchQuery, currentPage, dispatch]);

  return (
    <section>
      <div className='movies'>
        <MoviesSearch />
        <MoviesList movies={movies} />
        <MoviesPagination />
      </div>
    </section>
  );
};

export default Movies;
