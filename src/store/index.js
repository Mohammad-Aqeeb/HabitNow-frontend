import { combineReducers } from "@reduxjs/toolkit";
import taskReducer from "@/slices/taskSlice";

const rootReducer = combineReducers({
    tasks : taskReducer 
})

export default rootReducer;