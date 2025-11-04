import React, { useState } from "react";
import { usePatient } from "../context/PatientContext";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
} from "@mui/material";

const Patient = () => {
  const { loading, createPatient } = usePatient();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    dob: "",
    contact: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await createPatient(form);
    if (success) {
      setForm({
        name: "",
        dob: "",
        contact: "",
        email: "",
        password: "",
      });
      navigate("/login");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh",
        bgcolor: "#f9fafc",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: 400,
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Patient Registration
        </Typography>

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <Stack spacing={2}>
            <TextField
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              label="Date of Birth"
              name="dob"
              type="date"
              value={form.dob}
              onChange={handleChange}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label="Contact Number"
              name="contact"
              type="tel"
              value={form.contact}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              label="Email Address"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              fullWidth
              required
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{ mt: 1 }}
            >
              {loading ? "Submitting..." : "Register"}
            </Button>
          </Stack>
        </form>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Already registered?{" "}
          <Link to="/login" style={{ textDecoration: "none", color: "#1976d2" }}>
            Login here
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Patient;
  