import * as React from 'react';
import Button from '@mui/material/Button';
import { StyledDialog } from '../Elements/Styled';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormProps } from '../../../types/IForm';
import { useFetching } from '../../../hooks/useFetching';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import { categoryService } from '../../../services/category.service';

interface Option {
  value: string | number | boolean;
  label: string;
}

interface Field {
  name: string;
  label: string;
  type?: string;
  options?: Option[];
}


export default function EditCategoryForm(props: FormProps) {
  const [data, setData] = React.useState({});
  const [editData, setEditData] = React.useState({});
  const [isEditing, setIsEditing] = React.useState(false);

  const { errors, fetching: getById } = useFetching(async (id: number) => {
    const response = await categoryService.getById(id);
    setData(response);
    setEditData(response);
  });

  React.useEffect(() => {
    if (props.open) {
      getById(props.dataId);
    }
  }, [props.open]);

  const options: Option[] = [];
  // map over data and return options array
  props.allCategories?.map((item: any) => {
    const option: Option = { value: item.id, label: item.title };
    options.push(option);
  });

  const fields: Field[] = [
    { name: 'title', label: 'Название' },
    { name: 'parent_id', label: 'Родитель', type: 'select', options: options },
    { name: 'description', label: 'Описание' },
    { name: 'status', label: 'Статус', type: 'select', options: [{ value: true, label: 'Активен' }, { value: false, label: 'Неактивен' }] },
  ];
  
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData(data);
  };

  const handleSave = () => {
    setData(editData);
    setIsEditing(false);
    // props.onSave(editData);
    props.handleClose();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
    const { name, value } = event.target;
    setEditData({ ...editData, [name as string]: value });
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (props.open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [props.open]);

  React.useEffect(() => {
    if (props.dataId) {
      getById(props.dataId);
    }
  }, [props.dataId]);

    return (
        <StyledDialog
            open={props.open}
            onClose={props.handleClose}
            scroll="paper"
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <DialogTitle id="scroll-dialog-title"></DialogTitle>
            <DialogContent dividers={true} ref={descriptionElementRef}>
                <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
                  <FormControl>
                    {fields.map((field) => {
                      if (field.type === 'select') {
                        return (
                          <Autocomplete
                            key={field.name}
                            id={field.name}
                            name={field.name}
                            options={field.options}
                            getOptionLabel={(option) => option.label}
                            value={editData[field.name]}
                            onChange={(event, newValue) => {
                              setEditData({ ...editData, [field.name]: newValue });
                            }}
                            renderInput={(params) => <TextField {...params} label={field.label} />}
                          />
                        );
                      }
                      return (
                        <TextField
                          key={field.name}
                          id={field.name}
                          name={field.name}
                          label={field.label}
                          value={editData[field.name]}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      );
                    })}
                  </FormControl>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {isEditing ? (
                    <>
                        <Button onClick={handleCancel}>Отмена</Button>
                        <Button onClick={handleSave}>Сохранить</Button>
                    </>
                ) : (
                    <Button onClick={handleEdit}>Редактировать</Button>
                )}
              <Button onClick={props.handleClose}>Закрыть</Button>
            </DialogActions>
        </StyledDialog>
    );
}