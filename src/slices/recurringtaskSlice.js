import axiosInstance from "@/services/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRecurringTask = createAsyncThunk('recurringTask/fetchRecurringTask', async () => {
    const response = await axiosInstance.get('/recurringTask/recurring-tasks');
    return response.data.recurringTasks;
})

export const updateRecurringTask = createAsyncThunk('recurringTask/updateRecurringTask', async (task) => {
    await axiosInstance.put(`/recurringTask/recurring-task/${task._id}`,task);
    return task;
})

export const deleteRecurringTask = createAsyncThunk('tasks/deleteRecurringTask', async (id) => {
  await axiosInstance.delete(`/recurringTask/recurring-task/${id}`);
  return id;
});

const recurringtaskSlice = createSlice({
    name : "recurringtasks",
    initialState : {
        items: [],
        loading: false,
        error: null
    },
    reducers : {
        toggleRecurringTaskCompletion : (state, action)=>{
            const task = state.items.find(t => t._id === action.payload);
            if (task) {
                task.completed = !task.completed;
            }
        }
    },

    extraReducers : (builder) =>{
    builder
        .addCase(fetchRecurringTask.pending, (state)=>{
            state.loading = true;
        })
        .addCase(fetchRecurringTask.fulfilled, (state, action)=>{
            state.loading = false,
            state.items = action.payload;
        })
        .addCase(updateRecurringTask.pending, (state)=>{
            state.loading = true;
        })
        .addCase(updateRecurringTask.fulfilled, (state, action) => {
            const index = state.items.findIndex(t => t._id === action.payload._id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        })
        .addCase(deleteRecurringTask.pending, (state)=>{
            state.loading = true;
        })
        .addCase(deleteRecurringTask.fulfilled, (state, action) => {
            state.items = state.items.filter(t => t._id !== action.payload);
        });
    }
})

export const { toggleRecurringTaskCompletion } = recurringtaskSlice.actions;
export default recurringtaskSlice.reducer;