import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPagesCount } from '../utils/pages';
import { selectPage } from '../store/slices/movies';

const MoviesPagination = () => {
  const dispatch = useDispatch();

  const moviesCount = useSelector((state) => state.movies.moviesCount);

  const currentPage = useSelector((state) => state.movies.page);
  const pagesCount = getPagesCount(moviesCount, 24);

  const pagesElems = useMemo(() => {
    const pagesArray = [];
    for (let i = 1; i <= pagesCount; i++) {
      pagesArray.push(i);
    }

    return pagesArray.map((page) => (
      <li
        key={page}
        className={page === currentPage ? 'pages__item active' : 'pages__item'}
        onClick={() => {
          dispatch(selectPage(page));
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }}
      >
        {page}
      </li>
    ));
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
              behavior: 'smooth',
            });
          }}
        >
          Prev
        </li>

        {pagesElems[0]}
        {currentPage >= 7 && <span className='three-dots'>&#8230;</span>}
        {pagesCount <= 11
          ? pagesElems.slice(1, -1)
          : currentPage >= 6 && pagesCount - currentPage > 5
          ? pagesElems.slice(currentPage - 5, currentPage + 4)
          : pagesCount - currentPage <= 5
          ? pagesElems.slice(-10, -1)
          : pagesElems.slice(1, 10)}
        {pagesCount - currentPage > 5 && (
          <span className='three-dots'>&#8230;</span>
        )}
        {pagesCount !== 1 && pagesElems[pagesElems.length - 1]}

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
