import { FC } from 'react'
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import type { TRootState } from '../../store';
import { addMovie, removeMovie } from '../../store/slices/favouritesSlice';
import { View } from './View';
import { CompactView } from './CompactView';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';


export type TMovieDetails = {
  director: string;
  actors: string;  
  genre: string;
  runtime: string;
  rating: string;
}

export type TMovie = {
  title: string;
  year: number;
  id: string;
  poster: string;
  details?: TMovieDetails;
}

export interface IMovieCard {
  movie: TMovie;
  view: 'compact' | 'full';
}

export const MovieCard: FC<IMovieCard> = (props) => {
  const dispatch = useDispatch();
  const useAppSelector : TypedUseSelectorHook<TRootState> = useSelector;
  const favourites = useAppSelector((state) => state.favourites);
  const { movie } = props;
  const isFavourite = !!favourites.find((item) => item.id === movie.id);

  function handleFavoriteButtonClick() {
    if (isFavourite) { 
      dispatch(removeMovie(movie.id));
    } else {
      dispatch(addMovie({...movie, details: undefined}));
    }
  }

  const favoriteButton = (
    <Button onClick={handleFavoriteButtonClick} className='movie__favourite-button' variant={`${ isFavourite ? 'light' : 'warning'}`} size='sm'>
      { isFavourite ? 'Убрать из избранного' : 'Добавить в избранное' }
    </Button>
  )

  switch (props.view) {
    case 'compact':
      return (
        <CompactView movie={movie} >
          <NavLink className='movie__link btn btn-primary' to={`/movie/${movie.id}`}>Подробнее...</NavLink>
          {favoriteButton}
        </CompactView>
      );
    case 'full':
      return (
        <View movie={movie}>
          {favoriteButton}
        </View>
      );
    default:
      return <></>
  }
}
