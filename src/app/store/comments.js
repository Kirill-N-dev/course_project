import { createSlice } from "@reduxjs/toolkit";
import commentService from "../services/commentService";
import { nanoid } from "nanoid";

// Скопировать profession и изменял, как автор
// Тут хранилище лишь одного юзера

const commentsSlice = createSlice({
    name: "comments",
    initialState: { entities: null, isLoading: true },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        // домаха  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        commentsAdded: (state, action) => {
            state.entities = [...state.entities, action.payload];
            state.isLoading = false;
        },
        // домаха, может это надо
        commentsAddedFailed: (state, action) => {
            state.error = action.payload;
        },
        // домаха
        commentsUpdatedAfterDeleting: (state, action) => {
            state.entities = state.entities.filter(
                (entity) => entity._id !== action.payload // нашёл ошибку, она была тут
            );
            /* console.log(action); */
            state.isLoading = false;
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
    commentsRequested,
    commentsReceived,
    commentsRequestFiled,
    commentsAdded,
    commentsUpdatedAfterDeleting,
    commentsAddedFailed
} = actions;

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(userId);
        dispatch(commentsReceived(content));
    } catch (error) {
        dispatch(commentsRequestFiled(error.message));
    }
};

// Домаха, добавление комментария через стор, частичная копипаста с допилом
export const createComment = (data) => async (dispatch) => {
    /* console.log(data, 333); */ // у автора нет userId, Но у меня есть, странно, и я не пишу часть его кода
    /* data = Object { content: "dddeeeee", pageId: "KlQ8DFBRG2dEbaEJI1e1bT488bZ2", userId: "RTi6CN9bpUejT8w3uiVAFoSABvu1" } */
    const comment = {
        ...data,
        created_at: Date.now(),
        _id: nanoid()
    };
    /* console.log(comment, 333); */
    /* comment = Object { content: "dd", pageId: "KlQ8DFBRG2dEbaEJI1e1bT488bZ2",
      userId: "RTi6CN9bpUejT8w3uiVAFoSABvu1", created_at: 1693419095485, _id: "f4A4Ar-ivcrGKhKLytoCJ" } */
    try {
        const { content } = await commentService.createComment(comment);
        dispatch(commentsAdded(content));
    } catch (error) {
        console.log("COMMENTS.JS ERROR");
        dispatch(commentsAddedFailed(error.message));
    }
};

export const deleteComment = (id) => async (dispatch) => {
    try {
        /* console.log(id); */ // +++
        const { content } = await commentService.deleteComment(id);
        if (content === null) {
            dispatch(commentsUpdatedAfterDeleting(id));
        } else {
            console.log("Ответ сервера NULL");
        }
    } catch (error) {
        console.log("Что-то пошло не так:", error);
    }
};

// Селекторы комментов, из внедрения редакса в ФК

// ТУТ ВОПРОС, ПОЧЕМУ ТУТ ЧЕРЕЗ КОММЕНТС, А ВЫШЕ, В РЕДЮСЕРАХ - БЕЗ?
export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;

export default commentsReducer;
