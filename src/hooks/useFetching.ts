import {useState} from "react";

export const useFetching = (callback: any) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<any>('');

    const fetching = async (...args: any) => {
        try
        {
            setIsLoading(true)
            await callback(...args)
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
    }

    return {fetching, isLoading, errors}
}