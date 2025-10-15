import apiClient from './client';

export const getMovieDetails = async (id: string) => {
  if (!id) return null;
  const response = await apiClient.get(`movie/${id}`, {
    params: { api_key: process.env.EXPO_PUBLIC_API_KEY },
  });
  return response.data || null;
};

export const getUpcomingMovies = async () => {
  const response = await apiClient.get('movie/upcoming', {
    params: { api_key: process.env.EXPO_PUBLIC_API_KEY },
  });
  return response.data?.results || [];
};

export const getMovieVideos = async (id: string) => {
  if (!id) return null;
  const response = await apiClient.get(`movie/${id}/videos`, {
    params: { api_key: process.env.EXPO_PUBLIC_API_KEY },
  });
  return response.data || [];
};

export const searchMovies = async (query: string) => {
  if (!query) return null;
  const response = await apiClient.get(`/search/movie?query=${query}`, {
    params: { api_key: process.env.EXPO_PUBLIC_API_KEY },
  });
  return response.data?.results || null;
};