import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IAddMyTask, IMyTask, IMyTaskId, IMyTaskPayload, IUpdateMyTask} from './task.interface';
import {WithPagination} from '../../../interface/response.interface';
import dayjs from "dayjs";

const start = dayjs(new Date(Date.now() + 3600 * 1000 * 24)).format('YYYY-MM-DD');
const end = dayjs(new Date(Date.now() - 3600 * 1000 * 24 * 29)).format('YYYY-MM-DD');
const initialState = {
    filter: {
        searchContent: '' as string,
        startDate: start,
        endDate: end,
    },
    data: {
        id: 0 as number,
        title: '',
        description: '',
        dueDate: dayjs(new Date()) as dayjs.Dayjs,
        priority: 'MEDIUM',
        status: 'PENDING',
    } as IMyTask,
    myTask: {
        content: [] as Array<IMyTask>,
        isLoading: false,
        isError: false,
        error: '',
        total: 0,
        page: 1,
        perPage: 10,
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
            state.myTask.isLoading = true;
        },
        getMyTasksSuccess: (state, action: PayloadAction<WithPagination<IMyTask>>) => {
            state.myTask.content = action.payload?.data;
            state.myTask.page = action.payload?.extraData?.page || 1;
            state.myTask.perPage = action.payload?.extraData?.perPage || 10;
            state.myTask.total = action.payload?.extraData?.total || 0;
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
            state.updateTask.isSuccess = false;
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
            if (action.payload?.id) {
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


        setTaskData: (state, action: PayloadAction<{ fieldName: keyof IAddMyTask; value: string }>) => {
            const {fieldName, value} = action.payload;
            if (state.data[fieldName] !== undefined) {
                (state.data[fieldName] as typeof value) = value;
            }
        },
        setMyTaskData: (state, action: PayloadAction<IMyTask>) => {
            state.data = {...action.payload};
        },

        setSearchContent: (state, action: PayloadAction<{ searchContent: string }>) => {
            state.filter.searchContent = action.payload.searchContent ?? '';
        },

        setDates: (state, action: PayloadAction<{ fromDate: string, toDate: string }>) => {
            state.filter.startDate = action.payload.fromDate ?? '';
            state.filter.endDate = action.payload.toDate ?? '';
        },

        resetTaskData: (state) => {
            state.data = initialState.data;
        },

        resetMyLists: (state) => {
            state.filter.searchContent = '';
            state.myTask = initialState.myTask
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
    setTaskData,

    setSearchContent,
    setDates,
    setMyTaskData,
    resetTaskData,
    resetMyLists,
} = taskSlice.actions;

export default taskSlice.reducer;
