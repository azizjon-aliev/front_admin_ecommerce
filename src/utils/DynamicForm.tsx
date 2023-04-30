import { Button, TextField } from '@material-ui/core';
import { useEffect, useRef, useState } from 'react';
import { FormProps } from '../types/IForm';
import { StyledDialog } from '../components/UI/Elements/Styled';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Select, { ActionMeta } from "react-select";

export interface Field {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  attributes?: any;
  options?: any[];
}

interface FormData {
  [key: string]: string
}

interface Props extends FormProps {
  fields: Field[];
  onSubmit: (data: any) => void;
  formData?: any;
}

export const DynamicForm: React.FC<Props> = ({ fields, onSubmit, ...props }) => {
  const [formData, setFormData] = useState<{ [key: string]: any }>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | any>, name?: string) => {
    if(!event.target) {
      setFormData({ ...formData, [name]: event.value })
    } 
    else {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    }
      
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formData);
  };

  const descriptionElementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if(props.formData) {
      setFormData({ ...props.formData })
    }
    if (props.open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [props.open]);

  return (
    <StyledDialog
      open={props.open}
      onClose={props.handleClose}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle id="scroll-dialog-title"></DialogTitle>
          <DialogContent dividers={true} ref={descriptionElementRef}>
            {fields.map((field) => {
              if(field.type === "select") {
                return (
                  <Select 
                    key={field.name}
                    name={field.name}
                    isSearchable={true}
                    options={field.options}
                    backspaceRemovesValue={true}
                    onChange={(e) => handleChange(e, field.name)} />  
                )
              }
              else {
                return (
                  <div key={field.name}>
                    <TextField
                      label={field.label}
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      required={field.required}
                      onChange={handleChange}
                      {...field.attributes}
                    />
                  </div>
                )
              }
            })}
          </DialogContent>
          <DialogActions>
            <Button type="submit">Submit</Button>
          </DialogActions>
      </form>
    </StyledDialog>
  );
};
