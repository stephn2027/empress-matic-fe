import React from 'react';
import LaundryForm from '../../views/laundry-form/LaundryForm';
import { LaundryFormData } from '../../views/laundry-form/LaundryForm';


const AdminPage: React.FC = () => {
  const handleFormSubmit = async (formData: LaundryFormData) => {
    // Handle form submission here, e.g., send the data to a backend API.
    console.log(formData);
    try{  
      const res = await fetch('https://httpbin.org/post',{
        method:"POST",
        body: JSON.stringify({
          customerName:formData.customerName,
          address:formData.address,
          phoneNumber:formData.phoneNumber,
        }),
        headers:{
          'Content-Type':'application/json',
        },
      });
      const resJson = await res.json();
        console.log(resJson)


    }catch (err){
      console.log(err)
    }

    

  };

  return (
    <div>
      <h1>Laundry Shop Service</h1>
      <LaundryForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default AdminPage;
