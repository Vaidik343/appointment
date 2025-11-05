import React, { useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  CircularProgress,
  Collapse,
  IconButton,
} from "@mui/material";
import { usePatient } from "../context/PatientContext";
import { useBill } from "../context/BillContext";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import { useState } from "react";

const MyBills = () => {
  const { bills, getPatientBills, loading } = useBill();
  const { patient } = usePatient();
  const [openRows, setOpenRows] = useState({}); // track expanded rows

  useEffect(() => {
    if (patient?.id) {
      getPatientBills(patient.id);
    }
  }, [patient]);

  const toggleRow = (billId) => {
    setOpenRows((prev) => ({ ...prev, [billId]: !prev[billId] }));
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        My Bills
      </Typography>

      {bills.length === 0 ? (
        <Typography color="text.secondary">No bills found.</Typography>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell><strong>Bill ID</strong></TableCell>
                <TableCell><strong>Total Amount</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Doctor</strong></TableCell>
                <TableCell><strong>Date</strong></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {bills.map((bill) => (
                <React.Fragment key={bill.id}>
                  <TableRow hover>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => toggleRow(bill.id)}
                      >
                        {openRows[bill.id] ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell>{bill.id}</TableCell>
                    <TableCell>₹{bill.total_amount}</TableCell>
                    <TableCell
                      sx={{
                        color:
                          bill.status === "Paid"
                            ? "success.main"
                            : bill.status === "Pending"
                            ? "warning.main"
                            : "error.main",
                      }}
                    >
                      {bill.status}
                    </TableCell>
                    <TableCell>
                      {bill.appointment?.doctor?.name || "N/A"}
                    </TableCell>
                    <TableCell>
                      {new Date(bill.created_at).toLocaleDateString()}
                    </TableCell>
                  </TableRow>

                  {/* Expandable Row for Bill Items */}
                  <TableRow>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={6}
                    >
                      <Collapse
                        in={openRows[bill.id]}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Box sx={{ margin: 2 }}>
                          <Typography
                            variant="subtitle1"
                            gutterBottom
                            component="div"
                          >
                            Bill Details
                          </Typography>
                          <Table size="small">
                            <TableHead>
                              <TableRow>
                                <TableCell><strong>Service</strong></TableCell>
                                <TableCell><strong>Cost</strong></TableCell>
                                <TableCell><strong>Quantity</strong></TableCell>
                                <TableCell><strong>Subtotal</strong></TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {bill.items?.map((item) => (
                                <TableRow key={item.id}>
                                  <TableCell>{item.service?.name}</TableCell>
                                  <TableCell>₹{item.service?.cost}</TableCell>
                                  <TableCell>{item.quantity}</TableCell>
                                  <TableCell>
                                    ₹{item.quantity * item.service?.cost}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default MyBills;
