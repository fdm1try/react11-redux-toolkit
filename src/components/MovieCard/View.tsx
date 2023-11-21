import React from 'react'
import { TMovie } from './MovieCard';
import defaultPosterImage from '../../assets/poster_not_found.png';

export interface IProps {
  movie: TMovie;
  children?: React.ReactNode;
}

export const View: React.FC<IProps> = (props) => {

  const { movie } = props;

  return (
    <div className='movie movie-full'>
      <img className='movie__poster' alt={movie.title} src={movie.poster === 'N/A' ? defaultPosterImage : movie.poster} />
      <div className='movie__content'>
        <h3 className='movie__details_title'>{movie.title}</h3>
        { movie.details && (
          <ul className='movie__details'>
            <li key='year'>Год: {movie.year}</li>
            <li key='genre'>Жанр: {movie.details.genre}</li>
            <li key='director'>Режиссёр: {movie.details.director}</li>
            <li key='actors'>Актёры: {movie.details.actors}</li>
            <li key='runtime'>Продолжительность: {movie.details.runtime}</li>
          </ul>
        )}
        <div className='movie__footer'>
          { props.children }
        </div>
      </div>
      { movie.details?.rating && <span className='movie__rating'>{movie.details.rating}</span> }
    </div>
  );
}
