import {IUnit} from "../../../types/IUnit";
import UnitItem from "./UnitItem";

interface IProps {
    tags: IUnit[];
}

const UnitList = (props: IProps) => {

    if (props.tags.length === 0) return <p>No tags found.</p>;

    return (
        <ul>
            {props.tags.map((tag: IUnit) => (
                <UnitItem key={tag.id} name={tag.name} />
            ))}
        </ul>
    );
};

export default UnitList;