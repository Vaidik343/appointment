import React, { useEffect, useState } from 'react'
import { useAppointment } from '../context/AppointmentContext'
import { usePatient } from '../context/PatientContext'
import { useDoctor } from '../context/DoctorContext'

const Appointment = () => {
  const { appointments, loading, getAppointmentByPatientId, createAppointment, cancelAppointment } = useAppointment()
  const { patient } = usePatient()
  const { doctor, fetchDoctor } = useDoctor()

  if (!patient) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          Please log in to view and manage your appointments.
          <a href="/login" className="underline ml-2">Go to Login</a>
        </div>
      </div>
    ) 
  }

  const [formData, setFormData] = useState({
    doctor_id: '',
    start_time: '',
    end_time: ''
  })

  useEffect(() => {
    if (patient?.id) {
      getAppointmentByPatientId(patient.id)
    }
    fetchDoctor()
  }, [patient])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.doctor_id || !formData.start_time || !formData.end_time) {
      alert('Please fill all fields')
      return
    }

    const payload = {
      patient_id: patient?.id, // Assuming patient has id
      doctor_id: formData.doctor_id,
      start_time: formData.start_time,
      end_time: formData.end_time
    }

    await createAppointment(payload)
    setFormData({ doctor_id: '', start_time: '', end_time: '' })
  }

  const handleCancel = async (id) => {
    await cancelAppointment(id)
  }

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Appointments</h1>

      {/* Book New Appointment Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Book New Appointment</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Select Doctor</label>
            <select
              name="doctor_id"
              value={formData.doctor_id}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            >
              <option value="">Choose a doctor</option>
              {doctor.map(doc => (
                <option key={doc.id} value={doc.id}>
                  {doc.name} - {doc.specialization}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Start Time</label>
            <input
              type="datetime-local"
              name="start_time"
              value={formData.start_time}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">End Time</label>
            <input
              type="datetime-local"
              name="end_time"
              value={formData.end_time}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Book Appointment
          </button>
        </form>
      </div>

      {/* Appointments List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Your Appointments</h2>
        {appointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          <div className="space-y-4">
            {appointments.map(appointment => (
              <div key={appointment.id} className="border border-gray-200 p-4 rounded-md">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Doctor: {appointment.doctor_name || 'N/A'}</p>
                    <p>Start: {new Date(appointment.start_time).toLocaleString()}</p>
                    <p>End: {new Date(appointment.end_time).toLocaleString()}</p>
                  </div>
                  <button
                    onClick={() => handleCancel(appointment.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Appointment
