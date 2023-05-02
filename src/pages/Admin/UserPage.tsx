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
                        name: 'ФИО',
                        field: 'fullName',
                    },
                    {
                        name: 'Номер телефона',
                        field: 'phoneNumber',
                    },
                    {
                        name: 'Роль',
                        field: 'role'
                    }
                ]}
            />

            {/* {errors && <h1>{errors?.message}</h1>} */}
        </div>
    );
};

export default UserPage;