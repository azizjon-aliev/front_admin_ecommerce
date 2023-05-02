import axiosClient from "../utils/axiosClient";
import {RoutesEnum} from "../constants/routes";

export class userService
{
    static formatData(data: any) {
        return {
            "Имя": data.first_name,
            "Фамилия": data.last_name,
            "Email": data.email,
            "Роли": data.roles?.map((item: any) => item.name).join(", "),
            "Создано": data.created_at.slice(0, 10),
            "Обновлено": data.updated_at.slice(0, 10),
            "Статус": data.status ? "Активен" : "Неактивен",
        }
    }

    static async getAll( search: string = "" )
    {
        const response = await axiosClient.get(RoutesEnum.User, {
            params: {
                search: search ? search : undefined,
            }
        })
        
        const users = mapping(response)
        
        return users;
    }

    static async getById(id: number) {
        const response = await axiosClient.get(RoutesEnum.User + "/" + id)
        return this.formatData(response.data.data)
    }

    static async create(data: any) {
        const response = await axiosClient.post(RoutesEnum.User, data)
        return response
    }

    static async update(id: number, data: any) {
        const response = await axiosClient.put(RoutesEnum.User + "/" + id, data)
        return response
    }

}

function mapping(response: any) {
    const users = response.data.data.map((user: any )=> {
        return {
            id: user.id,
            fullName: `${user.first_name} ${user.last_name}`,
            status: user.status,
            counter: user.counter,
            image: user.image,
            middle_name: user.middle_name
        }
    })

    const data = {
        data: {
            data: users
        }
    }

    return data;
}
