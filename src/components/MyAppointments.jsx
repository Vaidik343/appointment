import React, { useEffect } from "react";
import { useAppointment } from "../context/AppointmentContext";
import { usePatient } from "../context/PatientContext";
import { useNavigate } from "react-router-dom";
import { Box, Button, Paper, Typography, Stack } from "@mui/material";
import toast from "react-hot-toast";

const MyAppointments = () => {
  const { patient } = usePatient();
  const { appointments, getAppointmentByPatientId, cancelAppointment, loading } = useAppointment();
  
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!patient) {
      toast.error("Please login to view appointments");
      navigate("/login");
    }
  }, [patient, navigate]);

  // Fetch all appointments for logged-in patient
  useEffect(() => {
    if (patient?.id) {
      getAppointmentByPatientId(patient.id);
    }
  }, [patient]);

  const handleCancel = async (appointmentId) => {
    console.log("🚀 ~ handleCancel ~ appointmentId:", appointmentId)
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      await cancelAppointment(appointmentId);
      // Re-fetch appointments after cancellation
      getAppointmentByPatientId(patient.id);
    }
  };

  return (
    <Box sx={{ p: 3, width:'40dvw' }}>
   <Typography variant="h5" fontWeight="bold" gutterBottom>
        My Appointments
      </Typography>

      {appointments.length === 0 ? (
        <Typography>No appointments found.</Typography>
      ) : (
        appointments.map((apt) => (
          <Paper key={apt.id} sx={{ p: 2, mb: 2 }}>
            <Stack spacing={1} >
              <Typography><strong>Doctor ID:</strong> {apt.doctor_id}</Typography>
              {/* <Typography><strong>Service ID:</strong> {apt.service_id}</Typography> */}
              <Typography><strong>Start:</strong> {apt.start_time}</Typography>
              <Typography><strong>End:</strong> {apt.end_time}</Typography>
              <Typography><strong>Status:</strong> {apt.status}</Typography>

              <Button
                variant="contained"
                color="error"
                disabled={loading}
                onClick={() => handleCancel(apt.id)}
              >
                Cancel Appointment
              </Button>
            </Stack>
          </Paper>
        ))
      )}
    </Box>
  );
};

export default MyAppointments;
