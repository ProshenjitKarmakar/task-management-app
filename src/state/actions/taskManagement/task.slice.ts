import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAddMyTask, IMyTask, IMyTaskId, IMyTaskPayload, IUpdateMyTask } from './task.interface';
import { WithPagination } from '../../../interface/response.interface';

const initialState = {
    filter: {
        searchContent: '' as string,
    },
    myTask: {
        content: [] as Array<IMyTask>,
        isLoading: false,
        isError: false,
        error: '',
        count: 0,
        currentPage: 1,
        limit: 10,
        nextPage: 0,
        totalPages: 1,
    },
    addTask: {
        content: {} as IAddMyTask,
        isLoading: false,
        isSuccess: false,
        isError: false,
    },
    editTask: {
        content: {} as IUpdateMyTask,
        isLoading: false,
        isSuccess: false,
        isError: false,
    },
    updateTask: {
        isLoading: false,
        isSuccess: false,
        isError: false,
    },
    deleteTask: {
        isLoading: false,
        isSuccess: false,
        isError: false,
    },
};

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        getMyTasks: (state, _action: PayloadAction<IMyTaskPayload>) => {
            console.log("=====getMyTasks==Slice===", _action);

            state.myTask.isLoading = true;
        },
        getMyTasksSuccess: (state, action: PayloadAction<WithPagination<IMyTask>>) => {
            state.myTask.content = action.payload?.data;
            state.myTask.currentPage = action.payload.extraData.currentPage;
            state.myTask.limit = action.payload.extraData?.totalPages;
            state.myTask.count = action.payload.extraData.total || 0;
            state.myTask.isLoading = false;
        },
        getMyTasksFailed: (state) => {
            state.myTask.content = [];
            state.myTask.isLoading = false;
            state.myTask.isError = true;
        },

        addMyTask: (state, _action: PayloadAction<IAddMyTask>) => {
            console.log("=====addMyTask==Slice==", _action);

            state.addTask.isLoading = true;
        },
        addMyTaskSuccess: (state, action: PayloadAction<IMyTask>) => {
            state.myTask.content = [...state.myTask.content, action.payload];
            state.addTask.isLoading = false;
            state.addTask.isSuccess = true;
        },
        addMyTaskFailed: (state) => {
            state.addTask.isLoading = false;
            state.addTask.isError = true;
        },
        resetAddMyTasks: (state) => {
            state.addTask.isSuccess = false;
        },

        updateMyTasks: (state, _action: PayloadAction<IUpdateMyTask>) => {
            state.updateTask.isLoading = true;
        },
        updateMyTasksSuccess: (state, action: PayloadAction<IUpdateMyTask>) => {
            if (action.payload.id) {
                state.myTask.content = state.myTask.content.map((item) => {
                    if (item.id === action.payload.id) {
                        item.title = action.payload.title;
                        item.description = action.payload.description;
                        item.dueDate = action.payload.dueDate;
                        item.priority = action.payload.priority;
                        item.status = action.payload.status;
                    }
                    return item;
                });
            }
            state.updateTask.isLoading = false;
            state.updateTask.isSuccess = true;
        },
        updateMyTasksFailed: (state) => {
            state.updateTask.isLoading = false;
            state.updateTask.isError = true;
        },
        resetUpdateMyTasks: (state) => {
            state.updateTask.isSuccess = false;
        },

        deleteMyTasks: (state, _action: PayloadAction<IMyTaskId>) => {
            state.deleteTask.isLoading = true;
        },
        deleteMyTasksSuccess: (state, action: PayloadAction<IMyTaskId>) => {
            if (action.payload.id) {
                state.myTask.content = state.myTask.content?.filter((item) => item.id !== action.payload.id);
            }
            state.deleteTask.isLoading = false;
            state.deleteTask.isSuccess = true;
        },
        deleteMyTasksFailed: (state) => {
            state.deleteTask.isLoading = false;
            state.deleteTask.isError = true;
        },
        resetDeleteMyTasks: (state) => {
            state.deleteTask.isSuccess = false;
        },

        setMyTaskSearchContent: (state, action: PayloadAction<string>) => {
            state.filter.searchContent = action.payload;
        },

        resetMyLists: (state) => {
            state.filter.searchContent = '';
        },
    },
});

export const {
    getMyTasks,
    getMyTasksSuccess,
    getMyTasksFailed,


    addMyTask,
    addMyTaskSuccess,
    addMyTaskFailed,
    resetAddMyTasks,

    updateMyTasks,
    updateMyTasksSuccess,
    updateMyTasksFailed,
    resetUpdateMyTasks,

    deleteMyTasks,
    deleteMyTasksSuccess,
    deleteMyTasksFailed,
    resetDeleteMyTasks,

    setMyTaskSearchContent,

    resetMyLists,
} = taskSlice.actions;

export default taskSlice.reducer;
