import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails } from '../api/MoviesService';
import { useFetching } from '../hooks/useFetching';
import Loader from '../UI/Loader/Loader';

const Movie = () => {
  const params = useParams();
  const id = params.id;
  const [movie, setMovie] = useState({});
  const navigate = useNavigate();

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
          <span
            className='movie-page__back'
            onClick={() => navigate('/search')}
          >
            <i className='fa-solid fa-angle-left'></i>
          </span>
          {isLoading ? (
            <Loader />
          ) : (
            <main className='movie-page__main'>
              <h1 className='movie-page__title'>{movie.title}</h1>
              <div className='movie-page__content'>
                <div className='movie-page__img'>
                  <img src={movie.large_cover_image} alt={movie.slug} />
                </div>
                <div className='movie-page__info'>
                  {movie.rating ? (
                    <div className='movie-page__rating'>
                      IMDb Rating: <i className='fa-solid fa-star'></i>
                      <span className='rating__span'>{movie.rating}</span>/10
                    </div>
                  ) : (
                    ''
                  )}
                  {movie.year ? (
                    <div className='movie-page__year'>
                      Year: <span className='year__span'>{movie.year}</span>
                    </div>
                  ) : (
                    ''
                  )}
                  {movie.runtime ? (
                    <div className='movie-page__runtime'>
                      Runtime:{' '}
                      <span className='runtime__span'>{movie.runtime}</span> min
                    </div>
                  ) : (
                    ''
                  )}
                  {movie.genres ? (
                    <div className='movie-page__genres'>
                      Genres:&nbsp;
                      {movie.genres.map((genre, index) => (
                        <span className='genres__span' key={genre}>
                          {index === movie.genres.length - 1
                            ? genre
                            : `${genre}, `}
                        </span>
                      ))}
                    </div>
                  ) : (
                    ''
                  )}
                  {movie.mpa_rating
                    ?
                    <div className="movie-page__mpa">
                      MPA Rating:&nbsp;
                      <span className='mpa__span'>{movie.mpa_rating}</span>
                    </div>
                    :
                    ''
                  }
                  <div className="movie-page__desc">
                    Description:&nbsp;
                    <p className='desc__p'>{movie.description_full}</p>
                  </div>
                </div>
              </div>
            </main>
          )}
        </div>
      </div>
    </article>
  );
};

export default Movie;
