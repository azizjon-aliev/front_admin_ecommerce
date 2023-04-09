import Table from '../../components/UI/Tables/TableStickyHeader';
import { tagService } from '../../services/tag.service';

const TagPage = () => {
    
    return (
        <div className="table-container">
            <h1>
                Тэг
            </h1>

            <Table
                service={tagService}
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