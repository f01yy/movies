import axios from 'axios';

export const getMovies = async (query, page, genre, rating, sort, order, limit) => {
  const response = await axios.get('https://yts.mx/api/v2/list_movies.json', {
    params: {
      query_term: query,
      page,
      limit,
      genre,
      minimum_rating: rating,
      sort_by: sort,
      order_by: order,
    },  
  });
  const moviesData = response.data.data;
  return moviesData;
};
