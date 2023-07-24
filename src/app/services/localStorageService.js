// Константы для токенов
const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";

export const setTokens = ({ refreshToken, idToken, expiresIn = 3600 }) => {
    // Ниже перевод в милисекунды expiresIn
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(TOKEN_KEY, idToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem(EXPIRES_KEY, expiresDate);
};

export const getAccessToken = () => {
    return localStorage.getItem(TOKEN_KEY);
};

export const getRefreshToken = () => {
    return localStorage.getItem(REFRESH_KEY);
};

export const getTokenExporesDate = () => {
    return localStorage.getItem(EXPIRES_KEY);
};

export const localStorageService = {
    setTokens,
    getAccessToken,
    getRefreshToken,
    getTokenExporesDate
};