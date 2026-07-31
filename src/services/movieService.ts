import axios, { type AxiosResponse } from "axios";
import type { Movie } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN as string;

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
});

export interface FetchMoviesParams {
  query: string;
  page?: number;
}

interface TMDBSearchResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const fetchMovies = async (
  params: FetchMoviesParams,
): Promise<Movie[]> => {
  const response: AxiosResponse<TMDBSearchResponse> =
    await tmdbApi.get<TMDBSearchResponse>("/search/movie", {
      params: {
        query: params.query,
        page: params.page ?? 1,
        include_adult: false,
      },
    });

  return response.data.results;
};
