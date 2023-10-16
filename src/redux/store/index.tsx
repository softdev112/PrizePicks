import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import { useDispatch } from 'react-redux';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

import pokemonSlice from '../slices/pokemon-slice';

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const rootReducer = {
  pokemon: pokemonSlice
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware();
    middleware.push(logger);
    return middleware;
  }
});

export default store;
