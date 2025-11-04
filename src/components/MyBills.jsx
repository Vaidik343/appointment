import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { usePatient } from "../context/PatientContext";
import { useBill } from "../context/BillContext";

const MyBills = () => {
  const { bills, getPatientBills, loading } = useBill();
  const { patient } = usePatient();

  useEffect(() => {
    if (patient?.id) {
      getPatientBills(patient.id);
    }
  }, [patient]);

  if (loading) return <p>Loading bills...</p>;

  return (
    <Box>
      {bills.length === 0 ? (
        <p>No bills found.</p>
      ) : (
        bills.map((b) => (
          <ul key={b.id}>
            <li>Bill ID: {b.id}</li>
            <li>Total Amount: ₹{b.total_amount}</li>
            <li>Status: {b.status}</li>
          </ul>
        ))
      )}
    </Box>
  );
};

export default MyBills;
