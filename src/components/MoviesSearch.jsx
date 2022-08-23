import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchMovie, selectPage } from '../store/slices/movies';

const MoviesSearch = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  return (
    <div className='movies__search'>
      <form
        className='movies__form'
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(searchMovie(query));
          dispatch(selectPage(1));
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
  );
};

export default MoviesSearch;
