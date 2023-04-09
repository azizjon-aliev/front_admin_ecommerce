import Table from '../../components/UI/Tables/TableStickyHeader';
import { storageService } from '../../services/storage.service';

const GoodsPage = () => {
    
    return (
        <div className="table-container">

            <h1>
                Хранилище
            </h1>
            <Table
                service={storageService}
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

export default GoodsPage;