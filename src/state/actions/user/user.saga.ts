import {PayloadAction} from "@reduxjs/toolkit";
import {all, call, delay, put, takeEvery} from "typed-redux-saga";
import {IUser, IUserInfo} from "./user.interface";
import {attemptLoginFailed, attemptLoginSuccess} from "./user.slice";
import UserService from './../../../services/user.service';
import {setCookie} from "../../../helpers/Cookie";
import {getCurrentDateTimeMilliSeconds} from "../../../helpers/helper";
import showToaster from "../../../helpers/utility/showToaster";

function* userWatcher() {
    yield takeEvery("user/attemptLogin", attemptLoginSaga);
}

function* attemptLoginSaga(action: PayloadAction<IUserInfo>) {
    const __id = getCurrentDateTimeMilliSeconds();
    showToaster.loading('Please wait...', __id);
    try {
        const response = yield* call(UserService.login, action.payload);

        if (response.success) {
            setCookie(process.env.REACT_APP_ACCESS_TOKEN, response?.data?.accessToken, process.env.REACT_APP_ACCESS_TOKEN_VALIDITY);
            const content = response.data.accessToken.split('.');
            const decodedHeader: IUser = JSON.parse(atob(content[1]));
            yield delay(2000);
            yield put(attemptLoginSuccess(decodedHeader));
            showToaster.success(response?.message, __id);
        } else {
            yield put(attemptLoginFailed());
            showToaster.error(response?.message, __id);
        }
    } catch (err) {
        console.log('Error: ', err);
        yield put(attemptLoginFailed());
        showToaster.error('Login failed!', __id);
    }
}

export default function* userSaga() {
    yield all([userWatcher()])
}
