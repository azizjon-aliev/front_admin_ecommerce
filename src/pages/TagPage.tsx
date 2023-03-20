import React, {useEffect, useState} from 'react';
import {ITag} from "../types/ITag";
import TagList from "../components/TagList";
import {useFetching} from "../hooks/useFetching";
import {tagService} from "../services/tag.service";
import {getPageCount} from "../utils/pages";
import Pagination from "../components/UI/Pagination/Pagination";
import useDebounce from "../hooks/useDebounce";
import useCrud from "../hooks/useCrud";

const TagPage = () => {
    const [tags, setTags] = useState<ITag[]>([]);
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
        getAll(limit, page, search);
        // console.log('data', data)
        // @ts-ignore
        // setTags(data)
    }, [limit, page, debouncedSearch]);


    console.log(tags)

    if (isLoading) return <h1>Loading...</h1>

    return (
        <div>
            <div>
                <select value={limit} onChange={e => setLimit(Number(e.target.value))}>
                    <option value='10'>10</option>
                    <option value='30'>30</option>
                    <option value='50'>50</option>
                    <option value='100'>100</option>
                </select>
            </div>
            <br/>
            <div>
                <input
                    type="search"
                    placeholder="Search..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>
            {errors && <h1>{errors?.message}</h1>}
            <TagList tags={tags} />
            <Pagination page={page} total={getPageCount(total, limit)} changePage={(p: number) => setPage(p)} />
        </div>
    );
};

export default TagPage;