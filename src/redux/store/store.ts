import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import tasksReducer from "../reducers/tasks";

const rootReducer = combineReducers({
    tasks: tasksReducer
});

const initialState = {};

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools() // Используйте composeWithDevTools для интеграции с Redux DevTools
);

export default store;

