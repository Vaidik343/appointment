import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  Box,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ServiceCard = ({ services }) => {
  const navigate = useNavigate();

  const handleBook = () => {
navigate(`/book-appointment/service/${services.id}`);

  };

  return (
    <Card
      sx={{
        width: { xs: "100%", sm: 280, md: 300 },
        borderRadius: 3,
        boxShadow: 3,
        p: 1,
        transition: "transform 0.2s ease-in-out",
        "&:hover": { transform: "translateY(-4px)", boxShadow: 6 },
        bgcolor: "background.paper",
        m: 1,
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography
            variant="h6"
            fontWeight="bold"
            color="primary"
            gutterBottom
          >
            {services.name}
          </Typography>
          <Chip
            label={services.type === 'general' ? services.category : 'Doctor Service'}
            size="small"
            color={services.type === 'general' ? 'primary' : 'secondary'}
            variant="outlined"
          />
        </Box>
        <Typography variant="body1" color="text.secondary">
          Cost: ₹{services.cost}
        </Typography>
        {services.type === 'doctor' && services.doctor && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Doctor: {services.doctor.name} ({services.doctor.specialization})
          </Typography>
        )}
      </CardContent>

      <CardActions>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          variant="contained"
          color="primary"
          onClick={handleBook}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: "500",
          }}
        >
          Book Appointment
        </Button>
      </CardActions>
    </Card>
  );
};

export default ServiceCard;
