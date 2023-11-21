import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import favouriteMoviesReducer from './slices/favouritesSlice';
import { imdbApi } from './imdbApi';

export const store = configureStore({
  reducer: {
    favourites: favouriteMoviesReducer,
    [imdbApi.reducerPath]: imdbApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(imdbApi.middleware),
})

setupListeners(store.dispatch);

export type TRootState = ReturnType<typeof store.getState>