import React, { useEffect, useState } from "react";
import { useDoctor } from "../context/DoctorContext";
import { useAppointment } from "../context/AppointmentContext";
import { useService } from "../context/ServiceContext";
import { usePatient } from "../context/PatientContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { MenuItem, Paper, Stack, TextField,Box, Typography , Button} from "@mui/material";

const AppointmentForm = () => {
  const { doctor, fetchDoctor } = useDoctor();
  const {  createAppointment, loading } = useAppointment();
  console.log("🚀 ~ AppointmentForm ~ createAppointment:", createAppointment)
  const { services, fetchService } = useService();
  // console.log("🚀 ~ AppointmentForm ~ services:", services)
  const { patient } = usePatient();
  console.log("🚀 ~ AppointmentForm ~ patient:", patient)
  const navigate = useNavigate();

  const [form, setForm] = useState({
    doctor_id: "",
    service_id: "",
    start_time: "",
    end_time: "",
  });

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.doctor_id || !form.start_time || !form.end_time) {
      alert("Please fill all fields");
      return;
    }

    const payload = {
      patient_id: patient?.id,
      service_id: form.service_id,
      doctor_id: form.doctor_id,
      start_time: form.start_time,
      end_time: form.end_time,
      status: "Scheduled",
    };

   const apt = await createAppointment(payload);
  //  console.log("🚀 ~ handleSubmit ~ apt:", apt)
console.log("Booking payload:", payload);

   if(apt)
   {
    setForm("")
  navigate("/patient-profile");
   }

  };

  return( 
  <Box>
    <Paper>

      <Typography variant="h5" fontWeight="bold" textAlign="center">
          Book an Appointment
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack>

            {/* doctor list */}
               <TextField 
                 select
                 label="Select doctor"
                 value={form.doctor_id}
                 name="doctor_id"
                 onChange={handleChange}
                  
                 required
               >
                <MenuItem>--Choose Doctor--
                </MenuItem>
                {
                  doctor?.map((doc) =>(
                    <MenuItem key={doc.id} value={doc.id}> {doc.name}--({doc.specialization})</MenuItem>
                  ))
                }

               </TextField>
               <TextField 
                 select
                 label="Select Service"
                 value={form.service_id}
                 name="service_id"
                 onChange={handleChange}
                  
                 required
               >
                <MenuItem>--Choose Service--
                </MenuItem>
                {
                  services?.map((srv) =>(
                    <MenuItem key={srv.id} value={srv.id}> {srv.name} - ₹{srv.cost}</MenuItem>
                  ))
                }

               </TextField>

               {/* date */}

              <TextField
              label="Start Time"
              name="start_time"
              type="datetime-local"
              value={form.start_time}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
               
              required
            />

            <TextField
              label="End Time"
              name="end_time"
              type="datetime-local"
              value={form.end_time}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
               
              required
            />


                  <Button type="submit" variant="contained"   disabled={loading}>
              {loading ? "Booking..." : "Book Appointment"}
            </Button>
          </Stack>
        </form>
     
    </Paper>

  </Box>
  );
};

export default AppointmentForm;
