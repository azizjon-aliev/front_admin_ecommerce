import axiosClient from "../utils/axiosClient";
import {RoutesEnum} from "../constants/routes";

export class categoryService
{
    static async getAll(limit: number = 100, page: number = 1, search: string = "")
    {
        const response = axiosClient.get(RoutesEnum.Category, {
            params: {
                limit: limit,
                search: search ? search : undefined,
            }
        })
        return response
    }

    static async getById(id: number) {
        const response = axiosClient.get(RoutesEnum.Category + "/" + id)
        return response
    }

    static async create(data: any) {
        const response = axiosClient.post(RoutesEnum.Category, data)
        return response
    }

    static async update(id: number, data: any) {
        const response = axiosClient.put(RoutesEnum.Category + "/" + id, data)
        return response
    }

    static async delete(id: number) {
        const response = axiosClient.delete(RoutesEnum.Category + "/" + id)
        return response
    }
}