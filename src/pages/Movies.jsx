import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, setLimit } from '../store/slices/movies';
import MoviesList from '../components/MoviesList';
import MoviesSearch from '../components/MoviesSearch';
import MoviesPagination from '../components/MoviesPagination';
import MoviesFilter from '../components/MoviesFilter';
import Loader from '../UI/Loader/Loader';

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
  const currentLimit = useSelector((state) => state.movies.limit);
  const loading = useSelector((state) => state.movies.loading);

  useEffect(() => {
    const freeWidth = window.innerWidth - 250 - 30; // 230px = filter width, 30 = 15 + 15 = paddings
    let moviesOnRowCount = Math.floor(freeWidth / 230);
    const estimatedWidth = moviesOnRowCount * 230 + (moviesOnRowCount - 1) * 20; // 20 = gap
    if (estimatedWidth > freeWidth) {
      moviesOnRowCount -= 1;
    }
    dispatch(setLimit(4 * moviesOnRowCount));
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchMovies({
        query: searchQuery,
        page: currentPage,
        genre: currentGenre,
        rating: currentMinimumRating,
        sort: currentSort,
        order: currentOrder,
        limit: currentLimit,
      })
    );
  }, [
    searchQuery,
    currentPage,
    currentGenre,
    currentMinimumRating,
    currentSort,
    currentOrder,
    currentLimit,
    dispatch,
  ]);

  return (
    <section>
      <div className='movies'>
        <MoviesSearch />
        {loading
          ?
          <Loader />
          :
          <>
            <div className='movies__main'>
              <MoviesFilter />
              <MoviesList movies={movies} />
            </div>
            <MoviesPagination />
          </>
        }
      </div>
    </section>
  );
};

export default Movies;
