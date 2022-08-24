import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectGenre,
  selectPage,
  selectMinimumRating,
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

  const [genre, setGenre] = useState(currentGenre);
  const [rating, setRating] = useState(currentMinimumRating);

  useEffect(() => {
    setGenre(currentGenre);
    setRating(currentMinimumRating);
  }, [currentGenre, currentMinimumRating, dispatch]);

  return (
    <aside>
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
          Minimum rating on IMDb:
          <input
            value={rating}
            classname='movies__range'
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
          }}
        >
          Filter
        </button>
      </form>
    </aside>
  );
};

export default MoviesFilter;
