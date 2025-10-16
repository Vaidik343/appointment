import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Contexts
import { PatientProvider } from "./context/PatientContext";
import { DoctorProvider } from "./context/DoctorContext";
import { AppointmentProvider } from "./context/AppointmentContext";
import { BillProvider } from "./context/BillContext";
import { ServiceProvider } from "./context/ServiceContext";

// Pages
import Patient from "./pages/Patient"; // Registration
import Login from "./pages/Login"; // you should create Login page
import Doctor from "./pages/Doctor";
import PatientProfile from "./pages/PatientProfile";
import Service from "./pages/Service";

import Appointment from "./pages/Appointment";
// import Bills from "./pages/Bills"; // optional: show patient bills

function App() {
  return (
    <Router>
      <Toaster />
      <PatientProvider>
        <DoctorProvider>
          <AppointmentProvider>
            <BillProvider>
              <ServiceProvider>
                <Routes>
                  <Route path="/" element={<Patient />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/doctor" element={<Doctor />} />
                  <Route path="/profile" element={<PatientProfile />} />
                  <Route path="/service" element={<Service />} />
                  <Route path="/appointment" element={<Appointment />} />
                </Routes>
              </ServiceProvider>
            </BillProvider>
          </AppointmentProvider>
        </DoctorProvider>
      </PatientProvider>
    </Router>
  );
}

export default App;
