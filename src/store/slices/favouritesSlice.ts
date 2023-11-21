import { createSlice } from '@reduxjs/toolkit';
import { TMovie } from '../../components/MovieCard';

let favoritesData = localStorage.getItem('favorites');
let favorites: Array<TMovie> = [];
if (favoritesData) {
  try {
    favorites = JSON.parse(favoritesData);
  } catch (e) {
    console.warn(`Не удалось извлечь данные из локального хранилища: ${favoritesData}`);
  }
}

const initialState: Array<TMovie> = favorites;

export const favouritesSlice = createSlice({
  name: 'favorites', initialState, reducers: { 
    addMovie: (state, action) => {
      state.push(action.payload);
      localStorage.setItem('favorites', JSON.stringify(state));
    }, 
    removeMovie: (state, action) => {
      const newState = state.filter((movie) => movie.id !== action.payload);
      localStorage.setItem('favorites', JSON.stringify(newState));
      return newState;
    }
  }
})

export const { addMovie, removeMovie } = favouritesSlice.actions;
export default favouritesSlice.reducer;
