import {IStorage} from "../../../types/IStorage";

const StorageItem = (props: IStorage) => {
    return (
        <li>
            {props.name}
        </li>
    );
};

export default StorageItem;