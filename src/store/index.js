import { combineReducers } from "@reduxjs/toolkit";
import taskReducer from "@/slices/taskSlice";
import recurringtaskReducer from "@/slices/recurringtaskSlice";
import userReducer from "@/slices/userSlice";

const rootReducer = combineReducers({
    tasks : taskReducer,
    recurringtasks : recurringtaskReducer,
    user : userReducer
})

export default rootReducer;