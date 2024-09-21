import {all, call, put, takeEvery} from "typed-redux-saga";
import AssessmentService from "../../../services/assessment.service";
import {PayloadAction} from "@reduxjs/toolkit";
import {attemptDispatchFailed, attemptDispatchSuccess} from "./assessment.slice";

function* assessmentWatcher() {
    yield takeEvery("assessment/attemptDispatch", attemptDispatchSaga);
}

function* attemptDispatchSaga(action: PayloadAction<any>) {
    try {
        console.log("====assessmentSaga=====");
        const response = yield* call(AssessmentService.updateBrandFavIcon, action.payload);

        if (response.success) {
            yield put(attemptDispatchSuccess(response));
        } else {
            yield put(attemptDispatchFailed());
        }
    } catch (err) {
        console.log('Error: ', err);
        yield put(attemptDispatchFailed());
    }
}

export default function* assessmentSaga() {
    yield all([assessmentWatcher()])
}
