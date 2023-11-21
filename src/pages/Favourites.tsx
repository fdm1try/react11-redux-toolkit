import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { TRootState } from '../store';
import { MovieCard } from '../components/MovieCard';

export const Favourites = () => {
  const useAppSelector : TypedUseSelectorHook<TRootState> = useSelector;
  const favourites = useAppSelector((state) => state.favourites);

  return (
    <div className='movies favourites'>
      {!favourites.length && 'Список пока пуст...' }
      {favourites.map((movie) => (
        <MovieCard view='compact' movie={movie}/>
      ))}
    </div>
  )
}
