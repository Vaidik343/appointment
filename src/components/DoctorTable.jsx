import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
  useMediaQuery,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const DoctorTable = ({ doctors = [] }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleBook = (id) => {
    navigate(`/book-appointment/${id}`);
  };

  if (!doctors.length) {
    return (
      <Typography
        variant="body1"
        color="text.secondary"
        align="center"
        sx={{ mt: 4 }}
      >
        No doctors available.
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 3, borderRadius: 3, boxShadow: 3 }}>
      {!isMobile ? (
        // 🖥️ Desktop View — Table Layout
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Specialization</strong></TableCell>
              <TableCell><strong>Contact</strong></TableCell>
              <TableCell align="right"><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {doctors.map((doctor) => (
              <TableRow key={doctor.id} hover>
                <TableCell>{doctor.name}</TableCell>
                <TableCell>{doctor.specialization}</TableCell>
                <TableCell>{doctor.contact}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleBook(doctor.id)}
                    sx={{ borderRadius: 2, textTransform: "none" }}
                  >
                    Book
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        // 📱 Mobile View — Card-like Rows
        <Box sx={{ p: 2 }}>
          {doctors.map((doctor) => (
            <Paper
              key={doctor.id}
              sx={{
                mb: 2,
                p: 2,
                borderRadius: 2,
                boxShadow: 2,
                bgcolor: "background.paper",
              }}
            >
              <Typography variant="h6" color="primary" fontWeight="bold">
                {doctor.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Specialization:</strong> {doctor.specialization}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Contact:</strong> {doctor.contact}
              </Typography>
              <Box textAlign="right" mt={1}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleBook(doctor.id)}
                  sx={{ borderRadius: 2, textTransform: "none" }}
                >
                  Book
                </Button>
              </Box>
            </Paper>
          ))}
        </Box>
      )}
    </TableContainer>
  );
};

export default DoctorTable;
