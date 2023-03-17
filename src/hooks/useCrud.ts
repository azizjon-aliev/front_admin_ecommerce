import { useState } from 'react';
import axios, {AxiosResponse, AxiosError} from 'axios';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';


interface CrudOptions<T> {
    url: string;
    initialData: T | null;
}

interface CrudResponse<T> {
    data: T | null;
    isLoading: boolean;
    error: string | null;
    create: (data: T) => Promise<void>;
    read: (id: number) => Promise<void>;
    update: (id: number, data: T) => Promise<void>;
    delete: (id: number) => Promise<void>;
}

function useCrud<T>(options: CrudOptions<T>): CrudResponse<T> {
    const [data, setData] = useState<T | null>(options.initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const create = async (postData: T) => {
        setIsLoading(true);
        try {
            const response = await axios.post(options.url, postData);
            setData(response.data);
        } catch (error: any) {
            setError(error.message);
        }
        setIsLoading(false);
    };

    const read = async (id: number) => {
        setIsLoading(true);
        try {
            const response = await axios.get<T>(`${options.url}/${id}`);
            setData(response.data);
        } catch (error: any) {
            setError(error.message);
        }
        setIsLoading(false);
    };

    const update = async (id: number, putData: T) => {
        setIsLoading(true);
        try {
            const response = await axios.put(`${options.url}/${id}`, putData);
            setData(response.data);
        } catch (error: any) {
            setError(error.message);
        }
        setIsLoading(false);
    };

    const remove = async (id: number) => {
        setIsLoading(true);
        try {
            await axios.delete(`${options.url}/${id}`);
            setData(null);
        } catch (error: any) {
            setError(error.message);
        }
        setIsLoading(false);
    };

    return { data, isLoading, error, create, read, update, delete: remove };
}

export default useCrud;