import axiosClient from "../utils/axiosClient";
import {RoutesEnum} from "../constants/routes";

export class storageService
{
    static formatData(data: any)
    {
        return {
            "Название": data.name,
            "Филиал": data.branch?.name,
            "Регион": data.region?.title,
            "Описание": data.description,
            "Создано": data.created_at.slice(0, 10),
            "Обновлено": data.updated_at.slice(0, 10),
            "Статус": data.status ? "Активен" : "Неактивен",
        }
    }

    static async getAll(search: string = "")
    {
        const response = axiosClient.get(RoutesEnum.Storage, {
            params: {
                search: search ? search : undefined,
            }
        })
        return response
    }

    static async getById(id: number) {
        const response = await axiosClient.get(RoutesEnum.Storage + "/" + id)
        console.log(response.data.data)
        return this.formatData(response.data.data)
    }

    static async create(data: any)
    {
        const response = await axiosClient.post(RoutesEnum.Storage, data)
        return response
    }

    static async update(id: number, data: any)
    {
        const response = await axiosClient.put(RoutesEnum.Storage + "/" + id, data)
        return response
    }

    static async delete(id: number)
    {
        const response = await axiosClient.delete(RoutesEnum.Storage + "/" + id)
        return response
    }
}