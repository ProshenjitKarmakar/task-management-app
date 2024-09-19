import {PayloadAction} from "@reduxjs/toolkit";
import {all, call, put, takeEvery} from "typed-redux-saga";
import {IUserInfo} from "./user.interface";
import {attemptLoginFailed, attemptLoginSuccess} from "./user.slice";
import UserService from './../../../services/user.service';

function* userWatcher() {
    yield takeEvery("user/attemptLogin", attemptLoginSaga);
}

function* attemptLoginSaga(action: PayloadAction<IUserInfo>) {
    console.log("=====attemptLoginSaga===", action);
    try {
        const response = yield* call(UserService.login, action.payload);

        if (response.success) {
            yield put(attemptLoginSuccess(response.data));
        } else {
            yield put(attemptLoginFailed());
        }
    } catch (err) {
        console.log('Error: ', err);
        yield put(attemptLoginFailed());
    }
}

export default function* userSaga() {
    yield all([userWatcher()])
}
