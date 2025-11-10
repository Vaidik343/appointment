import React, { useEffect } from "react";
import { useDoctor } from "../context/DoctorContext";
import DoctorCard from "../components/DoctorCard";
import { Box, Grid, Typography, CircularProgress } from "@mui/material";

const Doctor = () => {
  const { doctor, loading } = useDoctor();

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );

  return (
    <Box sx={{ p: 4 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        color="primary"
        gutterBottom
      >
        Available Doctors
      </Typography>

      {doctor && doctor.length > 0 ? (
        <Grid container spacing={3} justifyContent="center">
          {doctor.map((doc) => (
            <Grid item key={doc.id}>
              <DoctorCard doctor={doc} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography
          variant="body1"
          color="text.secondary"
          textAlign="center"
          sx={{ mt: 4 }}
        >
          No doctors found.
        </Typography>
      )}
    </Box>
  );
};

export default Doctor;
