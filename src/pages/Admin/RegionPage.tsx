import Table from '../../components/UI/Tables/TableStickyHeader';
import { regionService } from '../../services/region.service';

const GoodsPage = () => {
    
    return (
        <div className="table-container">

            <h1>
                Регионы
            </h1>
            <Table
                service={regionService}
                headers={[
                    {
                        name: 'Название',
                        field: 'title',
                    }
                ]}
            />

            {/* {errors && <h1>{errors?.message}</h1>} */}
        </div>
    );
};

export default GoodsPage;