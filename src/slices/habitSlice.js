import axiosInstance from "@/services/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchHabit = createAsyncThunk("habit/fetchHabit", async (_, {rejectWithValue})=>{
  try{
    const response = await axiosInstance.get('/habit/habits');
    return response.data.data;
  }
  catch(error){
    return rejectWithValue(error.response?.data?.message || "Error while feching habit")
  }
})

export const createHabit = createAsyncThunk('habit/createHabit', async (habit, {rejectWithValue}) => {
  try{
    const response = await axiosInstance.post('/habit/habits', habit);
    return response.data.data;
  }
  catch(error){
    return rejectWithValue(error.response?.data?.message || "Error while creating habit");
  }
});

export const updateHabit = createAsyncThunk('habit/updateHabit', async ({ id, updatedFields },{rejectWithValue}) => {
  try{
    const response = await axiosInstance.put(`/habit/habits/${id}`, updatedFields);
    return response.data.data;
  }
  catch(error){
    return rejectWithValue(error.response?.data?.message || "Error while updating habit");
  }
});

export const deleteHabit = createAsyncThunk('habit/deleteHabit', async (id, {rejectWithValue}) => {
  try{
    await axiosInstance.delete(`/habit/habits/${id}`);
    return id;
  }
  catch(error){
    return rejectWithValue(error.response?.data?.message || "Error while deleting habit");
  }
});

const habitSlice = createSlice({
    name : "habit",
    initialState : {
        items : [],
        loading : false,
        error : null
    },
    reducers : {
        clearError: (state) => {
            state.error = null;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    },
    extraReducers : (builder)=>{
    builder
        .addCase(fetchHabit.pending, (state)=>{
            state.loading = true;
        })
        .addCase(fetchHabit.fulfilled, (state, action)=>{
            state.loading = false;
            state.items = action.payload;
        })
        .addCase(fetchHabit.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        .addCase(createHabit.pending, (state) => {
            state.loading = true;
        })
        .addCase(createHabit.fulfilled, (state, action)=>{
            state.loading = false;
            state.items.push(action.payload);
        })
        .addCase(createHabit.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    
        .addCase(updateHabit.pending, (state) => {
            state.loading = true;
        })
        .addCase(updateHabit.fulfilled, (state, action)=>{
            state.loading = false;
            const index = state.items.findIndex(t => t._id === action.payload._id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        })
        .addCase(updateHabit.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        .addCase(deleteHabit.pending, (state) => {
            state.loading = true;
        })
        .addCase(deleteHabit.fulfilled, (state, action)=>{
            state.loading = false;
            state.items = state.items.filter(t => t._id  !== action.payload);
        })
        .addCase(deleteHabit.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export const {clearError, setLoading} = habitSlice.actions;
export default habitSlice.reducer;
