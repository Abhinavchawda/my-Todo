import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchTodosByuser, saveTodo, editTodo, deleteTodo } from './todoAPI';

const initialState = {
  todos: [],
  value: 0,
  status: 'idle',
};

export const fetchTodosByuserAsync = createAsyncThunk(
  'todo/fetchTodosByuser',
  async (id) => {
    const response = await fetchTodosByuser(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const saveTodoAsync = createAsyncThunk(
  'todo/saveTodo',
  async (newTodo) => {
    const response = await saveTodo(newTodo);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const editTodoAsync = createAsyncThunk(
  'todo/editTodo',
  async ({Todo, id}) => {
    console.log("splice : ", Todo)
    const response = await editTodo({Todo, id});
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const deleteTodoAsync = createAsyncThunk(
  'todo/deleteTodo',
  async (id) => {
    // console.log("splice : ", Todo)
    const response = await deleteTodo(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchTodosByuserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodosByuserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.todos = action.payload;
      })

      .addCase(saveTodoAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveTodoAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.todos.push(action.payload);
      })

      .addCase(editTodoAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editTodoAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.todos.findIndex(todo=>todo.id===action.payload.id)
        state.todos.splice(index, 1, action.payload);
      })

      .addCase(deleteTodoAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.todos.findIndex(todo=>todo.id===action.payload.id)
        state.todos.splice(index, 1);
      });
  },
});

// export const { increment, decrement, incrementByAmount } = todoSlice.actions;

// export const selectCount = (state) => state.todo.value;

// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export const selectTodos = (state) => state.todo.todos;

export default todoSlice.reducer;
