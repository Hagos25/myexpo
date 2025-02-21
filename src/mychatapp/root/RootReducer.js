import { combineReducers } from 'redux';
import authReducer from "../slices/AuthSlice"
import chatReducer from "../slices/ChatSlice"

const rootReducer = combineReducers({
    auth: authReducer,
    chat: chatReducer,
});

export default rootReducer;