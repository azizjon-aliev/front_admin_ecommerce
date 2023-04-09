import axiosClient from "../utils/axiosClient";
import {RoutesEnum} from "../constants/routes";

export class tagService
{
    static async getAll( search: string = "" )
    {
        const response = axiosClient.get(RoutesEnum.Tag, {
            params: {
                search: search ? search : undefined,
            }
        })
        return response
    }
    
    static async create(data: any)
    {
        const response = axiosClient.post(RoutesEnum.Tag, data)
        return response
    }

    static async update(id: number, data: any)
    {
        const response = axiosClient.put(RoutesEnum.Tag + "/" + id, data)
        return response
    }

    static async delete(id: number)
    {
        const response = axiosClient.delete(RoutesEnum.Tag + "/" + id)
        return response
    }
}