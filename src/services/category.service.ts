import axiosClient from "../utils/axiosClient";
import {RoutesEnum} from "../constants/routes";
import { Field } from "../utils/DynamicForm";

export class categoryService
{   
    // base title for all requests
    static title = "Категории"

    static formatData(data: any, forEdit: boolean = false) {

        const result = {
            "Название": data.title,
            "Родитель": data.parent.title,
            "Дочерние": data.children.map((item: any) => item.title).join(", "),
            "Описание": data.description,
            "Создано": data.created_at.slice(0, 10),
            "Обновлено": data.updated_at.slice(0, 10),
            "Статус": data.status ? "Активен" : "Неактивен",
        }

        if (forEdit) {
            return {
                ...result,
                "parent_id": data.parent.id,
            }
        } else {
            return result
        }
    }
    static getFields = (): Field[] => {
        const fields: Field[] = [
            {
                name: "name",
                label: "Имя",
                type: "text",
                placeholder: "Введите имя",
                required: true,
            }
        ]
        return fields;
    }

    static async getAll(search: string = "")
    {
        const response = axiosClient.get(RoutesEnum.Category, {
            params: {
                search: search ? search : undefined,
            }
        })
        return response
    }

    static async getById(id: number, forEdit: boolean = false) {
        const response = await axiosClient.get(RoutesEnum.Category + "/" + id)

        return this.formatData(response.data.data)
    }

    static async create(data: any) {
        const response = await axiosClient.post(RoutesEnum.Category, data)
        return response
    }

    static async update(id: number, data: any) {
        const response = await axiosClient.put(RoutesEnum.Category + "/" + id, data)
        return response
    }

    static async delete(id: number) {
        const response = await axiosClient.delete(RoutesEnum.Category + "/" + id)
        return response
    }
}