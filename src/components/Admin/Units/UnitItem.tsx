import {IUnit} from "../../../types/IUnit";

const UnitItem = (props: IUnit) => {
    return (
        <li>
            {props.name}
        </li>
    );
};

export default UnitItem;