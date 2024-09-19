import { all } from 'redux-saga/effects';
import userSaga from "./actions/user/userSaga";
import assessmentSaga from "./actions/assessment/assessment.saga";
import taskSaga from './actions/taskManagement/task.saga';

export default function* rootSaga(): any {
    yield all([
        taskSaga(),
        userSaga(),
        assessmentSaga(),
    ]);
}
