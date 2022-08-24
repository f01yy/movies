import React from 'react';
import MovieItem from './MovieItem';

const MoviesList = ({ movies }) => {
  if (!movies) {
    return <div className='nothing-found-error'>Nothing found</div>;
  }

  return (
    <ul className='movies__list'>
      {movies.map((movie) => (
        <MovieItem key={movie.id} movie={movie} />
      ))}
    </ul>
  );
};

export default MoviesList;
