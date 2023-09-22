// components/LaundryForm.tsx

import React, { useState } from 'react'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs, { Dayjs } from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

interface LaundryFormProps {
  onSubmit: (data: LaundryFormData) => void
}

export interface LaundryFormData {
  customerName: string
  phoneNumber: string
  serviceType: string
  address: string
  numOfItems: string
  itemsWeight: string
  paymentType: string
  amountTotal: string
  pricePerKg: string
  deliveryDate: string
  pickUpDate:string
}

const LaundryForm: React.FC<LaundryFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<LaundryFormData>({
    customerName: '',
    phoneNumber: '',
    serviceType: '',
    address: '',
    numOfItems: '',
    itemsWeight: '',
    paymentType: '',
    pricePerKg: '',
    amountTotal: '',
    deliveryDate: '',
    pickUpDate:'',
  })

  React.useEffect(() => {
    if (formData.itemsWeight && formData.pricePerKg) {
      const newAmountTotal = (
        parseFloat(formData.itemsWeight) * parseFloat(formData.pricePerKg)
      ).toFixed(2); // Format to two decimal places
      setFormData({ ...formData, amountTotal: newAmountTotal });
    }
  }, [formData.itemsWeight, formData.pricePerKg]);

  const [dateDelivered, setDateDelivered] = React.useState<Dayjs | null>(dayjs(new Date()))
  const [datePickUp, setDatePickUp] = React.useState<Dayjs | null>(dayjs(new Date()))
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSelectChange = (event: React.ChangeEvent<{ name: string; value: any }>) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value as any })
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formData);
    setFormData({
      customerName: '',
      phoneNumber: '',
      serviceType: '',
      address: '',
      numOfItems: '',
      itemsWeight: '',
      paymentType: '',
      pricePerKg: '',
      amountTotal: '',
      deliveryDate: '',
      pickUpDate: '',
    });
  }

  const handleDateChange = (date: string,dateCode:number) => {
    if(dateCode === 1){
        setDateDelivered(dayjs(date))
        setFormData({ ...formData, deliveryDate: date })
    }else if(dateCode === 2){
        setDatePickUp(dayjs(date))
        setFormData({ ...formData, pickUpDate: date })
    }
   
  }

  return (
    <form onSubmit={handleSubmit} style={{maxWidth:'700px',margin:'0 auto'}}>
      <Typography variant='h4'>Laundry Form</Typography>
      <TextField
        name='customerName'
        label='Customer Name'
        variant='outlined'
        fullWidth
        margin='normal'
        value={formData.customerName}
        onChange={handleInputChange}
      />
      <TextField
        name='phoneNumber'
        label='Phone Number'
        variant='outlined'
        fullWidth
        margin='normal'
        value={formData.phoneNumber}
        onChange={handleInputChange}
      />
      <TextField
        name='address'
        label='Address'
        variant='outlined'
        fullWidth
        margin='normal'
        value={formData.address}
        onChange={handleInputChange}
      />

      <FormControl fullWidth variant='outlined' margin='normal'>
        <InputLabel id='service-type-label'>Service Type</InputLabel>
        <Select
          labelId='service-type-label'
          id='service-type-select'
          name='serviceType'
          value={formData.serviceType}
          onChange={handleSelectChange}
          label='Service Type'
        >
          <MenuItem value='dry_cleaning'>Dry Cleaning</MenuItem>
          <MenuItem value='wash_and_fold'>Wash and Fold</MenuItem>
          <MenuItem value='ironing'>Ironing</MenuItem>
        </Select>
      </FormControl>
      <div className='date-container'>
        <FormControl size='small' variant='outlined' sx={{ m: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label='Delivery Date' value={dateDelivered} onChange={date => handleDateChange(date.toString(),1)} />
          </LocalizationProvider>
        </FormControl>
        <FormControl size='small' variant='outlined' sx={{ m: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label='Pick Up Date' value={datePickUp} onChange={date => handleDateChange(date.toString(),2)} />
          </LocalizationProvider>
        </FormControl>
      </div>

      <FormControl sx={{ m: 2 }} variant='standard'>
        <TextField
          name='itemsWeight'
          label='Weight in Kg'
          variant='outlined'
          size='medium'
          margin='normal'
          value={formData.itemsWeight}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl sx={{ m: 2 }} variant='standard'>
        <TextField
          name='numOfItems'
          label='Item Count'
          variant='outlined'
          size='medium'
          margin='normal'
          value={formData.numOfItems}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl sx={{ m: 2 }} variant='standard'>
        <TextField
          name='pricePerKg'
          label='Price / Kg'
          variant='outlined'
          fullWidth
          margin='normal'
          value={formData.pricePerKg}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl sx={{ marginBlockStart: 6, marginInline: 2, width: 210 }} variant='outlined'>
        <InputLabel htmlFor='payment-type-label'>Payment Type</InputLabel>
        <Select
          labelId='payment-type-label'
          id='payment-type-select'
          name='paymentType'
          value={formData.paymentType}
          onChange={handleSelectChange}
          label='Payment Type'
        >
          <MenuItem value='cash'>Cash</MenuItem>
          <MenuItem value='credit'>Credit Card</MenuItem>
          <MenuItem value='debit'>Debit Card</MenuItem>
          <MenuItem value='online'>Online Payments</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant='standard' sx={{ m: 2 }}>
        <TextField
          name='amountTotal'
          label='Total'
          variant='outlined'
          size='medium'
          margin='normal'
          value={'₱' + formData.amountTotal}
          InputProps={{ readOnly: true }}
        />
      </FormControl>
      <div>
        <Button type='submit' variant='contained' color='primary'>
          Submit
        </Button>
      </div>
    </form>
  )
}

export default LaundryForm
