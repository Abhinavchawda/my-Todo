import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLoggedInUserTodos, updateUser, fetchLoggedInUser } from './userAPI';

const initialState = {
  // userTodos: [],
  userInfo: null,
  status: 'idle',
};

export const fetchLoggedInUserTodosAsync = createAsyncThunk(
  'user/fetchLoggedInUserTodos',
  async (userId) => {
    const response = await fetchLoggedInUserTodos(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (update) => {
    const response = await updateUser(update);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchLoggedInUserAsync = createAsyncThunk(
  'user/fetchLoggedInUser',
  async (userId) => {
    const response = await fetchLoggedInUser(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserTodosAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserTodosAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo.todos = action.payload;
        console.log("UserSlice payload : ", state.userInfo.todos)
      })

      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      })

      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      });
  },
});

export const selectUserTodos = (state) => state.user.userInfo.todos;
export const selectUserInfo = (state) => state.user.userInfo;

export default userSlice.reducer;