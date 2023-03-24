import React, {useEffect, useState} from 'react';
import {useFetching} from "../../hooks/useFetching";
import useDebounce from "../../hooks/useDebounce";
import ExamplePage from '../../components/UI/Tables/TableStickyHeader';
import { Input } from '@mui/material';
import { goodService } from '../../services/good.service';

const GoodPage = () => {
    const [tags, setTags] = useState<[]>([]);
    const [limit, setLimit] = useState<number>(100);
    const [page, setPage] = useState<number>(1);
    const [total, setTotal] = useState<number>(0);
    const [search, setSearch] = useState<string>('');
    const debouncedSearch = useDebounce(search, 500);

    const {isLoading, errors, fetching: getAll} = useFetching(async (limit: number, page: number, search: string) => {
        const response = await goodService.getAll(limit, page, search);
        setTotal(response.data?.meta.total)
        setTags(response.data.data);
    })
    // const {isLoading, errors, data, getAll} = useCrud({service: tagService})


    useEffect(() => {
        const data = getAll(limit, page, search);
        // console.log('data', data)
        // @ts-ignore
        setTags(data)
    }, [limit, page, debouncedSearch]);


    console.log(tags)

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
            } 
            data={tags}
            service={goodService} 
            />

        </div>
    );
};

export default GoodPage;