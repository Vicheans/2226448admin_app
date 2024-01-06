import { createContext } from "react";


export const AuthContext = createContext({
    toekn: null,
    userID: null,
    login: (token, tokenExpiration) => {},
    logout: () => {},
    isAuth: false
});