import { all } from 'redux-saga/effects';
import { authSaga } from "../sagas/Authsaga"
import { chatSaga } from "../sagas/ChatSaga"

export default function* rootSaga() {
    yield all([
        authSaga(),
        chatSaga(),
    ]);
}