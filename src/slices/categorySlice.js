import axiosInstance from "@/services/axiosInstance";
import {createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCategory = createAsyncThunk('category/fetchCategory', async (_, {rejectWithValue})=>{
    try{
        const response = await axiosInstance.get("/category");
        return response.data;
    }
    catch(error){
        return rejectWithValue(error.response.message || "Error while fetching category")
    }
})

const categorySlice = createSlice({
    name : "category",
    initialState : {
        items: [],
        loading : false,
        error : null
    },
    reducers : {

    },
    extraReducers : (builder) => {
    builder
        .addCase(fetchCategory.pending, (state)=>{
            state.loading = true;
        })
        .addCase(fetchCategory.fulfilled, (state, action)=>{
            state.loading = false;
            state.items = action.payload;
        })
        .addCase(fetchCategory.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export const {} = categorySlice.actions;
export default categorySlice.reducer;