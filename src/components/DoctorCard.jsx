import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();

  const handleBook = () => {
  navigate(`/book-appointment/doctor/${doctor.id}`);

  };

  return (
    <Card
      sx={{
        width: 320,
        borderRadius: 3,
        boxShadow: 3,
        transition: "transform 0.2s ease-in-out",
        "&:hover": { transform: "translateY(-4px)", boxShadow: 6 },
        bgcolor: "background.paper",
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight="bold" color="primary" gutterBottom>
          {doctor.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          <strong>Specialization:</strong> {doctor.specialization}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Contact:</strong> {doctor.contact}
        </Typography>
      </CardContent>

      <CardActions>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          variant="contained"
          color="primary"
          onClick={handleBook}
          sx={{ borderRadius: 2, textTransform: "none" }}
        >
          Book Appointment
        </Button>
      </CardActions>
    </Card>
  );
};

export default DoctorCard;
