import { configureStore } from '@reduxjs/toolkit';
import memoReducer from './reducers/memoSlice';

export const store = configureStore({
  reducer: {
    memo: memoReducer
  }
});