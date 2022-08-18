import React from 'react'
import {useSelector} from 'react-redux'
import {getPagesCount} from '../utils/pages'


const MoviesPagination = () => {
  const moviesCount = useSelector(state => state.movies.moviesCount);
  console.log(moviesCount);
  const pagesCount = getPagesCount(moviesCount, 20);
  const pagesArray = [];
  for(let i = 1; i <= pagesCount; i++) {
    pagesArray.push(i);
  }
  const pagesElems = pagesArray.map(page => <li key={page} className='pages__item'>{page}</li>)

  console.log(pagesCount);

  return (
    <nav className='pages'>
      <ul className='pages__list'>
        <li className='pages__item pages__prev'>Prev</li>
        {pagesCount <= 8
          ?
          pagesElems
          :
          pagesElems.slice(0, 6).concat([<li className='pages__item'>...</li>, pagesElems.slice(-1)])
        }
        <li className='pages__item pages__next'>Next</li>
      </ul>
    </nav>
  )
}

export default MoviesPagination