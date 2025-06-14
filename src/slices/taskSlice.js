import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/services/axiosInstance';

export const fetchSingleTasks = createAsyncThunk('tasks/fetchSingleTasks', async () => {
  const response = await axiosInstance.get('/task/tasks');
  return response.data.tasks;
});

export const updateSingleTask = createAsyncThunk('tasks/updateSingleTask', async (task) => {
  await axiosInstance.put(`/task/tasks/${task._id}`, task);
  return task;
});

export const deleteSingleTask = createAsyncThunk('tasks/deleteSingleTask', async (id) => {
  await axiosInstance.delete(`/task/tasks/${id}`);
  return id;
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {
    toggleTaskCompletion: (state, action) => {
      const task = state.items.find(t => t._id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(updateSingleTask.fulfilled, (state, action) => {
        const index = state.items.findIndex(t => t._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteSingleTask.fulfilled, (state, action) => {
        state.items = state.items.filter(t => t._id !== action.payload);
      });
  }
});

export const { toggleTaskCompletion } = tasksSlice.actions;
export default tasksSlice.reducer;