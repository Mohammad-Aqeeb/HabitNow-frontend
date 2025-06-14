import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchHabit = createAsyncThunk("habit/fetchHabit", async ()=>{

})

const habitSlice = createSlice({
    name : "habit",
    initialState : {
        items : [],
        loading : false,
        error : null
    },
    reducers : {
        
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
        .addCase(fetchHabit.rejected, (action)=>{
            state.error = action.payload;
        })
    }
})