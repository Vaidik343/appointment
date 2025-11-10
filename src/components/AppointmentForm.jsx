import React, { useEffect, useState } from "react";
import {
  MenuItem,
  Paper,
  Grid,
  TextField,
  Box,
  Typography,
  Button,
  Stack,
  Divider,
  Select,
  FormControl,
  InputLabel,
  Chip,
} from "@mui/material";
import { useDoctor } from "../context/DoctorContext";
import { useAppointment } from "../context/AppointmentContext";
import { useService } from "../context/ServiceContext";
import { usePatient } from "../context/PatientContext";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import uploadCompleteAnimation from "../assets/Upload Complete.json";

const AppointmentForm = () => {
  const { doctor, fetchDoctor } = useDoctor();
  const { createAppointment, loading } = useAppointment();
  const { services, generalServices, doctorServices, fetchService } = useService();
  const { patient } = usePatient();
  
  const {doctorId,serviceId} = useParams();


  const navigate = useNavigate();

  const [form, setForm] = useState({
    doctor_id: doctorId || "",
    service_id: serviceId || "",
    selectedServices: [],
    start_time: "",
    end_time: "",
  });

  const [availableServices, setAvailableServices] = useState([]);

  const [isSuccess, setIsSuccess] = useState(false); // ✅ success state

  useEffect(() => {
    setForm(prev => ({
      ...prev,
      doctor_id: doctorId || prev.doctor_id,
     selectedServices: serviceId ? [serviceId] : prev.selectedServices,
    }));
  }, [doctorId, serviceId]);
  useEffect(() => {
    if (!patient) {
      toast.error("Please log in to book an appointment");
      navigate("/login");
    }
  }, [patient, navigate]);

  useEffect(() => {
    fetchDoctor();
    fetchService();
  }, []);

  // Update available services when doctor is selected or services loaded
  useEffect(() => {
    if (form.doctor_id) {
      const selectedDoctorServices = doctorServices.filter(service => service.doctor_id === form.doctor_id);
      setAvailableServices([...generalServices, ...selectedDoctorServices]);
    } else {
      setAvailableServices(generalServices);
    }
  }, [form.doctor_id, generalServices, doctorServices]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleServiceChange = (event) => {
    const { value } = event.target;
    setForm({ ...form, selectedServices: value });
  };

  const handleRemoveService = (serviceId) => {
    setForm(prev => ({
      ...prev,
      selectedServices: prev.selectedServices.filter(id => id !== serviceId)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.doctor_id || !form.start_time || !form.end_time || form.selectedServices.length === 0) {
      toast.error("Please fill all required fields");
      return;
    }

    const payload = {
      patient_id: patient?.id,
      doctor_id: form.doctor_id,
      start_time: form.start_time,
      end_time: form.end_time,
      services: form.selectedServices.map(serviceId => ({ service_id: serviceId, quantity: 1 })),
    };

    const apt = await createAppointment(payload);
    if (apt) {
      setIsSuccess(true); // ✅ show animation
    }
  };

  if (isSuccess) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "50vh",
          textAlign: "center",
          mt: 4,
        }}
      >
        <Lottie
          animationData={uploadCompleteAnimation}
          loop={false}
          style={{ width: 200, height: 200 }}
        />
        <Typography variant="h5" fontWeight="bold" mt={2}>
          Appointment Booked
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={1}>
          Your appointment has been successfully booked
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 4, px: 2 }}>
      <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
          Book an Appointment
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container rowSpacing={3} columnSpacing={3}>
            {/* Row 1: Doctor + Service */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                select
                label="Select Doctor"
                name="doctor_id"
                value={form.doctor_id}
                onChange={handleChange}
                required
              >
                <MenuItem value="">-- Choose Doctor --</MenuItem>
                {doctor?.map((doc) => (
                  <MenuItem key={doc.id} value={doc.id}>
                    {doc.name} ({doc.specialization})
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth required>
                <InputLabel>Select Services</InputLabel>
                <Select
                  multiple
                  value={form.selectedServices}
                  onChange={handleServiceChange}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => {
                        const service = availableServices?.find(s => s.id === value);
                        return (
                          <Chip
                            key={value}
                            label={service ? service.name : value}
                             onMouseDown={(e) => e.stopPropagation()}
                           onDelete={(e) => {
            e.stopPropagation(); // 🛑 stop bubbling
            handleRemoveService(value);
          }}
                          />
                        );
                      })}
                    </Box>
                  )}
                >
                  {availableServices?.map((srv) => (
                    <MenuItem key={srv.id} value={srv.id}>
                      {srv.name} – ₹{srv.cost} {srv.type === 'doctor' ? `(Dr. ${srv.doctorName})` : ''}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Row 2: Start + End Time */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Start Time"
                name="start_time"
                type="datetime-local"
                value={form.start_time}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="End Time"
                name="end_time"
                type="datetime-local"
                value={form.end_time}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>

            {/* Submit Button */}
            <Grid size={12} sx={{ textAlign: "center", mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ borderRadius: 2, px: 4 }}
              >
                {loading ? "Booking..." : "Book Appointment"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default AppointmentForm;
