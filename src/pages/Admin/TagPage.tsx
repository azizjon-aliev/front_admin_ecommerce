import React, {useEffect, useState} from 'react';
import {ITag} from "../../types/ITag";
import TagList from "../../components/Admin/Tags/TagList";
import {useFetching} from "../../hooks/useFetching";
import {tagService} from "../../services/tag.service";
import {getPageCount} from "../../utils/pages";
import Pagination from "../../components/UI/Pagination/Pagination";
import useDebounce from "../../hooks/useDebounce";
import useCrud from "../../hooks/useCrud";
import ExamplePage, { TablePaginationActions } from '../../components/UI/Tables/TableStickyHeader';
import { Input } from '@mui/material';
import { Box } from 'mdi-material-ui';

const TagPage = () => {
    const [tags, setTags] = useState<[]>([]);
    const [limit, setLimit] = useState<number>(100);
    const [page, setPage] = useState<number>(1);
    const [total, setTotal] = useState<number>(0);
    const [search, setSearch] = useState<string>('');
    const debouncedSearch = useDebounce(search, 500);

    const {isLoading, errors, fetching: getAll} = useFetching(async (limit: number, page: number, search: string) => {
        const response = await tagService.getAll(limit, page, search);
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
            } data={tags} />

        </div>
    );
};

export default TagPage;