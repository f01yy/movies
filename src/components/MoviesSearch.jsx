import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  searchMovie,
  selectPage,
  selectGenre,
  selectMinimumRating,
  selectOrder,
  selectSort,
} from '../store/slices/movies';

const MoviesSearch = ({ isOpened, setIsOpened }) => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  return (
    <>
      <div className='movies__search'>
        <form
          className='movies__form'
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(searchMovie(query));
            dispatch(selectPage(1));
            dispatch(selectGenre(''));
            dispatch(selectMinimumRating(0));
            dispatch(selectSort('date_added'));
            dispatch(selectOrder('desc'));
            setIsOpened(false);
          }}
        >
          <button
            type='button'
            className='movies__delete'
            onClick={(e) => {
              e.preventDefault();
              setQuery('');
            }}
          >
            <i className='fa-solid fa-eraser'></i>
          </button>
          <input
            className='movies__input'
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Search..'
          />
          <button className='movies__button' type='submit'>
            <i className='fa-solid fa-magnifying-glass'></i>
          </button>
        </form>
      </div>
      <div
        className={isOpened ? 'filter__icon active' : 'filter__icon'}
        onClick={(e) => {
          if (isOpened) {
            setIsOpened(false);
          } else {
            setIsOpened(true);
          }
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </>
  );
};

export default MoviesSearch;
