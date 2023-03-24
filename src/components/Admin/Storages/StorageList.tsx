import {IStorage} from "../../../types/IStorage";
import StorageItem from "./StorageItem";

interface IProps {
    tags: IStorage[];
}

const StorageList = (props: IProps) => {

    if (props.tags.length === 0) return <p>No tags found.</p>;

    return (
        <ul>
            {props.tags.map((tag: IStorage) => (
                <StorageItem key={tag.id} name={tag.name} />
            ))}
        </ul>
    );
};

export default StorageList;