import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../api/MoviesService';
import { useFetching } from '../hooks/useFetching';
import Loader from '../UI/Loader/Loader';

const Movie = () => {
  const params = useParams();
  const id = params.id;
  const [movie, setMovie] = useState({});

  const [fetchMovie, isLoading, error] = useFetching(async () => {
    const movieDetails = await getMovieDetails(id);
    setMovie(movieDetails);
  });

  useEffect(() => {
    fetchMovie();
  }, []);

  return (
    <article>
      <div className='movie-page'>
        <div className='movie-page__container'>
          {isLoading ? (
            <Loader />
          ) : (
            <main>
              
            </main>
          )}
        </div>
      </div>
    </article>
  );
};

export default Movie;
