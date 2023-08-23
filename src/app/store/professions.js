import { createSlice } from "@reduxjs/toolkit";
import professionService from "../services/professionService";

// Домашка, получение профессий в стор и их дальнейший экспорт по приложению
// ПОЧТИ КОПИПАСТА, ИБО СУТЬ ТА ЖЕ

const professionsSlice = createSlice({
    name: "professions",
    initialState: { entities: null, isLoading: true, lastFetch: null },
    reducers: {
        professionsRequested: (state) => {
            state.isLoading = true;
        },
        professionsReceived: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now(); // Задаём в стор время получения профессий

            state.isLoading = false;
        },
        professionsRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

// Из слайса деструктуризацией забираем редюсер
const { reducer: professionsReducer, actions } = professionsSlice; // 2 сущности (ключа) данного метода
const { professionsRequested, professionsReceived, professionsRequestFiled } =
    actions; // забрали экшены

// Проверка устаревания данных профессий - прошло ли 10 минут с их получения:
const isOutdated = (date) => {
    if (Date.now() > date * 1000 * 60 * 10) {
        return true;
    } else {
        return false;
    }
};

// Добавил получение гетСтейта для обновления качеств через определённое время
export const loadProfessionsList = () => async (dispatch, getState) => {
    /* console.log(getState()); */ // достаём ластФетче из стора
    const { lastFetch } = getState().professions;
    /* console.log(lastFetch); */
    if (isOutdated(lastFetch)) {
        dispatch(professionsRequested()); // лоадер
        try {
            const { content } = await professionService.get(); // загрузка профессий с сервиса
            dispatch(professionsReceived(content)); // при успехе обновление состояния диспатчем редюсера
        } catch (error) {
            dispatch(professionsRequestFiled(error.message)); // при ошибке то же
        }
    }
};

// Селекторы профессий, из внедрения редакса в ФК, это будем экспортировать туда, где были запросы качеств
export const getProfessions = () => (state) => state.professions.entities;
export const getProfessionsLoadingStatus = () => (state) =>
    state.professions.isLoading;

// ТУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУУТ

// Из недели внедрения редакса, получение правильных качеств для q...List
// ОТКУДА СТЕЙТ БЕРЁТСЯ? ЗАМЫКАНИЕ - Ф ВОЗВР Ф? ЗАЧЕМ?
export const getProfessionById = (profId) => (state) => {
    let arr = [];
    if (state.professions.entities) {
        arr = state.professions.entities.find((prof) => prof._id === profId);
    }

    return arr;
};

export default professionsReducer;
