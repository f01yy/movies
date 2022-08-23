import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPagesCount } from '../utils/pages';
import { selectPage } from '../store/slices/movies';

const MoviesPagination = () => {
  const dispatch = useDispatch();

  const moviesCount = useSelector((state) => state.movies.moviesCount);
  const currentPage = useSelector((state) => state.movies.page);
  const pagesCount = getPagesCount(moviesCount, 20);
  const pagesArray = [];
  for (let i = 1; i <= pagesCount; i++) {
    pagesArray.push(i);
  }
  const pagesElems = pagesArray.map((page) => (
    <li
      key={page}
      className={currentPage === page ? 'pages__item active' : 'pages__item'}
      onClick={() => {
        dispatch(selectPage(page));
      }}
    >
      {page}
    </li>
  ));

  return (
    <nav className='pages'>
      <ul className='pages__list'>
      <li className={currentPage === 1 ? 'pages__item pages__prev hidden' : 'pages__item pages__prev'}>Prev</li>
        {pagesCount <= 8
          ? pagesElems
          : pagesElems.slice(0, 6).concat([
              <li className='pages__item' key='...'>
                ...
              </li>,
              pagesElems.slice(-1),
            ])}
        <li className={currentPage === pagesCount ? 'pages__item pages__next hidden' : 'pages__item pages__next'}>Next</li>
      </ul>
    </nav>
  );
};

export default MoviesPagination;
