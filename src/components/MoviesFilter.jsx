import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectGenre,
  selectPage,
  selectMinimumRating,
  selectSort,
  selectOrder
} from '../store/slices/movies';

const MoviesFilter = () => {
  const genres = [
    'Action',
    'Adventure',
    'Animation',
    'Biography',
    'Comedy',
    'Crime',
    'Documentary',
    'Drama',
    'Family',
    'Fantasy',
    'Film-Noir',
    'Game-Show',
    'History',
    'Horror',
    'Music',
    'Musical',
    'Mystery',
    'News',
    'Reality-TV',
    'Romance',
    'Sci-Fi',
    'Sport',
    'Talk-Show',
    'Thriller',
    'War',
    'Western',
  ];

  const dispatch = useDispatch();
  const currentGenre = useSelector((state) => state.movies.genre);
  const currentMinimumRating = useSelector(
    (state) => state.movies.minimumRating
  );
  const currentSort = useSelector((state) => state.movies.sort);
  const currentOrder = useSelector((state) => state.movies.order);

  const [genre, setGenre] = useState(currentGenre);
  const [rating, setRating] = useState(currentMinimumRating);
  const [sort, setSort] = useState(currentSort);
  const [order, setOrder] = useState(currentOrder);

  useEffect(() => {
    setGenre(currentGenre);
    setRating(currentMinimumRating);
    setSort(currentSort);
    setOrder(currentOrder);
  }, [currentGenre, currentMinimumRating, currentSort, currentOrder, dispatch]);

  return (
    <aside className='movies__aside'>
      <form className='movies__filter'>
        <label>
          Genre:
          <select
            className='movies__select'
            value={genre}
            onChange={(e) => {
              setGenre(e.target.value);
            }}
          >
            <option disabled>Choose a genre</option>
            <option value=''>All</option>
            {genres.map((genre) => (
              <option value={genre} key={genre}>
                {genre}
              </option>
            ))}
          </select>
        </label>

        <label>
          Sort By:
          <select
            className='movies__select'
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
            }}
          >
            <option value='date_added'>By date added</option>
            <option value='year'>By year</option>
            <option value='rating'>By rating</option>
          </select>
        </label>

        <label>
          Order by:
          <select
            className='movies__select'
            value={order}
            onChange={(e) => {
              setOrder(e.target.value);
            }}
          >
            <option value='desc'>Descending</option>
            <option value='asc'>Ascending</option>
          </select>
        </label>

        <label>
          Minimum rating on IMDb:
          <input
            value={rating}
            className='movies__range'
            type='range'
            min={0}
            max={9}
            step={1}
            onChange={(e) => {
              setRating(Number(e.target.value));
            }}
          />
          {rating}
        </label>

        <button
          className='filter__button'
          type='submit'
          onClick={(e) => {
            e.preventDefault();
            dispatch(selectPage(1));
            dispatch(selectGenre(genre));
            dispatch(selectMinimumRating(rating));
            dispatch(selectSort(sort));
            dispatch(selectOrder(order));
          }}
        >
          Filter
        </button>
      </form>
    </aside>
  );
};

export default MoviesFilter;
