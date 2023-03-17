import {ILogin, IRegister} from "../types/IAuth";
import axiosClient from "../utils/axiosClient";
import {RoutesEnum} from "../constants/routes";

export class authService
{
    static async register(data: IRegister)
    {
        const response = axiosClient.post(RoutesEnum.Login, data)
        return response
    }

    static login(data: ILogin)
    {
        const response = axiosClient.post(RoutesEnum.Register, data)
        return response
    }

    static logout()
    {
        const response = axiosClient.post(RoutesEnum.Logout)
        return response
    }
}