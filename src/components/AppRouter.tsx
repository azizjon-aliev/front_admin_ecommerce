import {Navigate, Route, Routes} from "react-router-dom";
import {useContext} from "react";
import {privateRouter, publicRouter} from "../constants/api.router";
import {AuthContext} from "../context";
import Loader from "./UI/Loader/Loader";
import {RoutesEnum} from "../constants/routes";

export const AppRouter = () => {
    // @ts-ignore
    const {isAuth, isLoading} = useContext(AuthContext)

    return (
        isAuth
            ?
            <Routes>
                {privateRouter.map(route =>
                    <Route
                        key={route.path}
                        path={route.path}
                        element={<route.element/>
                        
                    }/>
                )}
                <Route path="*" element={<Navigate to={RoutesEnum.Home}/>}/>
            </Routes>
            :
            <Routes>
                {publicRouter.map(route =>
                    <Route key={route.path} path={route.path} element={<route.element/>}/>
                )}
                <Route path="*" element={<Navigate to={RoutesEnum.Login}/>}/>
            </Routes>
    )
}