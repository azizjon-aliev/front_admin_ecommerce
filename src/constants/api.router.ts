import HomePage from "../pages/Admin/HomePage";
import LoginPage from "../pages/Auth/LoginPage";
import SignUpPage from "../pages/Auth/RegisterPage";
import { RoutesEnum } from "./routes";
import React from "react";
import TagPage from "../pages/Admin/TagPage";
import PlacePage from "../pages/Admin/PlacePage";
import CategoryPage from "../pages/Admin/CategoryPage";
import StoragePage from "../pages/Admin/StoragePage";
import RegionPage from "../pages/Admin/RegionPage";
import UnitPage from "../pages/Admin/UnitPage";
import UserPage from "../pages/Admin/UserPage";
import GoodPage from "../pages/Admin/GoodPage";

interface IRouter {
    title: string;
    path: string;
    element: React.FC;
    // icon: JSX.Element; // определение свойства icon
}

  

export const publicRouter: IRouter[] = [
    { title: 'Вход', path: RoutesEnum.Login, element: LoginPage},
    { title: 'Регистрация', path: RoutesEnum.Register, element: SignUpPage},
]

export const privateRouter: IRouter[] = [
    { title: 'Главная', path: RoutesEnum.Home, element: HomePage },
    { title: 'Теги', path: RoutesEnum.Tag, element: TagPage },
    { title: 'Места', path: RoutesEnum.Place, element: PlacePage },
    { title: 'Категории', path: RoutesEnum.Category, element: CategoryPage },
    { title: 'Хранилище', path: RoutesEnum.Storage, element: StoragePage },
    { title: 'Регионы', path: RoutesEnum.Region, element: RegionPage },
    { title: 'Единицы', path: RoutesEnum.Unit, element: UnitPage },
    { title: 'Пользователи', path: RoutesEnum.User, element: UserPage},
    { title: 'Товары', path: RoutesEnum.Good, element: GoodPage},
]
