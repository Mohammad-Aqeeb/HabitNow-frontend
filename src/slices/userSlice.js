import axiosInstance from "@/services/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk('user/fetchUser', async (_, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get('user/profile');
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const updateUserAsync = createAsyncThunk('userSlice/updateUserAsync', async (userData ,{ rejectWithValue }) => {
    try {
        await axiosInstance.put('user/profile', userData);
        return userData;
    } catch (error) {
         return rejectWithValue(error.response.data);
    }
});

const userSlice = createSlice({
    name : "user",
    initialState : {
        user : {},
        loading : false,
        error  : null
    },
    reducers : {
        updateUser : (state, action)=>{
            state.user = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    },
    extraReducers : (builder)=>{
    builder
        .addCase(fetchUser.pending,(state)=>{
            state.loading = true;
        })
        .addCase(fetchUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.user = action.payload;
        })
        .addCase(fetchUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || 'Failed to fetch user';
        })
        .addCase(updateUserAsync.pending,(state)=>{
            state.loading = true;
        })
        .addCase(updateUserAsync.fulfilled,(state,action)=>{
            state.loading = false;
            state.user = action.payload;
        })
        .addCase(updateUserAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || 'Failed to update user';
        })
    }
})

export const {updateUser, clearError, setLoading} = userSlice.actions;
export default userSlice.reducer;
