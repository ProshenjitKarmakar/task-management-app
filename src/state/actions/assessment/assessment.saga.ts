import { all, call, put, takeEvery } from "typed-redux-saga";
import { ForkEffect } from "redux-saga/effects";
import AssessmentService from "../../../services/assessment.service";
import { PayloadAction } from "@reduxjs/toolkit";
import { attemptDispatchFailed, attemptDispatchSuccess } from "./assessment.slice";

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


function* fetchResource(resource: string): Generator<ForkEffect<any>, void, any> {
    console.log("=====fetchResource=====")
}
function* fetchResourceTwo(resource: string): Generator<ForkEffect<any>, void, any> {
    console.log("=====fetchResourceTwo=====")
}

export default function* assessmentSaga() {
    yield all([assessmentWatcher()])
}
