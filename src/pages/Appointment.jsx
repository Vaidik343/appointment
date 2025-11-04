import React, { useEffect, useState } from 'react'
import AppointmentForm from '../components/AppointmentForm';
import { CircularProgress } from '@mui/material';


const Appointment = () => {
    const [loading, setLoading] = useState(false);



 if (loading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
        <CircularProgress />
      </Box>
    );
  
  return (
    <div className='appointment'>
      <AppointmentForm />

    </div>
  )
}

export default Appointment