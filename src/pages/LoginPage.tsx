import React, {useEffect} from 'react';
import {useFetching} from "../hooks/useFetching";
import {authService} from "../services/auth.service";
import {ILogin} from "../types/IAuth";
import {Simulate} from "react-dom/test-utils";


const LoginPage = () => {
    const [user, setUser] = React.useState({email: '', password: ''});

    const {fetching, errors, isLoading, data} = useFetching(async (user: ILogin) =>
         await authService.login(user)
    );

    // izolda51@example.org


    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        console.log(user);
        // fetching(user);
        // console.log(data.data.token);

    }

    if (isLoading) {
        return <h1>Loading...</h1>
    }


    return (
        <div>
            <form>
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