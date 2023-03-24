import axiosClient from "../utils/axiosClient";
import {RoutesEnum} from "../constants/routes";

export class placeService
{
    static async getAll(limit: number = 100, page: number = 1, search: string = "")
    {
        const response = axiosClient.get(RoutesEnum.Place, {
            params: {
                limit: limit,
                page: page,
                search: search ? search : undefined,
            }
        })
        return response
    }

    static async getById(id: number) {
        const response = axiosClient.get(RoutesEnum.Place + "/" + id)
        return response
    }

    static async create(data: any) {
        const response = axiosClient.post(RoutesEnum.Place, data)
        return response
    }

    static async update(id: number, data: any) {
        const response = axiosClient.put(RoutesEnum.Place + "/" + id, data)
        return response
    }

    static async delete(id: number) {
        const response = axiosClient.delete(RoutesEnum.Place + "/" + id)
        return response
    }
}