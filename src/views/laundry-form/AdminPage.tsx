import React from 'react';
import LaundryForm from './LaundryForm';
import { LaundryFormData } from './LaundryForm';


const AdminPage: React.FC = () => {
  const handleFormSubmit = (formData: LaundryFormData) => {
    // Handle form submission here, e.g., send the data to a backend API.
    console.log(formData);
  };

  return (
    <div>
      <h1>Laundry Shop Admin</h1>
      <LaundryForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default AdminPage;
