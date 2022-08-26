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
        {isLoading ? (
          <Loader />
        ) : (
          <main>
            <h1 className='movie-page__title'>
              {movie.title ? movie.title_long : ''}
            </h1>
            <div className='movie-page__content'>
              <div className='movie-page__img'>
                <img
                  src={movie.medium_cover_image}
                  alt={movie.slug ? movie.slug : ''}
                />
              </div>
              <div className='movie-page__text'>
                <div className='movie-page__extra'>
                  {movie.mpa_rating ? (
                    <span className='movie-page__mpa'>{movie.mpa_rating}</span>
                  ) : (
                    ''
                  )}
                  {movie.rating ? (
                    <span className='movie-page__rating'>
                      {`IMDb: ${movie.rating}`}
                    </span>
                  ) : (
                    ''
                  )}
                  {movie.runtime ? (
                    <span className='movie-page__runtime'>
                      {`${movie.runtime} min`}
                    </span>
                  ) : (
                    ''
                  )}
                </div>
                <div className='movie-page__genres'>
                  {movie.genres
                    ? movie.genres.map((genre) => (
                        <span key={genre}>{genre}</span>
                      ))
                    : ''}
                </div>
                <p className='movie-page__desc'>{movie.description_full}</p>
              </div>
            </div>
          </main>
        )}
      </div>
    </article>
  );
};

export default Movie;
