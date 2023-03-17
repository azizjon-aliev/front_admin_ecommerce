import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import {RoutesEnum} from "./routes";
import React from "react";

interface IRouter {
    title: string;
    path: string;
    element: React.ComponentType;
}

export const publicRouter: IRouter[] = [
    { title: 'Login', path: RoutesEnum.Login, element: LoginPage}
]

export const privateRouter: IRouter[] = [
    { title: 'Home', path: RoutesEnum.Home, element: HomePage },
]
