import React from 'react';
import {getPagesArray} from "../../../utils/pages";

interface IProps {
    total: number,
    page: number,
    changePage: any
}

const Pagination = (props: IProps) => {
    let pagesArray= getPagesArray(props.total);

    return (
        <div>
            {pagesArray.map(p =>
                <input
                    type="button"
                    className={props.page === p ? 'page active' : 'page'}
                    onClick={() => props.changePage(p)}
                    key={p}
                    value={p}
                />
            )}
        </div>
    );
};

export default Pagination;