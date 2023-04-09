import axiosClient from "../utils/axiosClient";
import {RoutesEnum} from "../constants/routes";

export class placeService
{
    static formatData(data: any) {
        return {
            "Название": data.name,
            "Регион": data.region?.title,
            "Тип": data.type?.name,
            "Филиал": data.branch?.title,   
            "Создано": data.created_at.slice(0, 10),
            "Обновлено": data.updated_at.slice(0, 10),
            "Статус": data.status ? "Активен" : "Неактивен",
        }
    }

    static async getAll(search: string = "")
    {
        const response = await axiosClient.get(RoutesEnum.Place, {
            params: {
                search: search ? search : undefined,
            }
        })
        return response
    }

    static async getById(id: number) {
        const response = await axiosClient.get(RoutesEnum.Place + "/" + id)
        console.log(response.data.data)
        return this.formatData(response.data.data)
    }

    static async create(data: any) {
        const response = await axiosClient.post(RoutesEnum.Place, data)
        return response
    }

    static async update(id: number, data: any) {
        const response = await axiosClient.put(RoutesEnum.Place + "/" + id, data)
        return response
    }

    static async delete(id: number) {
        const response = await axiosClient.delete(RoutesEnum.Place + "/" + id)
        return response
    }
}