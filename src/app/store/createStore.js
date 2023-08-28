import { combineReducers, configureStore } from "@reduxjs/toolkit";
import qualitiesReducer from "./qualities";
import professionsReducer from "./professions";
import usersReducer from "./users";

// Будем делать редюсеры под разные сущности
// Домашка, добавил редюсеры профессий
const rootReducers = combineReducers({
    qualities: qualitiesReducer,
    professions: professionsReducer,
    users: usersReducer
});

// middleWare не добавляем
export function createStore() {
    return configureStore({ reducer: rootReducers });
}
