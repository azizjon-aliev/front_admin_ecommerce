import React from 'react';
import {useFetching} from "../hooks/useFetching";
import {authService} from "../services/auth.service";
import {ILogin} from "../types/IAuth";
import {useNavigate} from "react-router-dom";
import {RoutesEnum} from "../constants/routes";


const LoginPage = () => {
    const [user, setUser] = React.useState({email: '', password: ''});
    const navigation = useNavigate();

    const {fetching: login, errors, isLoading, data} = useFetching(async (user: ILogin) =>
         await authService.login(user)
    );

    // izolda51@example.org


    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        login(user);
        localStorage.setItem('ACCESS_TOKEN', data?.token);
        navigation(RoutesEnum.Home);
    }

    if (isLoading) {
        return <h1>Loading...</h1>
    }


    return (
        <div>
            <form method="post">
                <h3>Login</h3>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        value={user.email}
                        onChange={e => setUser({...user, email: e.target.value})}
                        type="text"
                        name="username"
                    />
                    {errors && errors.email && <div>{errors.email}</div>}
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        value={user.password}
                        onChange={e => setUser({...user, password: e.target.value})}
                        type="password"
                        name="password"
                    />
                    {errors && errors.password && <div>{errors.password}</div>}
                </div>
                <button
                    onClick={handleSubmit}
                    type="submit">Login</button>
            </form>
            {errors?.message && <div>{errors.message}</div>}
        </div>
    );
};

export default LoginPage;