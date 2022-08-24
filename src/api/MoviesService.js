import axios from 'axios';

export const getMoviesByQueryAndPage = async (query, page, genre) => {
  const response = await axios.get('https://yts.mx/api/v2/list_movies.json', {
    params: {
      query_term: query,
      page: page,
      limit: 20,
      genre: genre
    },  
  });
  const moviesData = response.data.data;
  return moviesData;
};
