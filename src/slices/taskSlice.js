import { createSlice } from "@reduxjs/toolkit";



const taskSlice = createSlice({
    name : "task",
    initialState : {
        tasks : []
    },
    reducers : {

    }
})

export const {} = taskSlice.actions;
export default taskSlice.reducer;