import {useState} from "react";

export const useFetching = (callback: any) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [errors, setErrors] = useState(null);

    const fetching = async (...args: any) => {
        await callback(...args)
            .catch((error: any) => {
                setErrors(error.response ? error.response.data.errors : error.message)
            })
            .finally
            (
                setIsLoading(false)
            )
    }

    return {fetching, errors, isLoading}
}