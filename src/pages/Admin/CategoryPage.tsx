import {useEffect, useState} from 'react';
import {useFetching} from "../../hooks/useFetching";
import useDebounce from "../../hooks/useDebounce";
import ExamplePage from '../../components/UI/Tables/TableStickyHeader';
import { Input } from '@mui/material';
import { categoryService } from '../../services/category.service';
import { RoutesEnum } from '../../constants/routes';

const CategoryPage = () => {
    const [catogories, setCatogories] = useState<[]>([]);
    const [limit, setLimit] = useState<number>(100);
    const [search, setSearch] = useState<string>('');
    const debouncedSearch = useDebounce(search, 500);

    const {isLoading, errors, fetching: getAll} = useFetching(async (limit: number, page: number, search: string) => {
        const response = await categoryService.getAll(limit, page, search);
        setCatogories(response.data.data);
    });


    useEffect(() => {
        const data = getAll(limit, search);
        // @ts-ignore
        setCatogories(data)
    }, [limit, debouncedSearch]);

    if (isLoading) return <h1>Loading...</h1>

    return (
        <div style={
            {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                width: '80%',
                height: '50vh',
            }
        }>
            <div
                style={{ width: '20%', 
                    height: '20 %',
                    display: 'flex',
                    alignSelf: 'flex-start',
                    }}
                
            >

                <Input
                    type="search"
                    placeholder="Search..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>
            {errors && <h1>{errors?.message}</h1>}
            <ExamplePage headers={
                [
                    { id: 'name', name: 'Name' },
                ]
            } data={catogories}
            service={categoryService} 
            />

        </div>
    );
};

export default CategoryPage;