import { useParams } from 'react-router-dom';
import { useFetchMovieQuery } from '../store/imdbApi';
import { Loader } from '../components/Loader';
import { MovieCard } from '../components/MovieCard';

export const Movie = () => {
  const { id } = useParams();  
  const { data, isLoading } = useFetchMovieQuery(id as string);

  const movie = data && {
    id: data.imdbID,
    title: data.Title,
    year: Number(data.Year),
    poster: data.Poster,
    details: {
      director: data.Director,
      actors: data.Actors,
      genre: data.Genre,
      runtime: data.Runtime,
      rating: data.imdbRating
    }
  };

  if (isLoading) return <Loader />;
  if (!movie) return <></>;
  return (
    <MovieCard view='full' movie={movie} />
  )
}
