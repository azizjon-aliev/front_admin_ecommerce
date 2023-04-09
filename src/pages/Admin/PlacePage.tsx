import Table from '../../components/UI/Tables/TableStickyHeader';
import { placeService } from '../../services/place.service';

const PlacePage = () => {
    
    return (
        <div className="table-container">

            <h1>
                Места
            </h1>
            <Table
                service={placeService}
                headers={[
                    {
                        name: 'Название',
                        field: 'name',
                    }
                ]}
            />

            {/* {errors && <h1>{errors?.message}</h1>} */}
        </div>
    );
};

export default PlacePage;