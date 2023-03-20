import {useState} from "react";

export const useFetching = (callback: any) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<any>({});
    const [data, setData] = useState<any>(null);

    const fetching = async (...args: any) => {
        setIsLoading(true)

        await callback(...args)
            .then((response: any) => {
                setData(response.data)
                setErrors({})
            })
            .catch((error: any) => {
                console.log(error)
                if (error?.response?.status === 422) {
                    setErrors({...error.response?.data?.errors})
                } else {
                    setErrors({message: error.message})
                }
            })
            .finally(() => setIsLoading(false))
    }

    console.log('data', data)
    console.log('errors', errors)
    console.log('isLoading', isLoading)


    return {fetching, errors, data, isLoading}
}