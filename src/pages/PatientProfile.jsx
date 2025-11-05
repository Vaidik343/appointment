import React from 'react'

import MyAppointments from '../components/MyAppointments'
import MyBills from '../components/MyBills'
import { Divider } from '@mui/material'

const PatientProfile = () => {

   
  return (
    <div>

      <MyAppointments />
      <Divider />
      <MyBills />

    </div>
  )
}

export default PatientProfile