import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import authReducer from '../features/auth/authSlice';
import searchReducer from '../features/ui/SearchSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    search: searchReducer
  },
});
