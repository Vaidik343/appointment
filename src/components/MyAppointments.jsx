import React, { useEffect } from "react";
import { useAppointment } from "../context/AppointmentContext";
import { usePatient } from "../context/PatientContext";
import { useNavigate } from "react-router-dom";
import { useDoctor } from "../context/DoctorContext";

import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
} from "@mui/material";
import toast from "react-hot-toast";


const MyAppointments = () => {
  const { patient } = usePatient();
  const {doctor, fetchDoctor} = useDoctor();
  console.log("🚀 ~ MyAppointments ~ doctor:", doctor)
  const { appointments, getAppointmentByPatientId, cancelAppointment, loading } = useAppointment();
  const navigate = useNavigate();


  useEffect(  () => {
      fetchDoctor();
  }, [])
  // Redirect if not logged in
  useEffect(() => {
    if (!patient) {
      toast.error("Please login to view appointments");
      navigate("/login");
    }
  }, [patient, navigate]);

  // Fetch appointments
  useEffect(() => {
    if (patient?.id) {
      getAppointmentByPatientId(patient.id);
    }
  }, [patient]);

  const handleCancel = async (appointmentId) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      await cancelAppointment(appointmentId);
      getAppointmentByPatientId(patient.id); // refresh list
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "success";
      case "Scheduled":
        return "warning";
      case "Cancelled":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 2000, mx: "auto" }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="left">
        My Appointments
      </Typography>

      {appointments.length === 0 ? (
        <Typography textAlign="center" color="text.secondary">
          No appointments found.
        </Typography>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead sx={{ bgcolor: "primary.main" }}>
              <TableRow>
                <TableCell sx={{ color: "#fff" }}>Doctor</TableCell>
                
                <TableCell sx={{ color: "#fff" }}>Start</TableCell>
                <TableCell sx={{ color: "#fff" }}>End</TableCell>
                <TableCell sx={{ color: "#fff" }}>Status</TableCell>
                <TableCell sx={{ color: "#fff" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((apt) => (
                <TableRow key={apt.id} hover>
                  <TableCell>

                     {doctor.find((d) => d.id === apt.doctor_id)?.name || apt.doctor_id}
                  </TableCell>

                  <TableCell>{new Date(apt.start_time).toLocaleString()}</TableCell>
                  <TableCell>{new Date(apt.end_time).toLocaleString()}</TableCell>
                  <TableCell>
                    <Chip
                      label={apt.status}
                      color={getStatusColor(apt.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {apt.status === "Scheduled" && (
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        disabled={loading}
                        onClick={() => handleCancel(apt.id)}
                      >
                        Cancel
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default MyAppointments;
