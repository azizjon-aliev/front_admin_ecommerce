import { useState } from 'react';
import axios, {AxiosResponse, AxiosError} from 'axios';
import axiosClient from "../utils/axiosClient";
import {tagService} from "../services/tag.service";


interface CrudProps<T> {
   service: any;
}

interface CrudResponse<T> {
    data: T | null;
    isLoading: boolean;
    errors: any;
    create: (data: T) => Promise<void>;
    getById: (id: number) => Promise<void>;
    getAll: (...args: any) => Promise<void>;
    update: (id: number, data: T) => Promise<void>;
    remove: (id: number) => Promise<void>;
}

function useCrud<T>(props: CrudProps<T>): CrudResponse<T> {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<any>(null);

    const create = async (postData: T) => {
        try
        {
            setIsLoading(true)
            const response = await props.service.create(postData)
            setData(response.data)
            setErrors({})
        }
        catch (e: any)
        {
            if (e?.response?.status === 422) {
                setErrors({...e.response?.data?.errors})
            } else {
                setErrors({message: e.message})
            }
        }
        finally
        {
            setIsLoading(false)
        }
    };

    const getAll = async (...args: any) => {
        try
        {
            setIsLoading(true)
            const response = await props.service.getAll(...args)
            console.log('res', response.data.data)
            await setData(response.data.data)
            setErrors({})
        }
        catch (e: any)
        {
            if (e?.response?.status === 422) {
                setErrors({...e.response?.data?.errors})
            } else {
                setErrors({message: e.message})
            }
        }
        finally
        {
            setIsLoading(false)
        }
    };

    const getById = async (id: number) => {
        try
        {
            setIsLoading(true)
            const response = await props.service.getById(id)
            setData(response.data)
            setErrors({})
        }
        catch (e: any)
        {
            if (e?.response?.status === 422) {
                setErrors({...e.response?.data?.errors})
            } else {
                setErrors({message: e.message})
            }
        }
        finally
        {
            setIsLoading(false)
        }
    };

    const update = async (id: number, putData: T) => {
        try
        {
            setIsLoading(true)
            const response = await props.service.update(id, putData)
            setData(response.data)
            setErrors({})
        }
        catch (e: any)
        {
            if (e?.response?.status === 422) {
                setErrors({...e.response?.data?.errors})
            } else {
                setErrors({message: e.message})
            }
        }
        finally
        {
            setIsLoading(false)
        }
    };

    const remove = async (id: number) => {
        try
        {
            setIsLoading(true)
            await props.service.delete(id)
            setData(null)
            setErrors({})
        }
        catch (e: any)
        {
            if (e?.response?.status === 422) {
                setErrors({...e.response?.data?.errors})
            } else {
                setErrors({message: e.message})
            }
        }
        finally
        {
            setIsLoading(false)
        }
    };

    return { data, isLoading, errors, create, getById, update, remove, getAll };
}

export default useCrud;