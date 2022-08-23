import axios from 'axios';

export const getMoviesByQueryAndPage = async (query, page) => {
  const response = await axios.get('https://yts.mx/api/v2/list_movies.json', {
    params: {
      query_term: query,
      page: page,
    },  
  });
  const moviesData = response.data.data;
  console.log(moviesData);
  return moviesData;
};
