import React from 'react';
import {ITag} from "../types/ITag";

const TagItem = (props: ITag) => {
    return (
        <li>
            {props.name}
        </li>
    );
};

export default TagItem;