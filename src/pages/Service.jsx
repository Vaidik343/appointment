import React, { useEffect } from "react";
import { useService } from "../context/ServiceContext";
import ServiceCard from "../components/ServiceCard";
import { Box, Typography, CircularProgress, Divider } from "@mui/material";

const Service = () => {
  const { generalServices, doctorServices, loading } = useService();

  if (loading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h4"
        textAlign="center"
        color="primary"
        fontWeight="bold"
        gutterBottom
      >
        Available Services
      </Typography>

      {/* General Services Section */}
      <Box sx={{ mt: 4 }}>
        <Typography
          variant="h5"
          color="secondary"
          fontWeight="bold"
          gutterBottom
        >
          General Services
        </Typography>
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          gap={2}
          sx={{ mt: 2 }}
        >
          {generalServices?.length > 0 ? (
            generalServices.map((s) => <ServiceCard key={s.id} services={s} />)
          ) : (
            <Typography variant="body1" color="text.secondary">
              No general services available.
            </Typography>
          )}
        </Box>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Doctor Services Section */}
      <Box sx={{ mt: 4 }}>
        <Typography
          variant="h5"
          color="secondary"
          fontWeight="bold"
          gutterBottom
        >
          Doctor-Specific Services
        </Typography>
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          gap={2}
          sx={{ mt: 2 }}
        >
          {doctorServices?.length > 0 ? (
            doctorServices.map((s) => <ServiceCard key={s.id} services={s} />)
          ) : (
            <Typography variant="body1" color="text.secondary">
              No doctor-specific services available.
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Service;
