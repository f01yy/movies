import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPagesCount } from '../utils/pages';
import { selectPage } from '../store/slices/movies';

const MoviesPagination = () => {
  const dispatch = useDispatch();

  const moviesCount = useSelector((state) => state.movies.moviesCount);

  const currentPage = useSelector((state) => state.movies.page);
  const pagesCount = getPagesCount(moviesCount, 20);

  const pagesElems = useMemo(() => {
    const pagesArray = [];
    for (let i = 1; i <= pagesCount; i++) {
      pagesArray.push(i);
    }

    if (pagesCount <= 11) {
      return pagesArray.slice(1).map((page) => (
        <li
          key={page}
          className={
            currentPage === page ? 'pages__item active' : 'pages__item'
          }
          onClick={() => {
            dispatch(selectPage(page));
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth',
            });
          }}
        >
          {page}
        </li>
      ));
    }

    if (currentPage <= 6) {
      return pagesArray.slice(1, 10).map((page) => (
        <li
          key={page}
          className={
            currentPage === page ? 'pages__item active' : 'pages__item'
          }
          onClick={() => {
            dispatch(selectPage(page));
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth',
            });
          }}
        >
          {page}
        </li>
      ));
    } else {
      return pagesArray.slice(currentPage - 5, currentPage + 4).map((page) => (
        <li
          key={page}
          className={
            currentPage === page ? 'pages__item active' : 'pages__item'
          }
          onClick={() => {
            dispatch(selectPage(page));
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth',
            });
          }}
        >
          {page}
        </li>
      ));
    }
  }, [currentPage, dispatch, pagesCount]);

  if (moviesCount === 0) {
    return;
  }

  return (
    <nav className='pages'>
      <ul className='pages__list'>
        <li
          className={
            currentPage === 1
              ? 'pages__item pages__prev hidden'
              : 'pages__item pages__prev'
          }
          onClick={() => {
            dispatch(selectPage(currentPage - 1));
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth',
            });
          }}
        >
          Prev
        </li>
        <li
          key={1}
          className={currentPage === 1 ? 'pages__item active' : 'pages__item'}
          onClick={() => {
            dispatch(selectPage(1));
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth',
            });
          }}
        >
          {1}
        </li>
        {currentPage > 6 && pagesCount > 11 ? (
          <span className='three-dots'>&#8230;</span>
        ) : (
          ''
        )}
        {pagesElems}
        {currentPage + 5 < pagesCount && pagesCount > 11 ? (
          <>
            <span className='three-dots'>&#8230;</span>
            <li
              key={pagesCount}
              className={
                currentPage === pagesCount
                  ? 'pages__item active'
                  : 'pages__item'
              }
              onClick={() => {
                dispatch(selectPage(pagesCount));
                window.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: 'smooth',
                });
              }}
            >
              {pagesCount}
            </li>
          </>
        ) : (
          ''
        )}
        <li
          className={
            currentPage === pagesCount
              ? 'pages__item pages__next hidden'
              : 'pages__item pages__next'
          }
          onClick={() => {
            dispatch(selectPage(currentPage + 1));
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth',
            });
          }}
        >
          Next
        </li>
      </ul>
    </nav>
  );
};

export default MoviesPagination;
