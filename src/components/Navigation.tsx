import React, {useContext} from 'react';
import {privateRouter, publicRouter} from '../constants/api.router';
import {AuthContext} from "../context";
import {Link, Navigate, Route, Routes} from "react-router-dom";
import {RoutesEnum} from "../constants/routes";

const Navigation = () => {
    const {isAuth} = useContext(AuthContext)

    return (
        isAuth
            ?
            <ul>
                {privateRouter.map(route =>
                    <li key={route.path}>
                        <Link to={route.path}>{route.title}</Link>
                    </li>
                )}
            </ul>
            :
            <ul>
                {publicRouter.map(route =>
                    <li key={route.path}>
                        <Link to={route.path}>{route.title}</Link>
                    </li>
                )}
            </ul>
    )
};

export default Navigation;