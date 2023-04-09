import * as React from 'react';
import Button from '@mui/material/Button';
import { StyledDialog } from '../Elements/Styled';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormProps } from '../../../types/IForm';
import { useFetching } from '../../../hooks/useFetching';
import { Loading } from 'mdi-material-ui';
import Input from '@mui/material/Input';

export default function EditForm(
  props: FormProps
) {
  const [data, setData] = React.useState({});
  const [editData, setEditData] = React.useState({});
  const [isEditing, setIsEditing] = React.useState(false);
  const [optionalServices, setOptionalServices] = React.useState<any[]>([]);

  const { isLoading, errors, fetching: getById } = useFetching(async (id: number) => {
    const response = await props.service.getById(id);
    setData(response);
    setEditData(response);
  });

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
    props.handleClose();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditData({ ...editData, [name]: value });
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

  if (isLoading) {
    return <Loading />;
  }

  const keys = Object.keys(data);

  return (
    <div>
      <StyledDialog
        open={props.open}
        onClose={props.handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Скроллируемый диалог</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}>
            {keys.map((key, index) => {
              return (
                <table key={index}
                  style={{
                    tableLayout: 'fixed',
                    width: '90%',
                  }}
                >
                  <tbody>
                    <tr>
                      <td>{key}</td>
                      {isEditing ? (
                        <td>
                          {/* @ts-ignore */}
                          <Input type="text" name={key} value={editData[key]} onChange={handleChange} />
                        </td>
                      ) : (
                        // @ts-ignore
                        <td>{data[key]}</td>
                      )}
                    </tr>
                  </tbody>
                </table>
              );
            })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {isEditing ? (
            <>
              <Button onClick={handleCancel}>Отменить</Button>
              <Button onClick={handleSave}>Сохранить</Button>
            </>
          ) : (
            <Button onClick={handleEdit}>Редактировать</Button>
          )}
          <Button onClick={props.handleClose}>Закрыть</Button>
    </DialogActions>
  </StyledDialog>
  </div>
  );
}
