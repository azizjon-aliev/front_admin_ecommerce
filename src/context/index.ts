import {createContext} from "react";

export const AuthContext = createContext({
    isAuth: localStorage.getItem('ACCESS_TOKEN') !== null,
    isLoading: false
})