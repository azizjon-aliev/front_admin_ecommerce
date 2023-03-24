import axiosClient from "../utils/axiosClient";
import {RoutesEnum} from "../constants/routes";

export class storageService
{
    static async getAll(limit: number = 100, page: number = 1, search: string = "")
    {
        const response = axiosClient.get(RoutesEnum.Storage, {
            params: {
                limit: limit,
                search: search ? search : undefined,
            }
        })
        return response
    }

    static async create(data: any)
    {
        const response = axiosClient.post(RoutesEnum.Storage, data)
        return response
    }

    static async update(id: number, data: any)
    {
        const response = axiosClient.put(RoutesEnum.Storage + "/" + id, data)
        return response
    }

    static async delete(id: number)
    {
        const response = axiosClient.delete(RoutesEnum.Storage + "/" + id)
        return response
    }
}