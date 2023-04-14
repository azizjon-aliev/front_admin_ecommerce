import { useState } from 'react';

interface Field {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  attributes?: any;
}

interface Props {
  fields: Field[];
  onSubmit: (data: any) => void;
}

export const DynamicForm: React.FC<Props> = ({ fields, onSubmit }) => {
  const [formData, setFormData] = useState<{ [key: string]: any }>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name}>
          <label>{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            required={field.required}
            onChange={handleChange}
            {...field.attributes}
          />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};
