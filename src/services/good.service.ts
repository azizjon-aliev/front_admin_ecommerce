import axiosClient from "../utils/axiosClient";
import {RoutesEnum} from "../constants/routes";

export class goodService
{
    static async getAll(limit: number = 100, page: number = 1, search: string = "")
    {
        const response = axiosClient.get(RoutesEnum.Good, {
            params: {
                limit: limit,
                page: page,
                search: search ? search : undefined,
            }
        })
        return response
    }
}