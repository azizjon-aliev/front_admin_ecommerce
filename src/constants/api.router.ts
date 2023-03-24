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

// importing icons for menu items from material-ui
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import RegionIcon from '@mui/icons-material/LocationOn';
import TagIcon from '@mui/icons-material/LocalOffer';
import LoginIcon from '@mui/icons-material/Login';
import PinDropIcon from '@mui/icons-material/PinDrop';
import GoodIcon from '@mui/icons-material/ShoppingCart';
import UserIcon from '@mui/icons-material/People';
import StorageIcon from '@mui/icons-material/Storage';
import UnitIcon from '@mui/icons-material/FormatListNumbered';
import RegisterIcon from '@mui/icons-material/PersonAdd';



interface IRouter {
    title: string;
    path: string;
    element: React.FC;
    icon: React.FC;
}

  

export const publicRouter: IRouter[] = [
    { title: 'Вход', path: RoutesEnum.Login, element: LoginPage, icon: LoginIcon},
    { title: 'Регистрация', path: RoutesEnum.Register, element: SignUpPage, icon: RegisterIcon},
]

export const privateRouter: IRouter[] = [
    { title: 'Главная', path: RoutesEnum.Home, element: HomePage, icon: HomeIcon },
    { title: 'Категории', path: RoutesEnum.Category, element: CategoryPage, icon: CategoryIcon },
    { title: 'Хранилище', path: RoutesEnum.Storage, element: StoragePage, icon: StorageIcon },
    { title: 'Регионы', path: RoutesEnum.Region, element: RegionPage, icon: RegionIcon },
    { title: 'Места', path: RoutesEnum.Place, element: PlacePage, icon: PinDropIcon },
    { title: 'Единицы', path: RoutesEnum.Unit, element: UnitPage, icon: UnitIcon },
    { title: 'Пользователи', path: RoutesEnum.User, element: UserPage, icon: UserIcon },
    { title: 'Товары', path: RoutesEnum.Good, element: GoodPage, icon: GoodIcon },
    { title: 'Теги', path: RoutesEnum.Tag, element: TagPage, icon: TagIcon },
]
