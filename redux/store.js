import { configureStore } from '@reduxjs/toolkit';
import movieListReducer from './slices/movieListSlice.jsx'


const store = configureStore({
  reducer: {
    movieList: movieListReducer,

  },
});

export default store;