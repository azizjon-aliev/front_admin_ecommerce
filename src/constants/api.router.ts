import HomePage from "../pages/HomePage";
import LoginPage from "../pages/Auth/LoginPage";
import SignUpPage from "../pages/Auth/RegisterPage";
import { RoutesEnum } from "./routes";
import React from "react";
import TagPage from "../pages/TagPage";

interface IRouter {
    title: string;
    path: string;
    element: React.ComponentType;
}

export const publicRouter: IRouter[] = [
    { title: 'Login', path: RoutesEnum.Login, element: LoginPage},
    { title: 'Регистрация', path: RoutesEnum.Register, element: SignUpPage},
]

export const privateRouter: IRouter[] = [
    { title: 'Home', path: RoutesEnum.Home, element: HomePage },
    { title: 'Logout', path: RoutesEnum.Logout, element: HomePage },
    { title: 'Tags', path: RoutesEnum.Tag, element: TagPage },
]
