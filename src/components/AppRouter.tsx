import {Navigate, Route, Routes} from "react-router-dom";
import {useContext} from "react";
import {privateRouter, publicRouter} from "../constants/api.router";
import {AuthContext} from "../context";
import Loader from "./UI/Loader/Loader";
import {RoutesEnum} from "../constants/routes";

export const AppRouter = () => {
    // @ts-ignore
    const {isAuth, isLoading} = useContext(AuthContext)

    if (isLoading) {
        return <Loader />
    }

    return (
        isAuth
            ?
            <Routes>
                {privateRouter.map(route =>
                    <Route path={route.path} element={<route.element />}/>
                )}
            </Routes>
            :
            <Routes>
                {publicRouter.map(route =>
                    <Route path={route.path} element={<route.element />}/>
                )}
                <Route path="*" element={<Navigate to={RoutesEnum.Login}/>}/>
            </Routes>
    )
}