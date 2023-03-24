import axiosClient from "../utils/axiosClient";
import {RoutesEnum} from "../constants/routes";

export class categoryService
{
    static async getAll(limit: number = 100, page: number = 1, search: string = "")
    {
        const response = axiosClient.get(RoutesEnum.Category, {
            params: {
                limit: limit,
                page: page,
                search: search ? search : undefined,
            }
        })
        return response
    }
}