import { configureStore } from '@reduxjs/toolkit';
import userReducer from './auth/auth-slices';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
