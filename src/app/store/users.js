import { createAction, createSlice } from "@reduxjs/toolkit";
import userService from "../services/userService";
import authService from "../services/authService";
import { localStorageService } from "../services/localStorageService";
import { randomInt } from "../utils/randomInt";
import history from "../utils/history";

// В начальный момент карентюзер уже может быть в системе, но юзеры не подгружаться. Потому надо делать второй базовый стейт
const initialState = localStorageService.getAccessToken()
    ? {
          entities: null,
          isLoading: true,
          error: null,
          isLoggedIn: true,
          dataLoaded: false,
          auth: { userId: localStorageService.getUserByFirebaseId() }
      }
    : {
          entities: null,
          isLoading: false,
          error: null,
          auth: null,
          isLoggedIn: false,
          dataLoaded: false
      };

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true;
        },
        usersReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
            state.dataLoaded = true;
        },
        usersRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        authRequestSuccess: (state, action) => {
            state.auth = action.payload;
            state.isLoggedIn = true;
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload;
        },
        userCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        userLoggedOut: (state) => {
            state.entities = null;
            state.isLoggedIn = false;
            state.auth = null;
            state.dataLoaded = false;
        }
        /* userUpdated: (state) => {} */
    }
});

// Из слайса деструктуризацией забираем редюсер
const { reducer: usersReducer, actions } = usersSlice; // 2 сущности (ключа) данного метода
/* console.log(actions, 222); */
const {
    usersRequested,
    usersReceived,
    usersRequestFiled,
    authRequestSuccess,
    authRequestFailed,
    userCreated,
    userLoggedOut
} = actions; // забрали экшены

//
export const loadUsersList = () => async (dispatch, getState) => {
    dispatch(usersRequested()); // лоадер
    try {
        const { content } = await userService.get(); // загрузка профессий с сервиса
        dispatch(usersReceived(content)); // при успехе обновление состояния диспатчем редюсера
    } catch (error) {
        dispatch(usersRequestFiled(error.message)); // при ошибке то же
    }
};

// Новый селектор, у профессий и качеств не было
export const getUsersList = () => (state) => state.users.entities;

// В компонентах, юзающих хук юзЮзерс, будем менять сущности юзера на тутошнюю, этой ф-ией
export const getUserById = (userId) => (state) => {
    if (state.users.entities) {
        const result = state.users.entities.find((u) => u._id === userId);
        return result;
    }
    /* console.log(result, "result"); */ // +++
};

// Перенос авторизации в юзеры, чтобы избежать каких-то проблем
// Кажись делаем экшон (как понял, просто видимые сообщения для редакса)
const authRequested = createAction("users/authRequested");
const userCreateRequested = createAction("users/userCreateRequested");
const createUserFailed = createAction("users/userCreateRequested");

// Переезд авторизации на редакс, а именно - в users
const createUser = (payload) => async (dispatch) => {
    dispatch(userCreateRequested());
    try {
        const { content } = await userService.create(payload);
        dispatch(userCreated(content));
        history.push("/users");
    } catch (error) {
        dispatch(createUserFailed(error.message)); // НЕ ПОНЯЛ, КАК РАБОТАЕТ???
    }
};

// Перенос авторизации в юзеры, чтобы избежать каких-то проблем
// Почти копипаста с useAuth - кажись уход от хука useAuth
export const signUp =
    ({ email, password, ...rest }) =>
    async (dispatch) => {
        dispatch(authRequested());
        try {
            const data = await authService.register({ email, password });
            localStorageService.setTokens(data);
            dispatch(authRequestSuccess({ userId: data.localId }));
            dispatch(
                createUser({
                    _id: data.localId,
                    email,
                    rate: randomInt(1, 5),
                    completedMeetings: randomInt(0, 200),
                    image: `https://avatars.dicebear.com/api/avataaars/${(
                        Math.random() + 1
                    )
                        .toString(36)
                        .substring(7)}.svg`,
                    ...rest
                })
            );
        } catch (error) {
            console.log("error - ", error.message);
            dispatch(authRequestFailed(error.message));
        }
    };

// Метод логина, переезд на редакс
export const logIn =
    ({ payload, redirect }) =>
    async (dispatch) => {
        const { email, password } = payload;
        dispatch(authRequested()); // кажись просто сообщение для редакса, а иной раз отправляют редюсер
        try {
            const data = await authService.logIn({ email, password });
            dispatch(authRequestSuccess({ userId: data.localId }));
            localStorageService.setTokens(data);
            history.push(redirect);
        } catch (error) {
            dispatch(authRequestFailed(error.message));
        }
    };

// Метод логаута, перенос функционала из logOut.jsx из useAuth.jsx
export const logOut = () => (dispatch) => {
    localStorageService.removeAuthData();
    dispatch(userLoggedOut());
    history.push("/");
};

// Геттер/селектор из стора
export const getIsLoggedIn = () => (state) => {
    /*  console.log(state.isLoggedIn); */
    return state.users.isLoggedIn;
};
export const getDataStatus = () => (state) => {
    return state.users.dataLoaded;
};
export const getCurrentUserId = () => (state) => {
    return state.users.auth.userId;
};
export const getUsersLoadingStatus = () => (state) => {
    return state.users.isLoading;
};
export const getCurrentUserData = () => (state) => {
    if (!state.users.entities) return null;
    return state.users.entities.find((u) => u._id === state.users.auth.userId);
};
export default usersReducer;
