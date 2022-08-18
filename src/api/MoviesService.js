import axios from 'axios';

export const getMovies = async () => {
  const response = await axios.get('https://yts.mx/api/v2/list_movies.json');
  const moviesData = response.data.data;
  console.log(moviesData)
  return moviesData;
}

export const getMoviesByQuery = async (query) => {
  const response = await axios.get('https://yts.mx/api/v2/list_movies.json', {
    params: {
      query_term: query,
    }
  })
  const moviesData = response.data.data;
  console.log(moviesData)
  return moviesData;
}
