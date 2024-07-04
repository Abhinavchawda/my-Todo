import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userReducer from '../features/user/userSlice'
import authReducer from '../features/auth/authSlice'
import todoReducer from '../features/todo/todoSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    auth: authReducer,
    todo: todoReducer,
  },
});
