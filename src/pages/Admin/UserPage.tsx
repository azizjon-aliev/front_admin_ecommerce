import Table from '../../components/UI/Tables/TableStickyHeader';
import { userService } from '../../services/user.service';

const UserPage = () => {
    
    return (
        <div className="table-container">
            <h1>
                Пользователи
            </h1>

            <Table
                service={userService}
                headers={[
                    {
                        name: 'Имя',
                        field: 'first_name',
                    },
                    {
                        name: 'Фамилия',
                        field: 'last_name',
                    }
                ]}
            />

            {/* {errors && <h1>{errors?.message}</h1>} */}
        </div>
    );
};

export default UserPage;