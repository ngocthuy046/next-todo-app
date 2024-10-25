import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchData , addData } from './api'
import {
    FETCH_TASKS_REQUEST,
    FETCH_TASKS_SUCCESS,
    FETCH_TASKS_FAILURE,
    ADD_TASK_REQUEST,
    ADD_TASK_SUCCESS,
    ADD_TASK_FAILURE,
} from '../actions/task.action'

function* fetchTasksSaga() {
    try {
        const tasks = yield call(fetchData);
        
        yield put({ type: FETCH_TASKS_SUCCESS, payload: tasks });
    } catch(error) {
        yield put({ type: FETCH_TASKS_FAILURE, payload: error.message });
    }
}

function* addTaskSaga(action) {
    try {
        const newTask = yield call(addData, action.payload);
        yield put({ type: ADD_TASK_SUCCESS, payload: newTask });
    } catch(error) {
        yield put({ type: ADD_TASK_FAILURE, payload: error.message })
    }
}

export default function* rootSaga() {
    yield takeEvery(FETCH_TASKS_REQUEST, fetchTasksSaga);
    yield takeEvery(ADD_TASK_REQUEST, addTaskSaga)
}

