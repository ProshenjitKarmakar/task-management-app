import {PayloadAction} from '@reduxjs/toolkit';
import {takeLatest} from 'redux-saga/effects';
import {all, call, debounce, delay, put} from 'typed-redux-saga';
import MyTaskService from './../../../services/task.service';
import {IAddMyTask, IMyTaskId, IMyTaskPayload, IUpdateMyTask} from './task.interface';
import {
    addMyTaskFailed,
    addMyTaskSuccess,
    dashboardCountsFailed,
    dashboardCountsSuccess,
    deleteMyTasksFailed,
    deleteMyTasksSuccess,
    getMyTasksFailed,
    getMyTasksSuccess,
    updateMyTasksFailed,
    updateMyTasksSuccess
} from './task.slice';
import {getCurrentDateTimeMilliSeconds} from "../../../helpers/helper";
import showToaster from "../../../helpers/utility/showToaster";

function* taskWatcher() {
    yield takeLatest('task/addMyTask', addMyTaskSaga);
    yield takeLatest('task/updateMyTasks', updateMyTasksSaga);
    yield takeLatest('task/deleteMyTasks', deleteMyTasksSaga);
    yield takeLatest('task/dashboardCounts', dashboardCountsSaga);
    yield debounce(500, 'task/getMyTasks', getMyTasksSaga);
}

function* getMyTasksSaga(action: PayloadAction<IMyTaskPayload>) {
    try {
        const response = yield* call(MyTaskService.list, action.payload);

        if (response.success) {
            yield put(getMyTasksSuccess(response.data));
        } else {
            yield put(getMyTasksFailed());
        }
    } catch (err) {
        console.log('Error: ', err);
        yield put(getMyTasksFailed());
    }
}

function* addMyTaskSaga(action: PayloadAction<IAddMyTask>) {
    const __id = getCurrentDateTimeMilliSeconds();
    showToaster.loading('Please wait...', __id);
    try {
        const response = yield* call(MyTaskService.add, action.payload);

        if (response.success) {
            yield put(addMyTaskSuccess(response.data));
            showToaster.success(response?.message, __id);
        } else {
            yield put(addMyTaskFailed());
            showToaster.error(response?.message, __id);
        }
    } catch (err) {
        console.log('Error: ', err);
        yield put(addMyTaskFailed());
        showToaster.error('Something went wrong! Try again!', __id);
    }
}

function* updateMyTasksSaga(action: PayloadAction<IUpdateMyTask>) {
    const __id = getCurrentDateTimeMilliSeconds();
    showToaster.loading('Please wait...', __id);
    try {
        const response = yield* call(MyTaskService.update, action.payload);

        if (response.success) {
            yield put(updateMyTasksSuccess(response.data));
            showToaster.success(response?.message, __id);
        } else {
            yield put(updateMyTasksFailed());
            showToaster.error(response?.message, __id);
        }
    } catch (err) {
        showToaster.success('Something went wrong! Try again!', __id);
        console.log('Error: ', err);
        yield put(updateMyTasksFailed());
    }
}

function* deleteMyTasksSaga(action: PayloadAction<IMyTaskId>) {
    const __id = getCurrentDateTimeMilliSeconds();
    showToaster.loading('Please wait...', __id);
    try {
        const response = yield* call(MyTaskService.delete, action.payload);

        if (response.success) {
            yield put(deleteMyTasksSuccess(response.data));
            showToaster.success(response?.message, __id);
        } else {
            yield put(deleteMyTasksFailed());
            showToaster.error(response?.message, __id);
        }
    } catch (err) {
        console.log('Error: ', err);
        yield put(deleteMyTasksFailed());
        showToaster.error('Something went wrong! Try again!', __id);
    }
}

function* dashboardCountsSaga(action: PayloadAction<undefined>) {
    try {
        const response = yield* call(MyTaskService.dashboardCount, action.payload);

        if (response.success) {
            yield delay(1000)
            yield put(dashboardCountsSuccess(response.data));
        } else {
            yield put(dashboardCountsFailed());
        }
    } catch (err) {
        console.log('Error: ', err);
        yield put(dashboardCountsFailed());
    }
}

export default function* taskSaga() {
    yield all([taskWatcher()]);
}
