import { combineReducers } from "@reduxjs/toolkit";
import taskReducer from "@/slices/taskSlice";
import recurringtaskReducer from "@/slices/recurringtaskSlice";
import userReducer from "@/slices/userSlice";
import habitReducer from "@/slices/habitSlice";
import categoryReducer from "@/slices/categorySlice"

const rootReducer = combineReducers({
    tasks : taskReducer,
    recurringtasks : recurringtaskReducer,
    habits : habitReducer,
    categories : categoryReducer,
    user : userReducer
})

export default rootReducer;