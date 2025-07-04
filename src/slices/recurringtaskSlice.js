import axiosInstance from "@/services/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRecurringTask = createAsyncThunk('recurringTask/fetchRecurringTask', async (_,{rejectWithValue}) => {
    try{
        const response = await axiosInstance.get('/recurringTask/recurring-tasks');
        return response.data.recurringTasks;
    }
    catch(error){
        return rejectWithValue(error.response?.data?.message || "Error while fetching recurring task")
    }
})

export const createRecurringTask = createAsyncThunk('recurringTask/createRecurringTask', async (data, {rejectWithValue}) => {
    try{
        await axiosInstance.post("/recurringTask/recurring-task", data);
        return data;
    }
    catch(error){
        return rejectWithValue(error.response?.data?.message || "Error while creating recurring task")
    }

})

export const updateRecurringTask = createAsyncThunk('recurringTask/updateRecurringTask', async ({id, updatedTask},{rejectWithValue}) => {
    try{    
        const response = await axiosInstance.put(`/recurringTask/recurring-task/${id}`,updatedTask);
        return response.data.updatedTask;
    }
    catch(error){
        return rejectWithValue(error.response?.data?.message || "Error while updating recurring task")
    }
})

export const deleteRecurringTask = createAsyncThunk('tasks/deleteRecurringTask', async (id, {rejectWithValue}) => {
    try{
        await axiosInstance.delete(`/recurringTask/recurring-task/${id}`);
        return id;
    }
    catch(error){
        return rejectWithValue(error.response?.data?.message || "Error while deleting recurring task")
    }
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
        },
        toggleRecurringTaskCompletionPending : (state, action)=>{
            const task = state.items.find(t => t._id === action.payload);
            if (task) {
                task.completed = false;
            }
        },
        toggleRecurringTaskCompletionDone : (state, action)=>{
            const task = state.items.find(t => t._id === action.payload);
            if (task) {
                task.completed = true;
            }
        },
        clearError: (state) => {
            state.error = null;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
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
        .addCase(fetchRecurringTask.rejected, (state, action)=>{
            state.loading = false,
            state.error = action.payload;
        })

        .addCase(createRecurringTask.pending, (state)=>{
            state.loading = true;
        })
        .addCase(createRecurringTask.fulfilled, (state, action)=>{
            state.loading = false,
            state.items.push(action.payload);
        })
        .addCase(createRecurringTask.rejected, (state, action)=>{
            state.loading = false,
            state.error = action.payload;
        })
    
        .addCase(updateRecurringTask.pending, (state)=>{
            state.loading = true;
        })
        .addCase(updateRecurringTask.fulfilled, (state, action) => {
            state.loading = false;
            const index = state.items.findIndex(t => t._id === action.payload._id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        })
        .addCase(updateRecurringTask.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        .addCase(deleteRecurringTask.pending, (state)=>{
            state.loading = true;
        })
        .addCase(deleteRecurringTask.fulfilled, (state, action) => {
            state.loading = false;
            state.items = state.items.filter(t => t._id !== action.payload);
        })
        .addCase(deleteRecurringTask.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export const { toggleRecurringTaskCompletion ,clearError, setLoading, toggleRecurringTaskCompletionPending, toggleRecurringTaskCompletionDone} = recurringtaskSlice.actions;
export default recurringtaskSlice.reducer;
