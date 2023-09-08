import React from 'react';
import LaundryForm from '../../views/laundry-form/LaundryForm';
import { LaundryFormData } from '../../views/laundry-form/LaundryForm';


const AdminPage: React.FC = () => {
  const handleFormSubmit = (formData: LaundryFormData) => {
    // Handle form submission here, e.g., send the data to a backend API.
    console.log(formData);
  };

  return (
    <div>
      <h1>Laundry Shop Service</h1>
      <LaundryForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default AdminPage;
