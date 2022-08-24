import React from 'react';

const MovieItem = ({ movie }) => {
  return (
    <li className='movie'>
      <div className='movie__img'>
        <img src={movie.medium_cover_image} alt={movie.title ? movie.title : 'movie'} />
      </div>
      <div className='movie__info'>
        <h3 className='movie__title'>{movie.title ? movie.title : ''}</h3>
        <div className='movie__genre'>
          {movie.year ? movie.year + ', ' : ''}{movie.genres ? `${movie.genres[0]}` : ''}
        </div>
        {movie.rating ? (
          <div className='movie__rating'>{movie.rating}</div>
        ) : (
          ''
        )}
      </div>
    </li>
  );
};

export default MovieItem;
