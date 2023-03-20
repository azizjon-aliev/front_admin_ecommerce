import React from 'react';
import {ITag} from "../types/ITag";
import TagItem from "./TagItem";

interface IProps {
    tags: ITag[];
}

const TagList = (props: IProps) => {

    if (props.tags.length === 0) return <p>No tags found.</p>;

    return (
        <ul>
            {props.tags.map((tag: ITag) => (
                <TagItem key={tag.id} name={tag.name} />
            ))}
        </ul>
    );
};

export default TagList;