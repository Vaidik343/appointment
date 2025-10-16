import React from 'react'
import { useAppointment } from '../context/AppointmentContext'
import {usePatient} from '../context/PatientContext'
import {useBill} from '../context/BillContext'


const PatientProfile = () => {

   const {  
       appointments, getAppointmentByPatientId,cancelAppointment } = useAppointment
  return (
    <div>PatientProfile</div>
  )
}

export default PatientProfile