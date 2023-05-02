import {useEffect, useState} from 'react';
import {useFetching} from "../../hooks/useFetching";
import { Grid, Input } from '@mui/material';
import { categoryService } from '../../services/category.service';
import Table from '../../components/UI/Tables/TableStickyHeader';
import EditForm from '../../components/UI/Modals/EditForm';
import EditCategoryForm from '../../components/UI/Modals/EditCategoryForm';
import { DynamicForm, Field } from '../../utils/DynamicForm';
import { Button } from '@material-ui/core';

const CategoryPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    
    const fields: Field[] = [{
        name: "title",
        label: "Название",
        type: "text",
        placeholder: "Введите название",
        required: true
    }]

    const create = (values: any) => {
        const response = categoryService.create(values);
        setIsOpen(false);
    }

    return (
    <>
        <div className="table-container">
            <div>
                <h1>
                    Категории   
                </h1>
            </div>
            <Table
                service={categoryService}
                headers={[
                    {
                        name: 'Название',
                        field: 'title',
                    }
                ]}
                Form={DynamicForm}
            />

            <DynamicForm fields={fields} onSubmit={create} open={isOpen} 
                handleClose={() => setIsOpen(false)} service={undefined} />

            {/* {errors && <h1>{errors?.message}</h1>} */}
        </div>
    </>
    );
};

export default CategoryPage;