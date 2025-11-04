import React, { useEffect } from "react";
import { useService } from "../context/ServiceContext";
import ServiceCard from "../components/ServiceCard";
import { Box, Typography, CircularProgress } from "@mui/material";

const Service = () => {
  const { services, loading, fetchService } = useService();

  useEffect(() => {
    fetchService();
  }, []);

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

      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        gap={2}
        sx={{ mt: 2 }}
      >
        {services?.length > 0 ? (
          services.map((s) => <ServiceCard key={s.id} services={s} />)
        ) : (
          <Typography variant="body1" color="text.secondary">
            No services available.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Service;
