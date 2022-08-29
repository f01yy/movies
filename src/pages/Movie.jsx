import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails } from '../api/MoviesService';
import { useFetching } from '../hooks/useFetching';
import Loader from '../UI/Loader/Loader';
import Modal from '../UI/Modal/Modal';

import { Navigation, Pagination } from 'swiper';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './swiper-styles.css';

const Movie = () => {
  const params = useParams();
  const id = params.id;
  const [movie, setMovie] = useState({});
  const [modal, setModal] = useState(false);
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
                <div className='movie-page__img-trailer'>
                  <div className='movie-page__img'>
                    <img src={movie.large_cover_image} alt={movie.slug} />
                  </div>
                  {movie.yt_trailer_code ? (
                    <div className='movie-page__iframe'>
                      <iframe
                        width='300'
                        height='170'
                        src={`https://www.youtube.com/embed/${movie.yt_trailer_code}`}
                        title='YouTube video player'
                        frameBorder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                      ></iframe>
                    </div>
                  ) : (
                    ''
                  )}
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
                  {movie.mpa_rating ? (
                    <div className='movie-page__mpa'>
                      MPA Rating:&nbsp;
                      <span className='mpa__span'>{movie.mpa_rating}</span>
                    </div>
                  ) : (
                    ''
                  )}
                  {movie.description_full ? (
                    <div className='movie-page__desc'>
                      Description:&nbsp;
                      <p className='desc__p'>{movie.description_full}</p>
                    </div>
                  ) : (
                    ''
                  )}
                  {movie.cast ? (
                    <div className='movie-page__cast'>
                      <div>Cast:&nbsp;</div>
                      {movie.cast.map((person, index) => (
                        <div key={person.imdb_code} className='cast__person'>
                          {person.url_small_image ? (
                            <img
                              src={person.url_small_image}
                              alt={person.name}
                            />
                          ) : (
                            ''
                          )}
                          <span>
                            <span className='cast__span'>{person.name}</span>
                            &nbsp;as&nbsp;
                            <span className='cast__span-character'>
                              {person.character_name}
                            </span>
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                <Modal visible={modal} setVisible={setModal}>
                  <Swiper
                    navigation
                    modules={[Navigation, Pagination]}
                    pagination={{ clickable: true }}
                  >
                    <SwiperSlide>
                      <img
                        src={movie.large_screenshot_image1}
                        alt={movie.slug}
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img
                        src={movie.large_screenshot_image2}
                        alt={movie.slug}
                      />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img
                        src={movie.large_screenshot_image3}
                        alt={movie.slug}
                      />
                    </SwiperSlide>
                  </Swiper>
                </Modal>
                <div className='movie-page__screenshots'>
                  <div className='screenshots__title'>Screenshots:</div>
                  <div className='screenshots__content'>
                    <div
                      onClick={() => setModal(true)}
                      className='movie-page__screenshot'
                    >
                      <img
                        src={movie.large_screenshot_image1}
                        alt={movie.slug}
                      />
                    </div>
                    <div
                      onClick={() => setModal(true)}
                      className='movie-page__screenshot'
                    >
                      <img
                        src={movie.large_screenshot_image2}
                        alt={movie.slug}
                      />
                    </div>
                    <div
                      onClick={() => setModal(true)}
                      className='movie-page__screenshot'
                    >
                      <img
                        src={movie.large_screenshot_image3}
                        alt={movie.slug}
                      />
                    </div>
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
