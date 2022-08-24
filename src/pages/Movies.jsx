import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../store/slices/movies';
import MoviesList from '../components/MoviesList';
import MoviesSearch from '../components/MoviesSearch';
import MoviesPagination from '../components/MoviesPagination';
import MoviesFilter from '../components/MoviesFilter';

const Movies = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.list);
  const searchQuery = useSelector((state) => state.movies.searchQuery);
  const currentPage = useSelector((state) => state.movies.page);
  const currentGenre = useSelector((state) => state.movies.genre);
  const currentMinimumRating = useSelector(
    (state) => state.movies.minimumRating
  );
  const currentSort = useSelector((state) => state.movies.sort);
  const currentOrder = useSelector((state) => state.movies.order);

  useEffect(() => {
    dispatch(
      fetchMovies({
        query: searchQuery,
        page: currentPage,
        genre: currentGenre,
        rating: currentMinimumRating,
        sort: currentSort,
        order: currentOrder,
      })
    );
  }, [
    searchQuery,
    currentPage,
    currentGenre,
    currentMinimumRating,
    currentSort,
    currentOrder,
    dispatch,
  ]);

  return (
    <section>
      <div className='movies'>
        <MoviesSearch />
        <div className='movies__main'>
          <MoviesFilter />
          <MoviesList movies={movies} />
        </div>
        <MoviesPagination />
      </div>
    </section>
  );
};

export default Movies;
