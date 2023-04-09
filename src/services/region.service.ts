import axiosClient from "../utils/axiosClient";
import {RoutesEnum} from "../constants/routes";

export class regionService
{
    static formatData(data: any)
    {
        return {
            "Название": data.title,
            "Создано": data.created_at.slice(0, 10),
            "Обновлено": data.updated_at.slice(0, 10),
            "Родитель": data.parent?.title,
            "Дочерние": data.children?.map((item: any) => item.title).join(", "),
            "Статус": data.status ? "Активен" : "Неактивен",
        }
    }

    static async getAll(search: string = "")
    {
        const response = await axiosClient.get(RoutesEnum.Region, {
            params: {
                search: search ? search : undefined,
            }
        })
        return response
    }

    static async getById(id: number) {
        const response = await axiosClient.get(RoutesEnum.Region + "/" + id)
        console.log(response.data.data)
        return this.formatData(response.data.data)
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