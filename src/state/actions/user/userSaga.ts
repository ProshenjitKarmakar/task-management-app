import { ForkEffect } from "redux-saga/effects";
import {all, takeEvery, fork} from "typed-redux-saga";
function* userWatcher() {
    yield takeEvery("user/attemptLogin", attemptLoginSaga);
}

function* attemptLoginSaga(action : any): Generator<ForkEffect<any>, void, any> {
    try {
        // @ts-ignore
        const task1 : any = yield fork(fetchResource, 'users');
        // @ts-ignore
        const task2 : any = yield fork(fetchResourceTwo, 'comments');

    } catch (err) {

    }
}


function* fetchResource(resource : string) : Generator<ForkEffect<any>, void, any> {
    console.log("=====fetchResource=====")
}
function* fetchResourceTwo(resource: string) : Generator<ForkEffect<any>, void, any> {
    console.log("=====fetchResourceTwo=====")
}

export default function* userSaga() {
    yield all([userWatcher()])
}
