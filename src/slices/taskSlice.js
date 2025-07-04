import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '@/services/axiosInstance';

export const fetchSingleTasks = createAsyncThunk('tasks/fetchSingleTasks', async (_,{rejectWithValue}) => {
  try{
    const response = await axiosInstance.get('/task/tasks');
    return response.data.tasks;
  }
  catch(error){
    return rejectWithValue(error.response?.data?.message || "Errro while fetching task")
  }
});

export const createSingleTask = createAsyncThunk('tasks/createSingleTask', async (taskData, {rejectWithValue}) => {
  try{
    const response = await axiosInstance.post('/task/tasks', taskData);
    return response.data;
  }
  catch(error){
    return rejectWithValue(error.response?.data?.message || "Errro while creating task")
  }
});

export const updateSingleTask = createAsyncThunk('tasks/updateSingleTask', async ({id, updatedTask},{rejectWithValue}) => {
  try{
  const response = await axiosInstance.put(`/task/tasks/${id}`, updatedTask);
  return response.data.task;
  }
  catch(error){
    return rejectWithValue(error.response?.data?.message || "Errro while updating task")
  }
});

export const deleteSingleTask = createAsyncThunk('tasks/deleteSingleTask', async (id,{rejectWithValue}) => {
  try{
    await axiosInstance.delete(`/task/tasks/${id}`);
    return id;
  }
  catch(error){
    return rejectWithValue(error.response?.data?.message || "Errro while deleting task")
  }
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
    },
    toggleTaskCompletionPending : (state, action)=>{
      const task = state.items.find(t => t._id === action.payload);
      if (task) {
        task.completed = false;
      }
    },
    toggleTaskCompletionDone : (state, action)=>{
      const task = state.items.find(t => t._id === action.payload);
      if (task) {
        task.completed = true;
      }
    },
    clearTaskError: (state) => {
      state.error = null;
    },
    setTaskLoading: (state, action) => {
      state.loading = action.payload;
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
      .addCase(fetchSingleTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createSingleTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(createSingleTask.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(createSingleTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateSingleTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateSingleTask.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(t => t._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateSingleTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteSingleTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSingleTask.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(t => t._id !== action.payload);
      })
      .addCase(deleteSingleTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  }
});

export const { toggleTaskCompletion, clearTaskError, setTaskLoading, toggleTaskCompletionPending, toggleTaskCompletionDone } = tasksSlice.actions;
export default tasksSlice.reducer;
