import {RootState} from "../../store";

export const selectMyTaskState = (state: RootState) => state.task;
