import {useEffect, useState} from 'react';
import {useFetching} from "../../hooks/useFetching";
import { Input } from '@mui/material';
import { categoryService } from '../../services/category.service';
import Table from '../../components/UI/Tables/TableStickyHeader';
import EditForm from '../../components/UI/Modals/EditForm';
import EditCategoryForm from '../../components/UI/Modals/EditCategoryForm';

const CategoryPage = () => {
    
    return (
        <div className="table-container">

            <h1>
                Категории   
            </h1>
            <Table
                service={categoryService}
                headers={[
                    {
                        name: 'Название',
                        field: 'title',
                    }
                ]}
                // Form={EditCategoryForm}
            />

            {/* {errors && <h1>{errors?.message}</h1>} */}
        </div>
    );
};

export default CategoryPage;