import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormProps } from '../../../types/IForm';

export default function ConfirmForm(
  props: FormProps
) 
{
  const [id, setId] = React.useState<number>(0);

  useEffect(() => {
    if (props.dataId){
      console.log(props.dataId);
      setId(props.dataId);
    }
  }, [props.dataId]);

  const handleAgree = () => {
    // Call the service function to remove the model from the table
    props.service.delete(id);
    if(props.confirm){
      props.confirm("");
    }
    // Close the confirmation dialog
    props.handleClose();
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Подтверждение"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Вы уверены, что хотите удалить эту запись?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Disagree</Button>
          <Button onClick={handleAgree} autoFocus>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
