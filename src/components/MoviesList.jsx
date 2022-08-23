import React from 'react';
import MovieItem from './MovieItem';

const MoviesList = ({ movies }) => {
  return (
    <ul className='movies__list'>
      {movies.map((movie) => (
        <MovieItem key={movie.id} movie={movie} />
      ))}
    </ul>
  );
};

export default MoviesList;
