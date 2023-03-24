import axiosClient from "../utils/axiosClient";
import {RoutesEnum} from "../constants/routes";

export class regionService
{
    static async getAll(limit: number = 100, page: number = 1, search: string = "")
    {
        const response = await axiosClient.get(RoutesEnum.Region, {
            params: {
                limit: limit,
                search: search ? search : undefined,
            }
        })
        return response
    }

    static async create(data: any)
    {
        const response = await axiosClient.post(RoutesEnum.Region, data)
        return response
    }

    static async update(id: number, data: any)
    {
        const response = await axiosClient.put(RoutesEnum.Region + "/" + id, data)
        return response
    }

    static async delete(id: number)
    {
        const response = await axiosClient.delete(RoutesEnum.Region + "/" + id)
        return response
    }
}