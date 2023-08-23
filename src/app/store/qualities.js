import { createSlice } from "@reduxjs/toolkit";
import qualitiesService from "../services/qualitiesService";

const qualitiesSlice = createSlice({
    name: "qualities",
    initialState: { entities: null, isLoading: true, lastFetch: null },
    reducers: {
        qualitiesRequested: (state) => {
            state.isLoading = true;
        },
        qualitiesReceived: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            /* console.log(state.lastFetch); */ // Задаём в стор время получения качеств
            state.isLoading = false;
        },
        qualitiesRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

// Из слайса деструктуризацией забираем редюсер
const { reducer: qualitiesReducer, actions } = qualitiesSlice;
const { qualitiesRequested, qualitiesReceived, qualitiesRequestFiled } =
    actions;

/* console.log(actions, 333); */

// Ф-ия обновления качеств в зав от времени их запроса, неделя переноса редакса, актуал данных
const isOutdated = (date) => {
    if (Date.now() > date * 1000 * 60 * 10) {
        return true;
    } else {
        return false;
    }
};

// Добавил получение гетСтейта для обновления качеств через определённое время
export const loadQualitiesList = () => async (dispatch, getState) => {
    /* console.log(getState()); */ // достаём ластФетче из стора
    const { lastFetch } = getState().qualities;
    /* console.log(lastFetch); */
    if (isOutdated(lastFetch)) {
        dispatch(qualitiesRequested());
        try {
            const { content } = await qualitiesService.get(); // копипаста с qService - getQuaitiesList
            dispatch(qualitiesReceived(content));
        } catch (error) {
            dispatch(qualitiesRequestFiled(error.message));
        }
    }
};

// Селекторы качеств, из внедрения редакса в ФК, это будем экспортировать туда, где были запросы качеств
export const getQualities = () => (state) => state.qualities.entities;
export const getQualitiesLoadingStatus = () => (state) =>
    state.qualities.isLoading;
// Из недели внедрения редакса, получение правильных качеств для q...List
export const getQualitiesByIds = (qualitiesIds) => (state) => {
    if (state.qualities.entities) {
        const qualitiesArr = [];
        for (const qualId of qualitiesIds) {
            for (const quality of state.qualities.entities) {
                if (quality._id === qualId) {
                    qualitiesArr.push(quality);
                    break; // типа id уникальный
                }
            }
        }
        return qualitiesArr;
    }
    return []; // антиошибка
};

export default qualitiesReducer;
