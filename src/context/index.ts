import {createContext} from "react";

export const AuthContext = createContext({
    isAuth: false,
    isLoading: false
})