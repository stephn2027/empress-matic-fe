import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface LaundryFormProps {
  onSubmit: (data: LaundryFormData) => void;
}

export interface LaundryFormData {
  customerName: string;
  phoneNumber: string;
  serviceType: string;
}

const LaundryForm: React.FC<LaundryFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<LaundryFormData>({
    customerName: '',
    phoneNumber: '',
    serviceType: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="customerName"
        label="Customer Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={formData.customerName}
        onChange={handleInputChange}
      />
      <TextField
        name="phoneNumber"
        label="Phone Number"
        variant="outlined"
        fullWidth
        margin="normal"
        value={formData.phoneNumber}
        onChange={handleInputChange}
      />
      <TextField
        name="serviceType"
        label="Service Type"
        variant="outlined"
        fullWidth
        margin="normal"
        value={formData.serviceType}
        onChange={handleInputChange}
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default LaundryForm;
