import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

interface LaundryFormProps {
  onSubmit: (data: LaundryFormData) => void
}

export interface LaundryFormData {
  customerName: string
  phoneNumber: string
  serviceType: string
  address: string
  numOfItems: number
  itemsWeight: number
  paymentType: string
  amountTotal: number
  pricePerKg: number
}

const LaundryForm = ({ onSubmit }: LaundryFormProps): JSX.Element => {
  const [amountTotal, setAmoutTotal] = useState(0)

  const [formData, setFormData] = useState<LaundryFormData>({
    customerName: '',
    phoneNumber: '',
    serviceType: '',
    address: '',
    numOfItems: 0,
    itemsWeight: 0,
    paymentType: '',
    pricePerKg: 0,
    amountTotal: amountTotal
  })

  useEffect(() => {
    setAmoutTotal(formData.itemsWeight * formData.pricePerKg)
  }, [formData])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }
  const handleSelectChange = (event: React.ChangeEvent<{ name: string; value: any }>) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value as any })
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit}>
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
      {/* start of clothes computation */}
      <FormControl sx={{ m: 2 }} variant='standard'>
        <InputLabel htmlFor='demo-customized-textbox'></InputLabel>
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
        <InputLabel id='number-of-items-label'></InputLabel>
        <TextField
          name='numOfItems'
          label='Item Count'
          variant='outlined'
          fullWidth
          margin='normal'
          value={formData.numOfItems}
          onChange={handleInputChange}
        />
      </FormControl>
      <FormControl sx={{ m: 2 }} variant='standard'>
        <InputLabel id='price-per-kg'></InputLabel>
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

      <FormControl sx={{ paddingBlock: 4, m: 2 }} variant='outlined'>
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

      <FormControl sx={{ m: 2 }} variant='standard'>
        <InputLabel id='total'></InputLabel>
        <TextField
          name='totalPrice'
          label='Total'
          variant='outlined'
          fullWidth
          margin='normal'
          value={formData.amountTotal}
          InputProps={{ readOnly: true }}
        />
      </FormControl>

      {/* end of computation */}

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

      <Button type='submit' variant='contained' color='primary'>
        Submit
      </Button>
    </form>
  )
}

export default LaundryForm
