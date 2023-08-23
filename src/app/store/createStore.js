import { combineReducers, configureStore } from "@reduxjs/toolkit";
import qualitiesReducer from "./qualities";
import professionsReducer from "./professions";

// Будем делать редюсеры под разные сущности
// Домашка, добавил редюсеры профессий
const rootReducers = combineReducers({
    qualities: qualitiesReducer,
    professions: professionsReducer
});

// middleWare не добавляем
export function createStore() {
    return configureStore({ reducer: rootReducers });
}
