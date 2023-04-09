import Table from '../../components/UI/Tables/TableStickyHeader';
import { unitService } from '../../services/unit.service';

const TagPage = () => {
    
    return (
        <div className="table-container">
            <h1>
                Единицы
            </h1>

            <Table
                service={unitService}
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

export default TagPage;