import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectGenre, selectPage } from '../store/slices/movies';

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

  return (
    <aside>
      <div className='movies__filter'>
        Genre:
        <select 
          className='movies__select'
          value={currentGenre}
          onChange={(e) => {
            dispatch(selectPage(1));
            dispatch(selectGenre(e.target.value));
          }}
        >
          <option disabled>
            Choose a genre
          </option>
          <option value="">All</option>
          {genres.map((genre) => (
            <option value={genre} key={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
};

export default MoviesFilter;
