import { createApi, fetchBaseQuery, skipToken } from '@reduxjs/toolkit/query/react';

const OMDB_API_KEY = process.env.OMDB_API_KEY || '64405bd2';

export interface IOMDBMovie {
  Title: string;
  Year: string;
  imdbID: string;
  Poster: string;
}

export interface IOMDBMovieDetails extends IOMDBMovie {
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Ratings: Array<{ Source: string, Value: string }>;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  BoxOffice: string;
  Production: string;
  Website: string;
}

export type IOMDBSearchResult = {
  Search?: Array<IOMDBMovie>;
  totalResults?: number;
  Error?: string;
  Response: string;
}

export type TOMDBSearchParams = {
  title: string;
  page: number;
}

export const imdbApi = createApi({
  reducerPath: 'imdb',
  baseQuery: fetchBaseQuery({
    baseUrl: `http://www.omdbapi.com/`,
  }),
  endpoints: (build) => ({
    search: build.query<IOMDBSearchResult, TOMDBSearchParams>({
      query: (params) => ({ url: `?apikey=${OMDB_API_KEY}&type=movie&s=${params.title}&page=${params.page}` }),
      // transformResponse: (response: { Search: Array<OMDBMovie> }, meta, arg) => response.Search,
    }),
    fetchMovie: build.query<IOMDBMovieDetails, string>({
      query: (imdbId) => ({ url: `?apikey=${OMDB_API_KEY}&i=${imdbId}` }),
    })
  })
})

export const { useSearchQuery, useFetchMovieQuery } = imdbApi;
export default imdbApi.reducer;