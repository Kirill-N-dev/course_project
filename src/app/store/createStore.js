import { combineReducers, configureStore } from "@reduxjs/toolkit";
import qualitiesReducer from "./qualities";
import professionsReducer from "./professions";
import usersReducer from "./users";
import commentsReducer from "./comments";

// Будем делать редюсеры под разные сущности
// Домашка, добавил редюсеры профессий (потом и комментов)
const rootReducers = combineReducers({
    qualities: qualitiesReducer,
    professions: professionsReducer,
    users: usersReducer,
    comments: commentsReducer
});

// middleWare не добавляем
export function createStore() {
    return configureStore({ reducer: rootReducers });
}
