import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./actions/user/userSlice"
import { assessmentSlice } from "./actions/assessment/assessment.slice";
import taskSlice from "./actions/taskManagement/task.slice";
// Combine Reducers
const rootReducer = combineReducers({
    user: userSlice,
    assessment: assessmentSlice.reducer,
    task: taskSlice,
});

export default rootReducer;
