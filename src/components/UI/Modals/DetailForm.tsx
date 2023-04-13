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

export default function DeatailForm(
  props: FormProps
) {
  const [data, setData] = React.useState([]);

  // 👇 Add this state to handle the total number of rows
  const { isLoading, errors, fetching: getById } = useFetching(async (id: number) => {
    const response = await props.service.getById(id);
    
    setData(response);

  });

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
      console.log(data);
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
        <DialogTitle id="scroll-dialog-title">Информация</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}>
            {/* map over keys of data */}
            {keys.map((key, index) => {
              return (
                    <tr key={index}>
                      <td>{key}</td>
                      {/* @ts-ignore */}
                      <td>{data[key]}</td>
                    </tr>
              );
            })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Закрыть</Button>
        </DialogActions>
      </StyledDialog>
    </div>
  );
}