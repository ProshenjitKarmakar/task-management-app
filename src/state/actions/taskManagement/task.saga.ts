import { PayloadAction } from '@reduxjs/toolkit';
import { takeLatest } from 'redux-saga/effects';
import { all, call, debounce, put } from 'typed-redux-saga';
import MyTaskService from './../../../services/task.service';
import { IAddMyTask, IMyTaskId, IMyTaskPayload, IUpdateMyTask } from './task.interface';
import { addMyTaskFailed, addMyTaskSuccess, deleteMyTasksFailed, deleteMyTasksSuccess, getMyTasksFailed, getMyTasksSuccess, updateMyTasksFailed, updateMyTasksSuccess } from './task.slice';

function* taskWatcher() {
    yield takeLatest('task/addMyTask', addMyTaskSaga);
    yield takeLatest('task/updateMyTasks', updateMyTasksSaga);
    yield takeLatest('task/deleteMyTasks', deleteMyTasksSaga);
    yield debounce(500, 'task/getMyTasks', getMyTasksSaga);
}

function* getMyTasksSaga(action: PayloadAction<IMyTaskPayload>) {
    console.log("=====getMyTasksSaga===", action);

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
    console.log("=====addMyTaskSaga====", action);
    try {
        const response = yield* call(MyTaskService.add, action.payload);

        if (response.success) {
            yield put(addMyTaskSuccess(response.data));
        } else {
            yield put(addMyTaskFailed());
        }
    } catch (err) {
        console.log('Error: ', err);
        yield put(addMyTaskFailed());
    }
}

function* updateMyTasksSaga(action: PayloadAction<IUpdateMyTask>) {
    console.log("=====getMyTasksSaga===", action);
    try {
        const response = yield* call(MyTaskService.update, action.payload);

        if (response.success) {
            yield put(updateMyTasksSuccess(response.data));
        } else {
            yield put(updateMyTasksFailed());
        }
    } catch (err) {
        console.log('Error: ', err);
        yield put(updateMyTasksFailed());
    }
}

function* deleteMyTasksSaga(action: PayloadAction<IMyTaskId>) {
    try {
        const response = yield* call(MyTaskService.delete, action.payload);

        if (response.success) {
            yield put(deleteMyTasksSuccess(response.data));
        } else {
            yield put(deleteMyTasksFailed());
        }
    } catch (err) {
        console.log('Error: ', err);
        yield put(deleteMyTasksFailed());
    }
}

export default function* taskSaga() {
    yield all([taskWatcher()]);
}
