import Table from '../../components/UI/Tables/TableStickyHeader';
import { goodService } from '../../services/good.service';

const GoodsPage = () => {
    
    return (
        <div className="table-container">

            <h1>
                Товары
            </h1>
            <Table
                service={goodService}
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